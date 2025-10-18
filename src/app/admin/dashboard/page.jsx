"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Trash2,
  LogOut,
  Edit,
  FileText,
  Menu as MenuIcon,
} from "lucide-react";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import toast, { Toaster } from "react-hot-toast";

import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { signOut } from "firebase/auth";

export default function Dashboard() {
  const router = useRouter();

  // Get initial tab from URL on mount (client-side only)
  const [tab, setTab] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [menu, setMenu] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  // Lazy-load Firebase db and auth
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);

  // Initialize tab from URL on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam) {
        setTab(tabParam);
      }
    }
  }, []);

  useEffect(() => {
    import("@/lib/firebaseClient").then((mod) => {
      setDb(mod.db);
      setAuth(mod.auth);
    });
  }, []);

  // Fetch posts & menu
  useEffect(() => {
    if (!db) return;

    const fetchPosts = async () => {
      const snapshot = await getDocs(collection(db, "blogs"));
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
      }));
      postsData.sort((a, b) => b.updatedAt - a.updatedAt);
      setPosts(postsData);
    };

    const fetchMenu = async () => {
      const snapshot = await getDocs(collection(db, "dishes"));
      const menuData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
      }));
      menuData.sort((a, b) => b.updatedAt - a.updatedAt);
      setMenu(menuData);
    };

    fetchPosts();
    fetchMenu();
  }, [db]);

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    router.push("/admin/login");
  };

  const handleDeleteClick = (id, type) => {
    setSelectedItem(id);
    setSelectedType(type);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!db) return;

    if (selectedType === "post") {
      await deleteDoc(doc(db, "blogs", selectedItem));
      setPosts((prev) => prev.filter((p) => p.id !== selectedItem));
    } else if (selectedType === "dish") {
      await deleteDoc(doc(db, "dishes", selectedItem));
      setMenu((prev) => prev.filter((d) => d.id !== selectedItem));
    }

    toast.success("Deleted successfully!", {
      duration: 4000,
      position: "top-right",
    });
  };

  const handleTabChange = (newTab) => {
    setTab(newTab);
    router.replace(`/admin/dashboard?tab=${newTab}`);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white flex">
        <Toaster />

        {/* Sidebar */}
        <div className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white p-8 flex flex-col">
          <h2 className="text-2xl font-bold mb-12">Admin</h2>

          <nav className="flex flex-col gap-2 flex-1">
            <button
              onClick={() => handleTabChange("posts")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                tab === "posts" ? "bg-orange-500" : "hover:bg-gray-800"
              }`}
            >
              <FileText size={18} />
              Posts
            </button>

            <button
              onClick={() => handleTabChange("menu")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                tab === "menu" ? "bg-orange-500" : "hover:bg-gray-800"
              }`}
            >
              <MenuIcon size={18} />
              Menu
            </button>

            {tab === "posts" && (
              <Link
                href="/admin/dashboard/create?tab=posts"
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors mt-4"
              >
                <Plus size={18} />
                New Post
              </Link>
            )}

            {tab === "menu" && (
              <Link
                href="/admin/dashboard/menu/create?tab=menu"
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors mt-4"
              >
                <Plus size={18} />
                New Dish
              </Link>
            )}
          </nav>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors mt-auto"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 min-h-screen">
          <div className="border-b border-gray-200 bg-white px-8 py-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 capitalize">
              {tab}
            </h1>
          </div>

          <div className="p-8">
            {tab === "posts" ? (
              posts.length === 0 ? (
                <p>No posts yet.</p>
              ) : (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-sm transition-all duration-200 flex"
                    >
                      <div className="relative w-64 h-48 flex-shrink-0">
                        <Image
                          src={post.image || "/placeholder.jpg"}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-orange-500 transition-colors cursor-pointer">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {post.content
                              ? post.content
                                  .replace(/<[^>]+>/g, "")
                                  .slice(0, 150)
                              : "No content available"}
                          </p>
                          <p className="text-gray-400 text-xs mt-1">
                            Posted on {post.createdAt.toLocaleDateString()} at{" "}
                            {post.createdAt.toLocaleTimeString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 mt-4">
                          <Link
                            href={`/admin/dashboard/edit/${post.id}?tab=posts`}
                            className="flex items-center gap-2 text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
                          >
                            <Edit size={16} />
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(post.id, "post")}
                            className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : menu.length === 0 ? (
              <p>No dishes yet.</p>
            ) : (
              <div className="space-y-4">
                {menu.map((dish) => (
                  <div
                    key={dish.id}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-sm transition-all duration-200 flex"
                  >
                    <div className="relative w-64 h-48 flex-shrink-0">
                      <Image
                        src={dish.imageUrl || "/placeholder.jpg"}
                        alt={dish.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-orange-500 transition-colors cursor-pointer">
                          {dish.name}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-1">
                          {dish.desc}
                        </p>
                        <p className="text-orange-600 font-semibold text-sm">
                          {dish.price} • {dish.prepTime}
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                          Added on {dish.createdAt.toLocaleDateString()} at{" "}
                          {dish.createdAt.toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-4">
                        <Link
                          href={`/admin/dashboard/menu/edit/${dish.id}?tab=menu`}
                          className="flex items-center gap-2 text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
                        >
                          <Edit size={16} />
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(dish.id, "dish")}
                          className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Confirm Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-96">
              <p className="text-gray-800 mb-6">
                Are you sure you want to delete this item?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleConfirmDelete();
                    setModalOpen(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

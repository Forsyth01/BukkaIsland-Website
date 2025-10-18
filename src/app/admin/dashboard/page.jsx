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

  const [tab, setTab] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [menu, setMenu] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize tab from URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam) setTab(tabParam);
    }
  }, []);

  // Lazy-load Firebase
  useEffect(() => {
    import("@/lib/firebaseClient").then((mod) => {
      setDb(mod.db);
      setAuth(mod.auth);
    });
  }, []);

  // Helper function to construct proper Cloudinary URL
  const getImageUrl = (imageValue) => {
    if (!imageValue) {
      return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E";
    }
    
    // If it's already a complete URL, return it as-is
    if (imageValue.includes('://')) {
      return imageValue;
    }
    
    // If it starts with 'res.cloudinary.com', add https://
    if (imageValue.startsWith('res.cloudinary.com')) {
      return `https://${imageValue}`;
    }
    
    // Otherwise return the value as-is
    return imageValue;
  };

  // Fetch posts & menu
  useEffect(() => {
    if (!db) return;

    const fetchData = async () => {
      // Posts
      const postsSnap = await getDocs(collection(db, "blogs"));
      const postsData = postsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      
      // Sort posts by createdAt (newest first)
      postsData.sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
        return dateB - dateA;
      });
      
      setPosts(postsData);

      // Menu
      const menuSnap = await getDocs(collection(db, "dishes"));
      const menuData = menuSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      
      // Sort menu by createdAt (newest first)
      menuData.sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
        return dateB - dateA;
      });
      
      setMenu(menuData);

      setTimeout(() => setLoading(false), 500); // short delay for smoother load
    };

    fetchData();
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

    toast.success("Deleted successfully!", { duration: 4000, position: "top-right" });
    setModalOpen(false);
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
              <FileText size={18} /> Posts
            </button>

            <button
              onClick={() => handleTabChange("menu")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                tab === "menu" ? "bg-orange-500" : "hover:bg-gray-800"
              }`}
            >
              <MenuIcon size={18} /> Menu
            </button>

            {tab === "posts" && (
              <Link
                href="/admin/dashboard/create?tab=posts"
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors mt-4"
              >
                <Plus size={18} /> New Post
              </Link>
            )}

            {tab === "menu" && (
              <Link
                href="/admin/dashboard/menu/create?tab=menu"
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors mt-4"
              >
                <Plus size={18} /> New Dish
              </Link>
            )}
          </nav>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors mt-auto"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 min-h-screen p-8">
          <h1 className="text-3xl font-bold mb-6 capitalize">{tab}</h1>

          {loading ? (
            <div className="flex items-center justify-center min-h-[300px]">
              <p className="text-gray-500">Loading content...</p>
            </div>
          ) : tab === "posts" ? (
            posts.length === 0 ? (
              <p>No posts yet.</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                    <div className="relative w-full h-48 bg-gray-200">
                      <img
                        src={getImageUrl(post.image)}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null; // Prevent infinite loop
                          e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%239ca3af'%3EImage Unavailable%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{post.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {post.content ? post.content.replace(/<[^>]+>/g, "").slice(0, 100) : "No content available"}
                      </p>
                      <div className="mt-3 flex justify-between items-center text-xs text-gray-400">
                        <span>
                          {post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString() : ""}
                        </span>
                        <div className="flex gap-2">
                          <Link 
                            href={`/admin/dashboard/edit/${post.id}?tab=posts`} 
                            className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
                          >
                            Edit
                          </Link>
                          <button 
                            onClick={() => handleDeleteClick(post.id, "post")} 
                            className="text-red-500 hover:text-red-600 font-medium transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : menu.length === 0 ? (
            <p>No dishes yet.</p>
          ) : (
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {menu.map((dish) => {
                const imageValue = dish.image || dish.imageUrl;
                const imageSrc = getImageUrl(imageValue);
                
                return (
                  <div key={dish.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                    <div className="relative w-full h-48 bg-gray-200">
                      <img
                        src={imageSrc}
                        alt={dish.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          console.error('Image load error for dish:', dish.name, '| Original URL:', imageValue, '| Constructed URL:', e.target.src);
                          e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%239ca3af'%3EImage Failed%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{dish.name}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{dish.desc}</p>
                      <p className="text-orange-600 font-semibold text-sm">{dish.price} • {dish.prepTime}</p>
                      <div className="mt-3 flex justify-between items-center text-xs text-gray-400">
                        <span>{dish.createdAt?.toDate ? dish.createdAt.toDate().toLocaleDateString() : ""}</span>
                        <div className="flex gap-2">
                          <Link 
                            href={`/admin/dashboard/menu/edit/${dish.id}?tab=menu`} 
                            className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
                          >
                            Edit
                          </Link>
                          <button 
                            onClick={() => handleDeleteClick(dish.id, "dish")} 
                            className="text-red-500 hover:text-red-600 font-medium transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Confirm Modal */}
          {modalOpen && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-lg p-6 w-96">
                <p className="text-gray-800 mb-6">
                  Are you sure you want to delete this item?
                </p>
                <div className="flex justify-end gap-4">
                  <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">Cancel</button>
                  <button onClick={handleConfirmDelete} className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600">Delete</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
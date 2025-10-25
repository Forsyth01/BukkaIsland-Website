"use client";

import { useState, useEffect, memo } from "react";
import {
  Plus,
  Trash2,
  LogOut,
  Edit,
  FileText,
  Menu,
  X,
  Search,
  Calendar,
  Utensils,
  Sparkles,
  GripVertical,
} from "lucide-react";

// Memoized Card Component for Performance
const DashboardCard = memo(({ item, type, onEdit, onDelete, getImageUrl, isDragging }) => {
  const imageValue = type === 'dish' ? (item.image || item.imageUrl) : item.image;
  const title = type === 'dish' ? item.name : item.title;
  const description = type === 'dish' ? item.desc : (item.content ? item.content.replace(/<[^>]+>/g, "").slice(0, 100) : "No content");
  const date = item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString() : "";

  return (
    <div className={`group bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-[#fac703]/50 transition-all duration-300 ${isDragging ? 'opacity-50 scale-95' : ''}`}>
      {/* Drag Handle */}
      <div className="absolute top-2 right-2 z-10 cursor-grab active:cursor-grabbing p-2 bg-zinc-900/80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical className="w-5 h-5 text-[#fac703]" />
      </div>

      <div className="relative w-full h-48 bg-zinc-950 overflow-hidden">
        <img
          src={getImageUrl(imageValue)}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%2327272a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%23a1a1aa'%3EImage Error%3C/text%3E%3C/svg%3E";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60" />
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-[#fac703] transition-colors">{title}</h3>
        <p className="text-zinc-400 text-sm line-clamp-2 mb-3">{description}</p>
        
        {type === 'dish' && item.price && (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[#fac703] font-semibold">${item.price}</span>
            {item.prepTime && (
              <>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-500 text-sm">{item.prepTime}</span>
              </>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
          <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
            <Calendar className="w-3.5 h-3.5" />
            <span>{date}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(item.id)}
              className="p-2 rounded-lg bg-[#fac703]/10 text-[#fac703] hover:bg-[#fac703]/20 transition-colors"
              aria-label="Edit"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
              aria-label="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

DashboardCard.displayName = 'DashboardCard';

export default function Dashboard() {
  const [tab, setTab] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [menu, setMenu] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

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
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  // Helper function to construct proper Cloudinary URL
  const getImageUrl = (imageValue) => {
    if (!imageValue) {
      return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%2327272a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%23a1a1aa'%3ENo Image%3C/text%3E%3C/svg%3E";
    }
    if (imageValue.includes('://')) return imageValue;
    if (imageValue.startsWith('res.cloudinary.com')) return `https://${imageValue}`;
    return imageValue;
  };

  // Fetch posts & menu
  useEffect(() => {
    if (!db) return;

    const fetchData = async () => {
      try {
        const { collection, getDocs } = await import("firebase/firestore");
        
        // Posts
        const postsSnap = await getDocs(collection(db, "blogs"));
        const postsData = postsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        // Sort by order field, then by createdAt
        postsData.sort((a, b) => {
          if (a.order !== undefined && b.order !== undefined) {
            return a.order - b.order;
          }
          const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
          const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
          return dateB - dateA;
        });
        
        setPosts(postsData);

        // Menu
        const menuSnap = await getDocs(collection(db, "dishes"));
        const menuData = menuSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        // Sort by order field, then by createdAt
        menuData.sort((a, b) => {
          if (a.order !== undefined && b.order !== undefined) {
            return a.order - b.order;
          }
          const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
          const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
          return dateB - dateA;
        });
        
        setMenu(menuData);
        setTimeout(() => setLoading(false), 500);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [db]);

  // Update order in Firestore
  const updateOrder = async (items, collectionName) => {
    if (!db) return;

    try {
      const { doc, updateDoc } = await import("firebase/firestore");
      
      // Update each item with its new order
      const updatePromises = items.map((item, index) => 
        updateDoc(doc(db, collectionName, item.id), { order: index })
      );
      
      await Promise.all(updatePromises);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  // Drag and Drop Handlers
  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedItem === null) return;
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleDrop = async (e, dropIndex) => {
    e.preventDefault();
    
    if (draggedItem === null || draggedItem === dropIndex) {
      setDraggedItem(null);
      setDragOverIndex(null);
      return;
    }

    const currentData = tab === "posts" ? [...posts] : [...menu];
    const draggedItemData = currentData[draggedItem];
    
    // Remove dragged item
    currentData.splice(draggedItem, 1);
    
    // Insert at new position
    currentData.splice(dropIndex, 0, draggedItemData);

    // Update state
    if (tab === "posts") {
      setPosts(currentData);
      await updateOrder(currentData, "blogs");
    } else {
      setMenu(currentData);
      await updateOrder(currentData, "dishes");
    }

    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleLogout = async () => {
    if (!auth) return;
    const { signOut } = await import("firebase/auth");
    await signOut(auth);
    if (typeof window !== "undefined") {
      window.location.href = "/admin/login";
    }
  };

  const handleDeleteClick = (id, type) => {
    setSelectedItem(id);
    setSelectedType(type);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!db) return;

    try {
      const { deleteDoc, doc } = await import("firebase/firestore");
      
      if (selectedType === "post") {
        await deleteDoc(doc(db, "blogs", selectedItem));
        const updatedPosts = posts.filter((p) => p.id !== selectedItem);
        setPosts(updatedPosts);
        await updateOrder(updatedPosts, "blogs");
      } else if (selectedType === "dish") {
        await deleteDoc(doc(db, "dishes", selectedItem));
        const updatedMenu = menu.filter((d) => d.id !== selectedItem);
        setMenu(updatedMenu);
        await updateOrder(updatedMenu, "dishes");
      }
      
      setModalOpen(false);
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleTabChange = (newTab) => {
    setTab(newTab);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', newTab);
      window.history.replaceState({}, '', url);
    }
  };

  const handleEdit = (id) => {
    if (typeof window !== "undefined") {
      if (tab === "posts") {
        window.location.href = `/admin/dashboard/edit/${id}?tab=posts`;
      } else {
        window.location.href = `/admin/dashboard/menu/edit/${id}?tab=menu`;
      }
    }
  };

  const handleCreate = () => {
    if (typeof window !== "undefined") {
      if (tab === "posts") {
        window.location.href = `/admin/dashboard/create?tab=posts`;
      } else {
        window.location.href = `/admin/dashboard/menu/create?tab=menu`;
      }
    }
  };

  const currentData = tab === "posts" ? posts : menu;
  const filteredData = currentData.filter(item => {
    const searchLower = searchQuery.toLowerCase();
    if (tab === "posts") {
      return item.title?.toLowerCase().includes(searchLower) || 
             item.content?.toLowerCase().includes(searchLower);
    }
    return item.name?.toLowerCase().includes(searchLower) || 
           item.desc?.toLowerCase().includes(searchLower);
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#fac703]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#e6b800]/10 rounded-full blur-3xl" />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-zinc-900/90 backdrop-blur-lg border-b border-zinc-800">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">
            Bukka<span className="text-[#fac703]">Island</span>
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-72 bg-zinc-900/95 backdrop-blur-xl border-r border-zinc-800 z-50 transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full p-6">
          <div className="mb-8 hidden lg:block">
            <div className="flex items-center gap-2 mb-2">
              {/* <Sparkles className="w-5 h-5 text-[#fac703]" /> */}
              <h1 className="font text-2xl">
                Bukka<span className="text-[#fac703] font">Island</span>
              </h1>
            </div>
            <p className="text-zinc-500 text-sm">Admin Dashboard</p>
          </div>

          <nav className="flex-1 space-y-2">
            <button
              onClick={() => { handleTabChange("posts"); setSidebarOpen(false); }}
              className={`cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                tab === "posts" 
                  ? "bg-gradient-to-r from-[#fac703] via-[#f6d303] to-[#e6b800] text-white shadow-lg" 
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>Blog Posts</span>
              <span className="ml-auto text-xs bg-zinc-800 px-2 py-1 rounded-full">
                {posts.length}
              </span>
            </button>

            <button
              onClick={() => { handleTabChange("menu"); setSidebarOpen(false); }}
              className={`cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                tab === "menu" 
                  ? "bg-gradient-to-r from-[#fac703] via-[#f6d303] to-[#e6b800] text-white shadow-lg" 
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              <Utensils className="w-5 h-5" />
              <span>Menu Items</span>
              <span className="ml-auto text-xs bg-zinc-800 px-2 py-1 rounded-full">
                {menu.length}
              </span>
            </button>
          </nav>

          <button
            onClick={handleLogout}
            className="cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-red-400 hover:bg-red-500/10 border border-red-500/20 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-72 min-h-screen pt-20 lg:pt-0">
        <div className="p-6 lg:p-8 relative z-10">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2 capitalize">{tab}</h2>
                <p className="text-zinc-400">
                  Manage your {tab === "posts" ? "blog posts" : "menu items"} • Drag to reorder
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-[#fac703]/50 transition-colors w-full sm:w-64"
                  />
                </div>
                
                <button
                  onClick={handleCreate}
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#fac703] via-[#f6d303] to-[#e6b800] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-[#fac703]/40 transition-all whitespace-nowrap"
                >
                  <Plus className="w-5 h-5" />
                  <span className="hidden sm:inline">New {tab === "posts" ? "Post" : "Dish"}</span>
                  <span className="sm:hidden">New</span>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Total", value: currentData.length },
                { label: "Published", value: currentData.length },
                { label: "Draft", value: 0 },
                { label: "Active", value: currentData.length },
              ].map((stat, i) => (
                <div key={i} className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-4 hover:border-[#fac703]/30 transition-all">
                  <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fac703] via-[#f6d303] to-[#e6b800]">{stat.value}</p>
                  <p className="text-zinc-500 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Content Grid */}
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-[#fac703]/20 border-t-[#fac703] rounded-full animate-spin mx-auto mb-4" />
                <p className="text-zinc-400">Loading {tab}...</p>
              </div>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-4">
                {tab === "posts" ? <FileText className="w-10 h-10 text-zinc-700" /> : <Utensils className="w-10 h-10 text-zinc-700" />}
              </div>
              <h3 className="text-xl font-bold text-zinc-300 mb-2">
                {searchQuery ? "No results found" : `No ${tab} yet`}
              </h3>
              <p className="text-zinc-500 mb-6">
                {searchQuery ? "Try a different search term" : `Create your first ${tab === "posts" ? "post" : "dish"} to get started`}
              </p>
              {!searchQuery && (
                <button 
                  onClick={handleCreate}
                  className="px-6 py-3 bg-gradient-to-r from-[#fac703] via-[#f6d303] to-[#e6b800] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-[#fac703]/40 transition-all"
                >
                  <Plus className="w-5 h-5 inline mr-2" />
                  Create {tab === "posts" ? "Post" : "Dish"}
                </button>
              )}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.map((item, index) => (
                <div
                  key={item.id}
                  draggable={!searchQuery}
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`relative transition-all duration-200 ${
                    dragOverIndex === index ? 'scale-105' : ''
                  }`}
                >
                  <DashboardCard
                    item={item}
                    type={tab === "posts" ? "post" : "dish"}
                    onEdit={handleEdit}
                    onDelete={(id) => handleDeleteClick(id, tab === "posts" ? "post" : "dish")}
                    getImageUrl={getImageUrl}
                    isDragging={draggedItem === index}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Delete {selectedType}?</h3>
            <p className="text-zinc-400 mb-6">
              This action cannot be undone. Are you sure you want to delete this item?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 px-4 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
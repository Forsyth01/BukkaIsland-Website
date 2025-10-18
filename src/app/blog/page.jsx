"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import Image from "next/image";
import LoadingAnimation from "@/app/components/LoadingAnimation";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const blogQuery = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(blogQuery);
      const postList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postList);

      // Add a short minimum delay before hiding loader
      setTimeout(() => setLoading(false), 1500);
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="relative min-h-screen bg-orange-50 py-20 px-5 md:px-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* 🔥 Static Header – visible immediately */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-orange-700 mb-2">
            BukkaIsland Blog
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Fresh stories from the street — sizzling recipes, food truck tales, and local flavor vibes!
          </p>
        </div>

        {/* 🔍 Search Bar – visible immediately */}
        <div className="relative w-full max-w-md mx-auto mb-12">
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-orange-300 rounded-full px-4 py-2 pl-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <Search className="absolute left-3 top-2.5 text-orange-500 w-5 h-5" />
        </div>

        {/* 🌀 Posts Section */}
        <div className="relative min-h-[300px]">
          {/* ✨ Show loader inside posts section only */}
          <AnimatePresence>
            {loading && (
              <motion.div
                key="loader"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center bg-orange-50/80 z-10 rounded-xl"
              >
                <LoadingAnimation message="Loading your blog posts..." />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ✅ Blog posts grid (visible after loading finishes) */}
          {!loading && (
            <>
              {filteredPosts.length === 0 ? (
                <p className="text-center text-gray-600">
                  No posts found. Try a different keyword.
                </p>
              ) : (
                <motion.div
                  layout
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg border border-orange-100 transition-transform hover:-translate-y-1"
                    >
                      <div className="relative w-full h-48">
                        <Image
                          src={post.image || "/placeholder.jpg"}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>

                      <div className="p-5">
                        <h3 className="text-lg font-bold text-orange-700 mb-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                          {post.content.slice(0, 100)}...
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-400">
                            {post.createdAt?.toDate
                              ? post.createdAt.toDate().toLocaleDateString()
                              : ""}
                          </span>
                          <Link
                            href={`/blog/${post.id}`}
                            className="text-orange-600 font-semibold text-sm hover:underline"
                          >
                            Read More →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

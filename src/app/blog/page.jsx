"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, ArrowRight, ArrowLeft } from "lucide-react";
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

      setTimeout(() => setLoading(false), 1500);
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="relative min-h-screen bg-zinc-950 py-12 px-6 md:px-10 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Animated Orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.45, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#fac703]/20 via-[#f6d303]/20 to-[#e6b800]/20 rounded-full blur-3xl"
      />

      {/* ✅ Back Button (Now Clickable) */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 mb-10"
      >
        <Link
          href="/"
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#fac703]/40 bg-[#1a1a1a] text-[#fac703] font-medium transition-all duration-300 hover:bg-[#fac703] hover:text-black hover:shadow-[0_0_15px_#fac70380]"
        >
          <motion.div
            whileHover={{ x: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.div>
          <span className="tracking-wide group-hover:font-semibold">
            Back to Home
          </span>
        </Link>
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="pointer-events-none absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#fac703]/20 via-[#f6d303]/20 to-[#e6b800]/20 rounded-full blur-3xl"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              className="h-0.5 w-20 bg-gradient-to-r from-transparent via-[#fac703] to-transparent"
            />
            <BookOpen className="w-6 h-6 text-[#fac703]" />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              className="h-0.5 w-20 bg-gradient-to-r from-transparent via-[#fac703] to-transparent"
            />
          </div>

          <h1 className="font text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4">
            BukkaIsland{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fac703] via-[#f6d303] to-[#e6b800]">
              Blog
            </span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Fresh stories from the street — sizzling recipes, food truck tales,
            and local flavor vibes!
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative w-full max-w-md mx-auto mb-16"
        >
          <div className="relative group">
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#fac703]/50 rounded-full px-6 py-3 pl-12 text-white placeholder-zinc-500 focus:outline-none transition-all duration-300 focus:ring-2 focus:ring-[#fac703]/20"
            />
            <Search className="absolute left-4 top-3.5 text-[#fac703] w-5 h-5" />
          </div>
        </motion.div>

        {/* Posts Section */}
        <div className="relative min-h-[300px]">
          {/* Loader */}
          <AnimatePresence>
            {loading && (
              <motion.div
                key="loader"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center bg-zinc-950/50 backdrop-blur-sm z-10 rounded-2xl"
              >
                <LoadingAnimation message="Loading your blog posts..." />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Blog Posts Grid */}
          {!loading && (
            <>
              {filteredPosts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center py-20"
                >
                  <BookOpen className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                  <p className="text-lg text-zinc-400">
                    No posts found. Try a different keyword.
                  </p>
                </motion.div>
              ) : (
                <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      whileHover={{ y: -8 }}
                      className="group relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 hover:border-[#fac703]/50 transition-all duration-300"
                    >
                      {/* Image Container */}
                      <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-[#fac703]/10 via-[#f6d303]/10 to-[#e6b800]/10">
                        <Image
                          src={post.image || "/placeholder.jpg"}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#fac703] transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-zinc-400 mb-4 line-clamp-2 flex-1 leading-relaxed">
                          {post.excerpt ||
                            post.content?.slice(0, 100) ||
                            "No excerpt available..."}
                        </p>

                        {/* Footer */}
                        <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
                          <span className="text-xs text-zinc-500 uppercase tracking-wide">
                            {post.createdAt?.toDate
                              ? post.createdAt
                                  .toDate()
                                  .toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })
                              : "Recently published"}
                          </span>
                          <Link
                            href={`/blog/${post.id}`}
                            className="inline-flex items-center gap-1 text-[#fac703] hover:text-[#f6d303] font-bold text-sm transition-colors group/link"
                          >
                            Read
                            <motion.span
                              animate={{ x: [0, 4, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <ArrowRight className="w-4 h-4" />
                            </motion.span>
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

        {/* Results Info */}
        {!loading && filteredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-sm text-zinc-500">
              Showing{" "}
              <span className="text-[#fac703] font-bold">
                {filteredPosts.length}
              </span>{" "}
              of{" "}
              <span className="text-[#fac703] font-bold">{posts.length}</span>{" "}
              posts
            </p>
          </motion.div>
        )}
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent" />
    </section>
  );
}

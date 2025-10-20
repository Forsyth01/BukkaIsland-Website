
"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BlogPreview() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(
        collection(db, "blogs"),
        orderBy("updatedAt", "desc"),
        limit(3)
      );
      const snapshot = await getDocs(q);
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  return (
    <section className="relative overflow-hidden bg-zinc-950 py-24">
      {/* Animated grid background (from Hero) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_100%,#000_70%,transparent_110%)]" />
      </div>

      {/* Radial gradient spotlight (from Hero, inverted) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(245,158,11,0.15),transparent_50%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            From Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 animate-gradient">
              Kitchen
            </span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-6">
            Stories, recipes, and behind-the-scenes from the Bukka Island team.
          </p>
          {/* Animated underline (from Hero) */}
          <div className="flex items-center justify-center gap-2">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-0.5 w-20 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
            />
            <Calendar className="w-5 h-5 text-amber-500" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-0.5 w-20 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
            />
          </div>
        </motion.div>

        {/* Blog Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-amber-500/50 hover:shadow-amber-500/10"
            >
              <Link href={`/blog/${post.id}`}>
                <img
                  src={post.image || "/placeholder.jpg"}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <div className="p-6">
                <Link href={`/blog/${post.id}`}>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-500 transition-colors flex items-center justify-between">
                    <span className="line-clamp-2">{post.title}</span>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0 flex-shrink-0" />
                  </h3>
                </Link>

                {/* Blog content preview */}
                <p className="text-zinc-400 text-sm mb-4 line-clamp-3">
                  {post.content
                    ? post.content.replace(/<[^>]+>/g, "").slice(0, 85) + "..."
                    : "No description available."}
                </p>

                <div className="flex items-center gap-2 text-zinc-500 text-sm">
                  <Calendar className="w-4 h-4 text-amber-500/70" />
                  <span>
                    {post.updatedAt?.toDate
                      ? post.updatedAt.toDate().toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : post.createdAt?.toDate
                      ? post.createdAt.toDate().toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "No date"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center mt-16">
          <motion.a
            href="/blog"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full font-bold text-white text-lg shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Visit Our Blog
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>
        </div>
      </div>

      {/* CSS for gradient animation (from Hero) */}
      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}
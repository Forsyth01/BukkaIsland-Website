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
    <section className="bg-orange-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-3">
            From Our Blog
          </h2>
          <p className="text-gray-600">
            Stories, recipes, and behind-the-scenes from the BukkaIsland team.
          </p>
        </motion.div>

        {/* Blog Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
            >
              <img
                src={post.image || "/placeholder.jpg"}
                alt={post.title}
                className="w-full h-44 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-orange-600 transition-colors cursor-pointer">
                  {post.title}
                </h3>

                {/* Blog content preview */}
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {post.content
                    ? post.content.replace(/<[^>]+>/g, "").slice(0, 85) + "..."
                    : "No description available."}
                </p>

                <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                  <Calendar size={16} />
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
                <Link
                  href={`/blog/${post.id}`}
                  className="text-orange-600 flex items-center gap-2 font-medium hover:gap-3 transition-all"
                >
                  Read More
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-medium transition-colors inline-flex items-center gap-2"
          >
            Visit Blog <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

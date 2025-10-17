"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

export default function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const ref = doc(db, "blogs", id);
        const snapshot = await getDoc(ref);

        if (snapshot.exists()) {
          setPost({ id: snapshot.id, ...snapshot.data() });
        } else {
          console.error("No such document found in Firestore!");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Blog not found</h2>
          <Link href="/blog" className="text-orange-600 hover:text-orange-700 underline">
            Return to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Hero Section with Image */}
      <div className="relative h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
        <img
          src={post.image || "/placeholder.jpg"}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        {/* Back Button - Floating */}
        <Link
          href="/blog"
          className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-gray-800 font-medium shadow-lg hover:bg-white transition-all duration-300 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
          Back
        </Link>
      </div>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-5 md:px-10 -mt-32 relative z-10 pb-20">
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Article Header */}
          <div className="p-8 md:p-12 lg:p-16">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-500" />
                <span>{post.date}</span>
              </div>
              {post.readTime && (
                <>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span>{post.readTime} min read</span>
                  </div>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 pb-8 border-b border-gray-200">
                {post.excerpt}
              </p>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                {post.content || "No content available for this post."}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-8 md:p-12">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Enjoyed this article?</p>
                <Link 
                  href="/blog"
                  className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-2 group"
                >
                  Read more articles
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, ChefHat } from "lucide-react";
import LoadingAnimation from "@/app/components/LoadingAnimation";

export default function BlogDetailClient() {
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

  if (loading) return <LoadingAnimation text="Loading your blog post..." />;

  if (!post)
    return (
      <div className="min-h-screen bg-zinc-950 flex justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </div>
        
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#fac703]/20 via-[#f6d303]/20 to-[#e6b800]/20 rounded-full blur-3xl"
        />

        <div className="relative z-10 text-center">
          <ChefHat className="w-16 h-16 text-[#fac703] mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">Blog Post Not Found</h2>
          <p className="text-zinc-400 mb-8">Sorry, we couldn't find the blog post you're looking for.</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#fac703] via-[#f6d303] to-[#e6b800] text-white rounded-full font-bold hover:shadow-lg hover:shadow-[#fac703]/40 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Blog
          </Link>
        </div>
      </div>
    );

  return (
    <section className="relative min-h-screen bg-zinc-950 text-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#fac703]/20 via-[#f6d303]/20 to-[#e6b800]/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#fac703]/20 via-[#f6d303]/20 to-[#e6b800]/20 rounded-full blur-3xl"
      />

      {/* Hero Image Section */}
      <div className="relative h-[50vh] min-h-[400px] max-h-[600px] overflow-hidden group">
        <img
          src={post.image || "/placeholder.jpg"}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Back Button */}
        <Link
          href="/blog"
          className="absolute top-8 left-8 flex items-center gap-2 px-4 py-3 bg-zinc-900/90 backdrop-blur-md rounded-full text-white font-semibold shadow-lg hover:bg-zinc-800 transition-all duration-300 group/btn border border-zinc-800 hover:border-[#fac703]/50 z-20"
        >
          <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 -mt-24 relative z-10 pb-20">
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl shadow-2xl overflow-hidden border border-zinc-800 hover:border-[#fac703]/20 transition-all duration-300"
        >
          {/* Article Header */}
          <div className="p-8 md:p-12 lg:p-16 border-b border-zinc-800">
            {/* Meta Information */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="flex flex-wrap items-center gap-4 text-sm mb-8"
            >
              <div className="flex items-center gap-2 text-zinc-400">
                <Calendar className="w-4 h-4 text-[#fac703]" />
                <span>{post.date}</span>
              </div>
              {post.readTime && (
                <>
                  <span className="text-zinc-700">•</span>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Clock className="w-4 h-4 text-[#fac703]" />
                    <span>{post.readTime} min read</span>
                  </div>
                </>
              )}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight"
            >
              {post.title}
            </motion.h1>

            {/* Excerpt */}
            {post.excerpt && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg md:text-xl text-zinc-300 leading-relaxed italic border-l-4 border-[#fac703] pl-6"
              >
                {post.excerpt}
              </motion.p>
            )}
          </div>

          {/* Article Content */}
          <div className="p-8 md:p-12 lg:p-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="prose prose-invert max-w-none"
            >
              <div className="text-zinc-300 leading-relaxed whitespace-pre-line text-lg space-y-6">
                {post.content || "No content available for this post."}
              </div>
            </motion.div>
          </div>

          {/* Footer CTA */}
          <div className="bg-gradient-to-r from-[#fac703]/10 via-[#f6d303]/10 to-[#e6b800]/10 border-t border-zinc-800 p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              <div>
                <p className="text-sm text-zinc-400 mb-3">
                  Enjoyed this article?
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-[#fac703] hover:text-[#f6d303] font-bold transition-colors group"
                >
                  Read more articles
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Link>
              </div>
              
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-[#fac703] via-[#f6d303] to-[#e6b800] text-white rounded-full font-bold shadow-lg shadow-[#fac703]/25 hover:shadow-xl hover:shadow-[#fac703]/40 transition-all"
              >
                Share Article
              </motion.a>
            </motion.div>
          </div>
        </motion.article>

        {/* Related Posts Hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 border border-zinc-800 rounded-full text-white font-bold hover:border-[#fac703]/50 hover:bg-zinc-800/50 transition-all group"
          >
            Explore More Recipes & Stories
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
    </section>
  );
}

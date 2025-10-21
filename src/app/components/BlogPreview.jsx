"use client";

import { useState, useEffect, memo } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

// 🧠 Memoized BlogCard with lazy loading + fade-in
const BlogCard = memo(({ post, eager }) => {
  const [loaded, setLoaded] = useState(false);

  const date = post.updatedAt?.toDate
    ? post.updatedAt.toDate()
    : post.createdAt?.toDate
    ? post.createdAt.toDate()
    : null;

  const displayDate = date
    ? date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "No date";

  const contentText = post.content
    ? post.content.replace(/<[^>]+>/g, "").slice(0, 85) + "..."
    : "No description available.";

  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-amber-500/10">
      <Link href={`/blog/${post.id}`} prefetch>
        <div className="relative aspect-[16/9] bg-zinc-900 overflow-hidden">
          <img
            src={`${post.image || "/placeholder.jpg"}?auto=format&fit=crop&w=500&q=70`}
            alt={post.title}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            width="400"
            height="225"
            onLoad={() => setLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </Link>

      <div className="p-6">
        <Link href={`/blog/${post.id}`} prefetch>
          <h3 className="text-xl font-bold text-white mb-3 flex items-center justify-between">
            <span className="line-clamp-2">{post.title}</span>
            <ArrowRight className="w-5 h-5 flex-shrink-0" />
          </h3>
        </Link>

        <p className="text-zinc-400 text-sm mb-4 line-clamp-3">{contentText}</p>

        <div className="flex items-center gap-2 text-zinc-500 text-sm">
          <Calendar className="w-4 h-4 text-amber-500/70" aria-hidden="true" />
          <span>{displayDate}</span>
        </div>
      </div>
    </div>
  );
});
BlogCard.displayName = "BlogCard";

// 🏁 Main Component
export default function BlogPreview() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const cached = localStorage.getItem("blog-preview");

    if (cached) {
      setPosts(JSON.parse(cached));
      return;
    }

    getDocs(query(collection(db, "blogs"), orderBy("updatedAt", "desc"), limit(3)))
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        localStorage.setItem("blog-preview", JSON.stringify(data));
        setPosts(data);
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const isEmpty = posts.length === 0;

  return (
    <section className="relative bg-zinc-950 py-24">
      {/* 🩶 Static Grid Background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, #18181b 1px, transparent 1px), linear-gradient(to bottom, #18181b 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
          maskImage:
            "radial-gradient(ellipse 80% 50% at 50% 100%, #000 70%, transparent 110%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 50% at 50% 100%, #000 70%, transparent 110%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* 🧡 Header */}
        <header className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            From Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Kitchen
            </span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-6">
            Stories, recipes, and behind-the-scenes from the Bukka Island team.
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="h-0.5 w-20 bg-amber-500" />
            <Calendar className="w-5 h-5 text-amber-500" aria-hidden="true" />
            <div className="h-0.5 w-20 bg-amber-500" />
          </div>
        </header>

        {/* 📰 Blog Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {!isEmpty
            ? posts.map((post, i) => <BlogCard key={post.id} post={post} eager={i === 0} />)
            : Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden animate-pulse"
                >
                  <div className="aspect-[16/9] bg-zinc-800/30" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 w-3/4 bg-zinc-800/30 rounded" />
                    <div className="h-3 w-full bg-zinc-800/20 rounded" />
                    <div className="h-3 w-5/6 bg-zinc-800/20 rounded" />
                    <div className="h-3 w-32 bg-zinc-800/30 rounded" />
                  </div>
                </div>
              ))}
        </div>

        {/* 📘 CTA Button */}
        <div className="flex justify-center mt-16">
          <Link
            href="/blog"
            prefetch
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-amber-500/25"
          >
            Visit Our Blog
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

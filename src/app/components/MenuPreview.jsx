"use client";

import { useState, useEffect, memo } from "react";
import { Flame, Star, ArrowRight, BookOpen } from "lucide-react";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import Link from "next/link";
import { motion } from "framer-motion";

// 🧠 Memoized DishCard with scroll animation
const DishCard = memo(({ dish }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.article
      className="group relative bg-zinc-900/60 border border-zinc-800 rounded-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#e6b800]/20"
      aria-label={dish.name}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative aspect-[5/3] bg-zinc-900 overflow-hidden">
        <img
          src={`${dish.imageUrl}?auto=format&fit=crop&w=400&q=70`}
          alt={dish.name}
          loading="lazy"
          decoding="async"
          width="400"
          height="240"
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {dish.spicy > 0 && (
          <div className="absolute top-3 right-3 flex gap-1">
            {Array.from({ length: Math.min(dish.spicy, 3) }).map((_, i) => (
              <Flame
                key={i}
                className="w-3 h-3 text-[#e6b800] fill-[#e6b800]"
                aria-hidden="true"
              />
            ))}
          </div>
        )}

        <div className="absolute top-3 left-3 bg-gradient-to-r from-[#e6b800] via-[#c49c00] to-[#b38f00] text-white text-xs font-bold px-2 py-1 rounded-full">
          Popular
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-base font-bold text-white mb-1 truncate">{dish.name}</h3>
        <p className="text-xs text-zinc-500 mb-3 line-clamp-1">{dish.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-[#e6b800] fill-[#e6b800]" />
          </div>
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e6b800] via-[#c49c00] to-[#b38f00]">
            ${dish.price}
          </span>
        </div>
      </div>
    </motion.article>
  );
}, (prev, next) => prev.dish.id === next.dish.id);

DishCard.displayName = "DishCard";

// ⚡ Main Component
export default function MenuPreview() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "dishes"), orderBy("createdAt", "desc"), limit(10));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((dish) => dish.popular)
          .slice(0, 3); // only 3 popular dishes

        setDishes(data);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching dishes:", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <section className="relative bg-zinc-950 py-24">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, #18181b 1px, transparent 1px), linear-gradient(to bottom, #18181b 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
          maskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.header
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-3">
            Popular{" "}
            <span className="font text-transparent bg-clip-text bg-gradient-to-r from-[#e6b800] via-[#c49c00] to-[#b38f00]">
              Dishes
            </span>
          </h2>
          <p className="text-zinc-400">Handpicked favorites from our authentic menu</p>
        </motion.header>

        {/* Dishes Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16" role="list">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-zinc-900/40 border border-zinc-800 rounded-xl overflow-hidden animate-pulse"
              >
                <div className="aspect-[5/3] bg-zinc-800/30" />
                <div className="p-4 space-y-2">
                  <div className="h-4 w-3/4 bg-zinc-800/30 rounded" />
                  <div className="h-3 w-full bg-zinc-800/20 rounded" />
                  <div className="flex items-center justify-between pt-2">
                    <div className="h-3 w-10 bg-zinc-800/30 rounded" />
                    <div className="h-4 w-14 bg-zinc-800/30 rounded" />
                  </div>
                </div>
              </div>
            ))
          ) : dishes.length > 0 ? (
            dishes.map((dish) => <DishCard key={dish.id} dish={dish} />)
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20 col-span-full"
            >
              <BookOpen className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
              <p className="text-lg text-zinc-400">Menu not found.</p>
            </motion.div>
          )}
        </div>

        {/* View Menu Button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Link
            href="/menu"
            prefetch={false}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#e6b800] via-[#c49c00] to-[#b38f00] text-white rounded-full font-bold shadow-lg shadow-[#e6b800]/25 hover:scale-105 transition-transform"
          >
            View Menu
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* Fade Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
    </section>
  );
}

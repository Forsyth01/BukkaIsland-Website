"use client";

import { useState, useEffect, memo } from "react";
import { Flame, Star, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

// 🧠 Memoized DishCard with optimized images and better design
const DishCard = memo(
  ({ dish, index }) => {
    return (
      <motion.article
        className="group relative bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-sm border border-zinc-800/50 rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#e6b800]/50 hover:shadow-2xl hover:shadow-[#e6b800]/20"
        aria-label={dish.name}
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 0.7,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: index * 0.1,
        }}
        whileHover={{ y: -8 }}
      >
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#e6b800]/0 via-[#e6b800]/0 to-[#e6b800]/0 group-hover:from-[#e6b800]/5 group-hover:to-transparent transition-all duration-500 z-10 pointer-events-none" />

        {/* Image Container */}
        <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden">
          <Image
            src={dish.imageUrl}
            alt={dish.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            quality={75}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />

          {/* Gradient overlay on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

          {/* Spicy Indicator */}
          {dish.spicy > 0 && (
            <div className="absolute top-4 right-4 flex gap-1 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#e6b800]/30">
              {Array.from({ length: Math.min(dish.spicy, 3) }).map((_, i) => (
                <Flame
                  key={i}
                  className="w-3.5 h-3.5 text-[#e6b800] fill-[#e6b800] drop-shadow-lg"
                  aria-hidden="true"
                />
              ))}
            </div>
          )}

          {/* Popular Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-gradient-to-r from-[#e6b800] via-[#c49c00] to-[#b38f00] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            <Sparkles className="w-3 h-3" />
            Popular
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6 space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-[#e6b800] transition-colors duration-300">
                {dish.name}
              </h3>
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#e6b800] via-[#c49c00] to-[#b38f00]">
                ${dish.price}
              </span>
            </div>
            <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
              {dish.description}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 ">
            <div className="flex items-center gap-1.5">
              {/* <Star className="w-4 h-4 text-[#e6b800] fill-[#e6b800]" /> */}
              {/* <span className="text-sm text-zinc-500 font-medium">Featured</span> */}
            </div>
            <div className="flex items-center gap-2"></div>
          </div>
        </div>

        {/* Shine effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </motion.article>
    );
  },
  (prev, next) => prev.dish.id === next.dish.id
);

DishCard.displayName = "DishCard";

// ⚡ Main Component
export default function MenuPreview() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "dishes"),
      orderBy("createdAt", "desc"),
      limit(10)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((dish) => dish.popular)
          .slice(0, 3);

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
    <section className="relative bg-zinc-950 py-28 overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to right, #18181b 1px, transparent 1px), linear-gradient(to bottom, #18181b 1px, transparent 1px)",
            backgroundSize: "4rem 4rem",
            maskImage:
              "radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%)",
          }}
        />
      </div>

      {/* Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#e6b800]/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#c49c00]/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.header
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-1 w-16 bg-gradient-to-r from-transparent via-[#e6b800] to-[#b38f00] rounded-full"
            />
            <span className="text-sm text-[#e6b800] font-bold uppercase tracking-widest">
              Featured Dishes
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-1 w-16 bg-gradient-to-r from-[#b38f00] via-[#e6b800] to-transparent rounded-full"
            />
          </div>

          <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Hot on the{" "}
            <span className="relative inline-block">
              <span className="font relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#e6b800] via-[#c49c00] to-[#b38f00]">
                Menu
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-3 bg-[#e6b800]/20 rounded-full blur-sm"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              />
            </span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Handpicked favorites crafted with authentic Nigerian flavors
          </p>
        </motion.header>

        {/* Dishes Grid */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          role="list"
        >
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-zinc-900/40 to-zinc-950/40 border border-zinc-800/50 rounded-2xl overflow-hidden"
              >
                <div className="aspect-[4/3] bg-zinc-800/30 animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="space-y-2">
                    <div className="h-5 w-3/4 bg-zinc-800/30 rounded animate-pulse" />
                    <div className="h-4 w-full bg-zinc-800/20 rounded animate-pulse" />
                    <div className="h-4 w-5/6 bg-zinc-800/20 rounded animate-pulse" />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="h-4 w-16 bg-zinc-800/30 rounded animate-pulse" />
                    <div className="h-6 w-12 bg-zinc-800/30 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))
          ) : dishes.length > 0 ? (
            dishes.map((dish, index) => (
              <DishCard key={dish.id} dish={dish} index={index} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="text-center py-24 col-span-full"
            >
              <div className="relative inline-block mb-6">
                <BookOpen className="w-20 h-20 text-zinc-700 mx-auto" />
                <div className="absolute inset-0 bg-[#e6b800]/10 blur-2xl" />
              </div>
              <p className="text-xl text-zinc-400 mb-2">
                No dishes available yet
              </p>
              <p className="text-sm text-zinc-600">
                Check back soon for our featured menu items
              </p>
            </motion.div>
          )}
        </div>

        {/* View Menu Button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            href="/menu"
            prefetch={false}
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-[#e6b800] via-[#c49c00] to-[#b38f00] text-white text-lg rounded-full font-bold shadow-xl shadow-[#e6b800]/30 hover:shadow-2xl hover:shadow-[#e6b800]/40 transition-all duration-300 overflow-hidden"
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

            <span className="relative z-10">Explore Full Menu</span>
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>

      {/* Fade Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
    </section>
  );
}

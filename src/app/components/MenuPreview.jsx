"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame, Star, ArrowRight } from "lucide-react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  limit,
} from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import Link from "next/link"; // Import Link for the main CTA

export default function MenuPreview() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        // Optimized query: Filter and limit on the server
        const q = query(
          collection(db, "dishes"),
          where("popular", "==", true),
          orderBy("createdAt", "desc"),
          limit(4)
        );
        
        const snapshot = await getDocs(q);
        const dishesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDishes(dishesData);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };

    fetchDishes();
  }, []);

  return (
    <section className="relative overflow-hidden bg-zinc-950 py-24">
      {/* Background (from Hero) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Animated Orb (from Hero) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Our Popular{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 animate-gradient">
              Dishes
            </span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-6">
            Handpicked favorites from our authentic Nigerian menu.
          </p>

          {/* Animated underline (from Hero/Blog) */}
          <div className="flex items-center justify-center gap-2">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-0.5 w-20 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
            />
            <Flame className="w-5 h-5 text-amber-500" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-0.5 w-20 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
            />
          </div>
        </motion.div>

        {/* Dishes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {dishes.map((dish, idx) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="group relative bg-zinc-900/80 border border-zinc-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 backdrop-blur-sm"
              whileHover={{ y: -5 }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                {/* Assuming dish.image is a URL. Using placeholder if not. */}
                <motion.img
                  src={dish.image || "/placeholder-dish.jpg"}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Badges */}
                {dish.spicy > 0 && (
                  <div className="absolute top-3 right-3 flex gap-1 bg-black/30 p-1 rounded-full">
                    {[...Array(dish.spicy)].map((_, i) => (
                      <Flame
                        key={i}
                        className="w-4 h-4 text-orange-400 fill-orange-400"
                      />
                    ))}
                  </div>
                )}

                {dish.popular && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Popular
                  </div>
                )}

                {/* Hover Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-bold text-sm shadow-lg shadow-amber-500/20"
                  >
                    Add to Cart
                  </motion.button>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2">
                  {dish.name}
                </h3>
                <p className="text-sm text-zinc-400 mb-4 line-clamp-2 h-10">
                  {dish.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm text-white font-semibold">
                      {dish.rating}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                    {/* Assuming price is a string like "$15.99". 
                        If it's a number, you'd format it: ${dish.price} */}
                    {dish.price}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Using Link for internal navigation */}
          <Link href="/menu" passHref legacyBehavior>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full font-bold text-white text-lg shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Full Menu
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
          </Link>
        </motion.div>
      </div>

      {/* Bottom Fade (from Hero) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />

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
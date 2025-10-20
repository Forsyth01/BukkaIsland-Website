"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame, Star } from "lucide-react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import Link from "next/link";

export default function MenuPreview() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const q = query(collection(db, "dishes"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const dishesData = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((dish) => dish.popular)
          .slice(0, 4);
        setDishes(dishesData)
        //  console.log("Fetched dishes:", dishesData);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };

   
    fetchDishes();
  }, []);

  return (
    <section className="relative overflow-hidden bg-zinc-950 py-24">
      {/* Animated Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Glowing Orb */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-3">
            Popular{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Dishes
            </span>
          </h2>
          <p className="text-zinc-400">
            Handpicked favorites from our authentic menu
          </p>
        </motion.div>

        {/* Dishes Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {dishes.map((dish, idx) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="group relative bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              {/* Image Section */}
              <div className="relative h-40 bg-gradient-to-br from-amber-500/10 to-orange-600/10 overflow-hidden flex items-center justify-center">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <img
                      src={dish.imageUrl}
                    alt={dish.name}
                    className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </motion.div>

                {dish.spicy > 0 && (
                  <div className="absolute top-3 right-3 flex gap-1">
                    {[...Array(dish.spicy)].map((_, i) => (
                      <Flame
                        key={i}
                        className="w-3 h-3 text-orange-500 fill-orange-500"
                      />
                    ))}
                  </div>
                )}

                {dish.popular && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Popular
                  </div>
                )}
              </div>

              {/* Text Section */}
              <div className="p-4">
                <h3 className="text-base font-bold text-white mb-1">
                  {dish.name}
                </h3>
                <p className="text-xs text-zinc-500 mb-3 line-clamp-1">
                  {dish.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="text-xs text-white font-semibold">
                      {dish.rating}
                    </span>
                  </div>
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                    {dish.price}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />

      {/* Gradient Animation */}
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

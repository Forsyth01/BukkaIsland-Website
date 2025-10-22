"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Filter, ChefHat, Star, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import LoadingAnimation from "@/app/components/LoadingAnimation";

export default function MenuPage() {
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDishes = async () => {
      const q = query(collection(db, "dishes"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const dishesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const catSet = new Set(dishesData.map((d) => d.category));
      setCategories(["All", ...Array.from(catSet)]);
      setDishes(dishesData);

      setTimeout(() => setLoading(false), 1500);
    };

    fetchDishes();
  }, []);

  const filteredDishes =
    activeCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === activeCategory);

  return (
    <section className="relative min-h-screen bg-zinc-950 text-white px-6 md:px-16 py-10 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Glowing Background Orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.45, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#fac703]/20 via-[#f6d303]/20 to-[#e6b800]/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#fac703]/20 via-[#f6d303]/20 to-[#e6b800]/20 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center gap-3 cursor-pointer text-[#fac703] hover:text-[#f6d303]"
        >
          <Link href="/">
            <ArrowRight className="w-5 h-5 rotate-180 inline-block" />
            <span className="ml-2 font-semibold">Back to Home</span>
          </Link>
        </motion.div>

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
            <ChefHat className="w-6 h-6 text-[#fac703]" />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              className="h-0.5 w-20 bg-gradient-to-r from-transparent via-[#fac703] to-transparent"
            />
          </div>

          <h1 className="text-6xl md:text-7xl font-black mb-4">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fac703] via-[#f6d303] to-[#e6b800]">
              Menu
            </span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Discover our mouthwatering meals, freshly made every day with authentic Nigerian flavors
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="sticky top-0 z-40 flex flex-wrap justify-center gap-3 mb-16 pb-6 bg-gradient-to-b from-zinc-950 via-zinc-950 to-transparent backdrop-blur-sm"
        >
          {categories.map((cat, idx) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-[#fac703] via-[#f6d303] to-[#e6b800] text-white shadow-lg shadow-[#fac703]/40"
                  : "bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-[#fac703]/50 hover:text-white"
              }`}
            >
              {cat === "All" && <Filter className="w-4 h-4" />}
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Menu Grid + Loader */}
        <div className="relative min-h-[300px]">
          <AnimatePresence>
            {loading && (
              <motion.div
                key="loader"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 z-50 flex items-center justify-center"
              >
                <LoadingAnimation message="Loading our tasty dishes..." />
              </motion.div>
            )}
          </AnimatePresence>

          {!loading && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredDishes.map((dish, i) => (
                <motion.div
                  key={dish.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -10 }}
                  className="group relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 hover:border-[#fac703]/50 transition-all duration-300 flex flex-col"
                >
                  {dish.popular && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="absolute top-4 left-4 bg-gradient-to-r from-[#fac703] via-[#f6d303] to-[#e6b800] text-white px-4 py-2 rounded-full text-xs flex items-center gap-2 z-10 font-bold shadow-lg"
                    >
                      <Star className="w-4 h-4 fill-current" />
                      Popular
                    </motion.div>
                  )}

                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#fac703]/10 via-[#f6d303]/10 to-[#e6b800]/10">
                    <Image
                      src={dish.imageUrl}
                      alt={dish.name}
                      width={400}
                      height={300}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#fac703] transition-colors">
                        {dish.name}
                      </h3>
                      <p className="text-zinc-400 text-sm line-clamp-2 mb-3">{dish.desc}</p>
                    </div>

                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-zinc-800">
                      <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#fac703] via-[#f6d303] to-[#e6b800]">
                        ${dish.price}
                      </span>

                      {dish.orderLink ? (
                        <Link href={dish.orderLink} target="_blank" rel="noopener noreferrer">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-[#fac703] via-[#f6d303] to-[#e6b800] text-white px-5 py-2 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-[#fac703]/40 transition-all flex items-center gap-2 group/btn cursor-pointer"
                          >
                            Order
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </motion.button>
                        </Link>
                      ) : (
                        <motion.button
                          disabled
                          className="bg-zinc-800 text-zinc-500 px-5 py-2 rounded-full text-sm font-bold cursor-not-allowed"
                        >
                          Unavailable
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {!loading && filteredDishes.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20"
            >
              <ChefHat className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
              <p className="text-lg text-zinc-400">No dishes in this category yet</p>
            </motion.div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
    </section>
  );
}

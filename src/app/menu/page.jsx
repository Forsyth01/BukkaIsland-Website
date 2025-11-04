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
      try {
        const snapshot = await getDocs(collection(db, "dishes"));
        const dishesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort by order field first, then by createdAt as fallback
        dishesData.sort((a, b) => {
          // If both have order field, sort by order
          if (a.order !== undefined && b.order !== undefined) {
            return a.order - b.order;
          }
          // If only one has order, prioritize it
          if (a.order !== undefined) return -1;
          if (b.order !== undefined) return 1;
          
          // Fallback to createdAt
          const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
          const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
          return dateB - dateA;
        });

        const catSet = new Set(dishesData.map((d) => d.category));
        setCategories(["All", ...Array.from(catSet)]);
        setDishes(dishesData);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      } finally {
        setLoading(false);
      }
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

      {/* Simplified Glowing Orbs - removed animations for performance */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#fac703]/15 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#e6b800]/15 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - Simplified animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-[#fac703] to-transparent" />
            <ChefHat className="w-6 h-6 text-[#fac703]" />
            <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-[#fac703] to-transparent" />
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-3">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fac703] via-[#f6d303] to-[#e6b800]">
              Menu
            </span>
          </h1>
          <p className="text-base text-zinc-400 max-w-2xl mx-auto">
            Discover our mouthwatering meals, freshly made every day with authentic Nigerian flavors
          </p>
        </motion.div>

        {/* Category Filter - Simplified */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="sticky top-0 z-40 flex flex-wrap justify-center gap-3 mb-12 pb-6 bg-gradient-to-b from-zinc-950 via-zinc-950 to-transparent backdrop-blur-sm"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-[#fac703] via-[#f6d303] to-[#e6b800] text-white shadow-lg"
                  : "bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-[#fac703]/50"
              }`}
            >
              {cat === "All" && <Filter className="w-4 h-4" />}
              {cat}
            </button>
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredDishes.map((dish, i) => (
                <motion.div
                  key={dish.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3) }}
                  className="group relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 hover:border-[#fac703]/50 transition-all duration-300 flex flex-col"
                >
                  {dish.popular && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-[#fac703] via-[#f6d303] to-[#e6b800] text-white px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 z-10 font-bold shadow-lg">
                      <Star className="w-3 h-3 fill-current" />
                      Popular
                    </div>
                  )}

                  <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#fac703]/10 to-[#e6b800]/10">
                    <Image
                      src={dish.imageUrl}
                      alt={dish.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading={i < 6 ? "eager" : "lazy"}
                      quality={85}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#fac703] transition-colors">
                        {dish.name}
                      </h3>
                      <p className="text-zinc-400 text-sm line-clamp-2 mb-3">{dish.desc}</p>
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-zinc-800">
                      <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#fac703] via-[#f6d303] to-[#e6b800]">
                        ${dish.price}
                      </span>

                      {dish.orderLink ? (
                        <Link href={dish.orderLink} target="_blank" rel="noopener noreferrer">
                          <button className="bg-gradient-to-r from-[#fac703] via-[#f6d303] to-[#e6b800] text-white px-4 py-2 rounded-full text-sm font-bold hover:shadow-lg transition-all flex items-center gap-2">
                            Order
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </Link>
                      ) : (
                        // <button
                        //   disabled
                        //   className="bg-zinc-800 text-zinc-500 px-4 py-2 rounded-full text-sm font-bold cursor-not-allowed"
                        // >
                        //   Unavailable
                        // </button>
                        <div className="">
                          
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {!loading && filteredDishes.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
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
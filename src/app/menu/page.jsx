"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Filter, ChefHat, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function MenuPage() {
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      const q = query(collection(db, "dishes"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const dishesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Extract categories dynamically
      const catSet = new Set(dishesData.map((d) => d.category));
      setCategories(["All", ...Array.from(catSet)]);
      setDishes(dishesData);
    };

    fetchDishes();
  }, []);

  const filteredDishes =
    activeCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === activeCategory);

  return (
    <section className="min-h-screen bg-[#fff5eb] text-gray-900 px-6 md:px-16 py-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-orange-600 flex justify-center items-center gap-3"
        >
          <ChefHat className="w-10 h-10 text-orange-600" />
          Our Menu
        </motion.h1>

        <p className="text-gray-700 mt-4 mb-12 text-lg">
          Discover our mouthwatering meals, freshly made every day!
        </p>

        {/* Sticky Filter Buttons */}
        <div className="sticky top-0 z-20 flex flex-wrap justify-center gap-4 mb-12 bg-[#fff5eb] py-4">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition border ${
                activeCategory === cat
                  ? "bg-orange-600 text-white border-orange-600"
                  : "bg-white text-orange-700 border-orange-600 hover:bg-orange-50"
              }`}
            >
              {cat === "All" && <Filter className="w-4 h-4" />}
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Menu Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDishes.map((dish, i) => (
            <motion.div
              key={dish.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col relative group"
            >
              {/* Popular Badge */}
              {dish.popular && (
                <div className="absolute top-3 left-3 bg-orange-600 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 z-10">
                  <Star className="w-3 h-3" />
                  Popular
                </div>
              )}

              <div className="relative h-56 overflow-hidden">
                <Image
                  src={dish.imageUrl}
                  alt={dish.name}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-orange-700 mb-2">
                    {dish.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">{dish.desc}</p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-orange-600 font-semibold">{dish.price}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-700 transition"
                  >
                    Order Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

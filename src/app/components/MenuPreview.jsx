"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function MenuPreview() {
  const [dishes, setDishes] = useState([]);
  const [is2xl, setIs2xl] = useState(false);

  useEffect(() => {
    // Fetch dishes from Firestore
    const fetchDishes = async () => {
      const q = query(collection(db, "dishes"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const dishesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDishes(dishesData);
    };

    fetchDishes();

    // Detect 2xl screens
    const handleResize = () => {
      setIs2xl(window.innerWidth >= 1536); // Tailwind 2xl breakpoint
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Only show popular dishes
  const popularDishes = dishes.filter((dish) => dish.popular);

  // Determine how many dishes to display
  const displayedDishes = popularDishes.slice(0, is2xl ? 4 : 3);

  return (
    <section className="py-16 bg-orange-50" id="menu-preview">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">
          Popular Dishes
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {displayedDishes.length > 0 ? (
            displayedDishes.map((dish, i) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={dish.imageUrl}
                  alt={dish.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{dish.name}</h3>
                  <p className="text-orange-600 font-medium mt-1">{dish.price}</p>
                  <p className="text-gray-500 text-sm mt-1">{dish.category}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-gray-500">No dishes available.</p>
          )}
        </div>

        <div className="mt-10">
          <Link href="/menu">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-600 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-orange-700 transition"
            >
              View Full Menu
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}

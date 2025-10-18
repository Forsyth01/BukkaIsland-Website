"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Utensils } from "lucide-react";
import LoadingAnimation from "./LoadingAnimation";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* <div className="absolute inset-0">
        <Image
          src="/hero-food.jpg"
          alt="BukkaIsland Food Truck"
          fill
          className="object-cover opacity-60"
        />
      </div> */}

      <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-4"
        >
          <Utensils className="w-10 h-10 text-orange-600" />
          <h1 className="text-5xl md:text-6xl font-extrabold text-orange-600 drop-shadow-lg">
            BukkaIsland
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-gray-800 max-w-xl"
        >
          Street flavors, island vibes 🌴 — experience authentic Nigerian meals
          from our food truck!
        </motion.p>
        {/* <LoadingAnimation /> */}
        <motion.a
          href="#menu"
          whileHover={{ scale: 1.05 }}
          className="mt-8 inline-block bg-orange-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-orange-700 transition"
        >
          Explore Our Menu
        </motion.a>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Info } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 px-6 md:px-16 bg-orange-50">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-orange-600 mb-6 flex justify-center items-center gap-2"
        >
          <Info className="w-8 h-8 text-orange-600" />
          About BukkaIsland
        </motion.h2>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          At BukkaIsland, we bring the spirit of Naija streets straight to your plate.
          Our food truck serves freshly made dishes bursting with local flavors —
          from Jollof Rice to Suya, everything is made with love and spice.
        </p>
      </div>
    </section>
  );
}

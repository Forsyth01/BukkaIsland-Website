"use client";

import { motion } from "framer-motion";
import { Soup, Utensils } from "lucide-react";

export default function LoadingAnimation({ message = "Preparing your meal..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Bowl */}
        <motion.div
          initial={{ y: 30, opacity: 0, scale: 0.8 }}
          animate={{
            y: [30, 0, 5, 0],
            opacity: 1,
            scale: [0.8, 1, 1.05, 1],
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          <Soup className="w-28 h-28 text-[#fac703] drop-shadow-[0_0_15px_rgba(250,199,3,0.4)]" />
        </motion.div>

        {/* Spoon coming in from right */}
        <motion.div
          initial={{ x: 80, y: -10, rotate: 40, opacity: 0 }}
          animate={{
            x: [80, 0, 5, 0],
            rotate: [40, 0, -5, 0],
            opacity: [0, 1, 1, 0.8],
          }}
          transition={{
            duration: 1.4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="absolute right-10 top-5"
        >
          <Utensils className="w-10 h-10 text-[#fac703]" />
        </motion.div>

        {/* Fork coming in from left */}
        <motion.div
          initial={{ x: -80, y: -10, rotate: -40, opacity: 0 }}
          animate={{
            x: [-80, 0, -5, 0],
            rotate: [-40, 0, 5, 0],
            opacity: [0, 1, 1, 0.8],
          }}
          transition={{
            duration: 1.4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="absolute left-10 top-5"
        >
          <Utensils className="w-10 h-10 text-[#fac703]" />
        </motion.div>
      </div>

      {/* Dynamic Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-10 text-[#fac703] text-lg tracking-wide font-medium text-center"
      >
        {message}
      </motion.p>
    </div>
  );
}

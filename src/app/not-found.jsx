"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  // Sparkle positions and sizes
  const sparkles = [
    { top: "10%", left: "20%", size: 3, delay: 0 },
    { top: "30%", left: "70%", size: 4, delay: 1 },
    { top: "60%", left: "40%", size: 2, delay: 0.5 },
    { top: "80%", left: "80%", size: 3, delay: 1.5 },
  ];

  return (
    <div className="min-h-screen relative bg-zinc-950 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-blob animation-delay-2000" />

        {/* Floating Sparkles */}
        {sparkles.map((s, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: s.delay,
            }}
            className={`absolute bg-white rounded-full`}
            style={{
              top: s.top,
              left: s.left,
              width: `${s.size}px`,
              height: `${s.size}px`,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-xl w-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl shadow-lg p-10 flex flex-col items-center text-center"
      >
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-2xl font-semibold text-white/90 mb-6">Oops! Page not found.</p>
        <p className="text-zinc-300 mb-8">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-5 h-5" /> Go Back Home
        </button>
      </motion.div>
    </div>
  );
}

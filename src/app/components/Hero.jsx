"use client";

import { motion } from "framer-motion";
import { Utensils, Sparkles, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 min-h-screen">
      {/* Animated grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Radial gradient spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(245,158,11,0.15),transparent_50%)]" />
      
      {/* Animated orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl"
      />

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
        
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-900/80 border border-amber-500/20 rounded-full mb-8 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="text-sm text-zinc-300 font-medium">Authentic Nigerian Cuisine</span>
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-6"
        >
          <h1 className="text-7xl md:text-9xl font-black text-white mb-4 tracking-tight">
            Bukka
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 animate-gradient">
              Island
            </span>
          </h1>
          
          {/* Animated underline */}
          <div className="flex items-center justify-center gap-2">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-0.5 w-20 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
            />
            <Utensils className="w-5 h-5 text-amber-500" />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-0.5 w-20 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
            />
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl text-zinc-400 max-w-2xl text-center mb-16 leading-relaxed"
        >
          Where <span className="text-amber-500 font-semibold">street flavors</span> meet island vibes.
          <br />
          Your favorite Nigerian meals, rolling to you 🌴
        </motion.p>

        {/* Food showcase area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="relative mb-16 group"
        >
          {/* Pulsing glow */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-2xl"
          />
          
          {/* Main container */}
          <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-zinc-900 to-zinc-950 border-2 border-zinc-800 group-hover:border-amber-500/50 transition-all duration-500 flex items-center justify-center overflow-hidden">
            
            {/* Animated rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-zinc-800 scale-90"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-zinc-800 scale-75"
            />
            
            {/* Image placeholder */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative z-10"
            >
              {/* Replace with your Image component */}
              {/* <Image src="/your-food-image.png" alt="Nigerian Food" width={280} height={280} className="object-contain" /> */}
              <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-full flex items-center justify-center">
                <Utensils className="w-24 h-24 text-zinc-700" strokeWidth={1.5} />
              </div>
            </motion.div>

            {/* Floating particles */}
            <motion.div
              animate={{
                y: [-10, 10, -10],
                x: [0, 5, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-10 w-3 h-3 bg-amber-500/60 rounded-full blur-sm"
            />
            <motion.div
              animate={{
                y: [10, -10, 10],
                x: [0, -5, 0],
                rotate: [0, -180, -360]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-10 left-10 w-2 h-2 bg-orange-500/60 rounded-full blur-sm"
            />
          </div>

          {/* Corner accents */}
          <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-amber-500/30 rounded-tl-xl" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-amber-500/30 rounded-br-xl" />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <motion.a
            href="#menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full font-bold text-white text-lg shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Menu
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>

          <motion.a
            href="#location"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 bg-zinc-900 border-2 border-zinc-800 hover:border-amber-500/50 rounded-full font-bold text-white text-lg transition-all duration-300 flex items-center gap-2"
          >
            <MapPin className="w-5 h-5 text-amber-500" />
            Find Us
          </motion.a>
        </motion.div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-16 flex flex-wrap gap-8 justify-center text-center"
        >
          <div>
            <p className="text-2xl font-bold text-white">100%</p>
            <p className="text-sm text-zinc-500 uppercase tracking-wide">Authentic</p>
          </div>
          <div className="w-px h-12 bg-zinc-800" />
          <div>
            <p className="text-2xl font-bold text-white">Fresh</p>
            <p className="text-sm text-zinc-500 uppercase tracking-wide">Daily</p>
          </div>
          <div className="w-px h-12 bg-zinc-800" />
          <div>
            <p className="text-2xl font-bold text-white">Local</p>
            <p className="text-sm text-zinc-500 uppercase tracking-wide">Ingredients</p>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
      
      {/* CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}
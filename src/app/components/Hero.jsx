"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Utensils, Sparkles, MapPin } from "lucide-react";

const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
});

export default memo(function Hero() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 min-h-screen">
      {/* Background Grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Radial Light Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(245,158,11,0.15),transparent_50%)]" />

      {/* Soft Orbs (fade in only once) */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.6 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20 text-center">
        {/* Top Badge */}
        <motion.div
          {...fadeInUp(0)}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-900/80 border border-amber-500/20 rounded-full mb-8 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="text-sm text-zinc-300 font-medium">
            Authentic Nigerian Cuisine
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div {...fadeInUp(0.2)}>
          <h1 className="text-7xl md:text-9xl font-black text-white mb-4 tracking-tight">
            Bukka
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400">
          Island
            </span>
          </h1>

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
          {...fadeInUp(0.5)}
          className="text-xl md:text-2xl text-zinc-400 max-w-2xl mb-16 leading-relaxed"
        >
          Where <span className="text-amber-500 font-semibold">street flavors</span> meet island
          vibes.
          <br />
          Your favorite Nigerian meals, rolling to you 🌴
        </motion.p>

        {/* Central Circle (spins only once) */}
        <motion.div {...fadeInUp(0.7)} className="relative mb-16 group">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-2xl" />

          <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 transition-all flex items-center justify-center overflow-hidden">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border border-dashed border-zinc-800 scale-90"
            />
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border border-dashed border-zinc-800 scale-75"
            />

            <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-full flex items-center justify-center">
              <Utensils className="w-24 h-24 text-zinc-700" strokeWidth={1.5} />
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div {...fadeInUp(0.9)} className="flex flex-col sm:flex-row gap-4 items-center">
          <a
            href="#menu"
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full font-bold text-white text-lg shadow-lg transition-all duration-300"
          >
            View Menu →
          </a>

          <a
            href="#location"
            className="px-8 py-4 bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 rounded-full font-bold text-white text-lg transition-all flex items-center gap-2"
          >
            <MapPin className="w-5 h-5 text-amber-500" />
            Find Us
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeInUp(1.1)} className="mt-16 flex flex-wrap gap-8 justify-center text-center">
          {[
            { label: "Authentic", value: "100%" },
            { label: "Fresh", value: "Daily" },
            { label: "Ingredients", value: "Local" },
          ].map((item, i) => (
            <div key={i}>
              <p className="text-2xl font-bold text-white">{item.value}</p>
              <p className="text-sm text-zinc-500 uppercase tracking-wide">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
    </section>
  );
});

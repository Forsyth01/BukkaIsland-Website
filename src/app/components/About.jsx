"use client";

import { motion } from "framer-motion";
import { Heart, Users, Leaf, Zap, Award } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
};

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-zinc-950 min-h-screen"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#e6b800]/15 rounded-full blur-xl animate-pulse-slow will-change-transform" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#c49c00]/15 rounded-full blur-xl animate-pulse-slower will-change-transform" />

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20 pt-10"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="h-1 w-20 bg-gradient-to-r from-transparent via-[#e6b800] to-[#b38f00]"
            />
            <span className="text-sm text-[#e6b800] font-medium uppercase tracking-widest">
              About Us
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="h-1 w-20 bg-gradient-to-r from-transparent via-[#e6b800] to-[#b38f00]"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            The Story of
            <span className="font text-transparent bg-clip-text bg-gradient-to-r from-[#e6b800] via-[#c49c00] to-[#b38f00]">
              {" "}
              BukkaIsland
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            From the bustling streets of Lagos to your table, we bring authentic
            Nigerian flavors wrapped in modern convenience — born from a passion
            for street food excellence and a mission to share our culture one
            meal at a time.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          {...fadeInUp}
          className="grid md:grid-cols-2 gap-12 items-center mb-20"
        >
          <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800">
            {/* Glow animation */}
            {/* <div className="absolute inset-0 bg-gradient-to-br from-[#e6b800]/20 via-[#c49c00]/15 to-[#b38f00]/10 blur-xl animate-glow-slow" />
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <Award className="w-32 h-32 text-[#e6b800]/40" />
            </div> */}
            <img
              src="/bukka_about3.jpg"
              alt=""
              className="object-cover w-full h-full"
            />
          </div>

          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Where It All Started
            </h2>
            <p className="text-zinc-400 text-lg mb-4 leading-relaxed">
              BukkaIsland was born from a simple dream — to bring the authentic
              taste of Nigerian street food to everyone, regardless of where
              they are. What started as a small food cart has grown into a
              movement celebrating our rich culinary heritage.
            </p>
            <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
              Every recipe tells a story — stories of grandmothers, home
              kitchens, and the vibrant food culture that defines Nigeria. We
              don't just serve food; we serve memories, traditions, and the
              warmth of home.
            </p>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex gap-4"
            >
              <div className="border-l-2 border-[#e6b800] pl-4">
                <p className="text-sm text-[#e6b800] uppercase font-bold tracking-wide">
                  Since 2019
                </p>
                <p className="text-zinc-500">
                  Serving authentic Nigerian cuisine
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Gradient fade bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
    </section>
  );
}

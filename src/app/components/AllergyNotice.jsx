"use client";

import { motion } from "framer-motion";
import { Heart, Users, Leaf, Zap, Award } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
};

export default function AllergyNotice() {
  return (
    <section
      id=""
      className="relative overflow-hidden bg-zinc-950 py-20"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#e6b800]/15 rounded-full blur-xl animate-pulse-slow will-change-transform" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#c49c00]/15 rounded-full blur-xl animate-pulse-slower will-change-transform" />

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 ">
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
              Notice
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
            Allergy
            <span className="font text-transparent bg-clip-text bg-gradient-to-r from-[#e6b800] via-[#c49c00] to-[#b38f00]">
              {" "}
              notice
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Please be advised that our Suya spice blend contains peanuts as part
            of its traditional preparation. While we take great care in handling
            all ingredients, cross-contact with other allergens may occur.
          </p>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex gap-4 justify-center my-3"
        >
          <div className="">
            <p className="text-sm text-[#e6b800] uppercase font-bold tracking-wide">
              Your health is important to us
            </p>
            <p className="text-zinc-500 text-lg md:text-xl my-2">
              please inform our team of any allergies before placing your order.
            </p>
          </div>
        </motion.div>
        </motion.div>

        
      </div>

      {/* Gradient fade bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

export default function NoticeSection() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 py-24">
      {/* Background grid (softer) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-30" />
      </div>

      {/* Ambient glow (less intense) */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-[#e6b800]/10 rounded-full blur-2xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#b38f00]/10 rounded-full blur-2xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Label */}
          <p className="text-xs text-[#e6b800] uppercase tracking-widest font-semibold mb-4">
            General Information
          </p>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">
            Our{" "}
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[#e6b800] to-[#b38f00]">
              Guarantee
            </span>
          </h1>

          {/* Body */}
          <div className="max-w-3xl mx-auto space-y-6 text-zinc-400 text-lg leading-relaxed">
            <p>
              At Bukka Island, we work hard to give you great service and a
              consistently delicious product. If for any reason our products are
              not up to our standards, simply let us know.
            </p>

            <p>
              We’ll gladly replace your order or provide a full refund where
              applicable.
            </p>

            <p className="text-zinc-500 text-base">
              Kindly send an Instagram DM or email{" "}
              <span className="text-[#e6b800] font-medium">
                <a
                  href="mailto:blockb.contact@gmail.com"
                  className="text-[#e6b800] font-medium hover:underline underline-offset-4"
                >
                  blockb.contact@gmail.com
                </a>{" "}
              </span>{" "}
              for any complaints, replacements, or information regarding
              payments made to personal accounts for a{" "}
              <span className="font-semibold">full refund</span>.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent" />
    </section>
  );
}

"use client";

import { memo } from "react";
import { Utensils, Sparkles, MapPin } from "lucide-react";

export default memo(function Hero() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 min-h-screen">
      {/* Background Grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Radial Light Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(250,199,3,0.15),transparent_50%)]" />

      {/* Soft Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#fac703]/20 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#e6b800]/20 rounded-full blur-3xl opacity-30" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20 text-center">
        {/* Top Badge */}
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/80 border border-[#fac703]/20 rounded-full mb-8 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-[#fac703]" />
          <span className="text-sm text-zinc-300 font-medium">
            Authentic Nigerian Cuisine
          </span>
        </div>

        {/* Heading */}
        <div className="relative">
          <h1 className="text-7xl md:text-9xl font-black text-white mb-4 tracking-tight relative">
            {/* Top Gradient Line */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-48 h-0.5 bg-gradient-to-r from-transparent via-[#fac703] to-[#e6b800]" />
            
            Bukka
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fac703] to-[#e6b800]">
              Island
            </span>

            {/* Bottom Gradient Line */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-48 h-0.5 bg-gradient-to-r from-transparent via-[#fac703] to-[#e6b800]" />
          </h1>

          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-[#fac703] to-[#e6b800]" />
            <Utensils className="w-5 h-5 text-[#fac703]" />
            <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-[#fac703] to-[#e6b800]" />
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mb-16 leading-relaxed">
          Where <span className="text-[#fac703] font-semibold">street flavors</span>{" "}
          meet island vibes.
          <br />
          Your favorite Nigerian meals, rolling to you 🌴
        </p>

        {/* Central Circle */}
        <div className="relative mb-16 group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#fac703]/20 to-[#e6b800]/20 rounded-full blur-2xl" />

          <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 rounded-full border border-dashed border-zinc-800 scale-90" />
            <div className="absolute inset-0 rounded-full border border-dashed border-zinc-800 scale-75" />

            <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-full flex items-center justify-center">
              <Utensils className="w-24 h-24 text-zinc-700" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <a
            href="#menu"
            className="px-8 py-4 bg-gradient-to-r from-[#fac703] to-[#e6b800] rounded-full font-bold text-white text-lg shadow-lg transition-all duration-300"
          >
            View Menu →
          </a>

          <a
            href="#location"
            className="px-8 py-4 bg-zinc-900 border border-zinc-800 hover:border-[#fac703]/50 rounded-full font-bold text-white text-lg transition-all flex items-center gap-2"
          >
            <MapPin className="w-5 h-5 text-[#fac703]" />
            Find Us
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap gap-8 justify-center text-center">
          {[
            { label: "Authentic", value: "100%" },
            { label: "Fresh", value: "Daily" },
            { label: "Ingredients", value: "Local" },
          ].map((item, i) => (
            <div key={i}>
              <p className="text-2xl font-bold text-white">{item.value}</p>
              <p className="text-sm text-zinc-500 uppercase tracking-wide">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
    </section>
  );
});

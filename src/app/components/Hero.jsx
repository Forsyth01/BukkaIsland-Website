"use client";

import { memo } from "react";
import { Utensils, Sparkles, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default memo(function Hero() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 min-h-screen">
      {/* Simplified Background Grid - reduced complexity */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Combined light effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(250,199,3,0.15),transparent_50%)]" />
        
        {/* Reduced orb complexity */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#fac703]/20 rounded-full blur-3xl animate-orbit" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#e6b800]/20 rounded-full blur-3xl animate-orbit delay-300" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-10 text-center perspective">
        {/* Top Badge */}
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/80 border border-[#fac703]/20 rounded-full mb-8 backdrop-blur-sm animate-bounce-in opacity-0">
          <span className="text-sm text-zinc-300 font-medium">
            Authentic Nigerian Cuisine
          </span>
        </div>

        {/* Heading - optimized structure */}
        <div className="relative mb-6">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-48 h-0.5 bg-gradient-to-r from-transparent via-[#fac703] to-[#e6b800] animate-slide-left opacity-0 delay-100" />
          
          <h1 className="text-7xl md:text-8xl xl:text-9xl font-black text-white tracking-tight relative">
            <span className="font inline-block animate-slide-left opacity-0 delay-200 uppercase">Bukka</span> 
            <br />
            <span className="font inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#fac703] to-[#e6b800] animate-slide-right opacity-0 delay-300 relative bottom-5">
              Island
            </span>
          </h1>

          <div className="flex items-center justify-center gap-2 mt-2 animate-scale-in opacity-0 delay-500">
            <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-[#fac703] to-[#e6b800]" />
            <Utensils className="w-5 h-5 text-[#fac703] animate-float" />
            <div className="h-0.5 w-20 bg-gradient-to-r from-[#fac703] via-[#e6b800] to-transparent" />
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mb-16 leading-relaxed animate-scale-in opacity-0 delay-600">
          Where <span className="text-[#fac703] font-semibold">street flavors</span>{" "}
          meet Lagos vibes.
          <br />
          Your favorite Nigerian meals, rolling to you 🌴
        </p>

        {/* Central Circle - optimized image loading */}
        <div className="relative mb-16 group animate-scale-in opacity-0 delay-700">
          <div className="absolute inset-0 bg-gradient-to-r from-[#fac703]/20 to-[#e6b800]/20 rounded-full blur-2xl animate-glow" />

          <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-zinc-900 to-zinc-950 border-2 border-zinc-800 flex items-center justify-center overflow-visible transition-all duration-700 hover:scale-110 hover:rotate-6 hover:border-[#fac703]/50">
            {/* Consolidated border animations */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-zinc-700 scale-90 animate-rotate-cw" />
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-zinc-700 scale-75 animate-rotate-ccw" />

            <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-full flex items-center justify-center relative overflow-visible transition-all duration-700 group-hover:scale-110">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#fac703]/10 via-transparent to-[#e6b800]/10 rounded-full" />
              
              {/* Optimized Food Image */}
              <div className="absolute inset-0 flex items-center justify-center rounded-full overflow-hidden">
                <Image 
                  src="/suya.jpg" 
                  alt="Delicious Nigerian suya"
                  width={400} // Reduced from 800
                  height={400} // Reduced from 800
                  priority // Critical for LCP
                  loading="eager"
                  quality={85} // Reduced quality for faster loading
                  className="object-cover rounded-full opacity-90 transition-opacity duration-700 group-hover:opacity-100"
                  sizes="(max-width: 768px) 288px, 384px" // Proper sizing hints
                />
                <div className="absolute inset-0 bg-black/20 rounded-full" />
              </div>
              
              {/* Steam Effects - reduced number for performance */}
              <div className="absolute inset-0 pointer-events-none overflow-visible">
                <div className="absolute bottom-1/3 left-1/4 w-16 h-32 bg-gradient-to-t from-white/80 via-white/50 to-transparent rounded-full blur-xl animate-steam-rise-1" />
                <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-20 h-40 bg-gradient-to-t from-white/90 via-white/60 to-transparent rounded-full blur-2xl animate-steam-rise-2" />
                <div className="absolute bottom-1/3 right-1/4 w-14 h-28 bg-gradient-to-t from-white/75 via-white/45 to-transparent rounded-full blur-xl animate-steam-rise-3" />
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href="/menu"
            className="px-8 py-4 bg-gradient-to-r from-[#fac703] to-[#e6b800] rounded-full font-bold text-white text-lg shadow-lg transition-all duration-500 hover:scale-110 hover:rotate-2 hover:shadow-2xl hover:shadow-[#fac703]/40 animate-bounce-in opacity-0 delay-700 relative overflow-hidden group"
            prefetch={false} // Delay prefetch for non-critical navigation
          >
            <span className="relative z-10">View Menu →</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#e6b800] to-[#fac703] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>

          <Link
            href="https://maps.app.goo.gl/QJABxSyByVbQWUBZ8"
            target="_blank"
            rel="noopener noreferrer" // Security and performance
            className="px-8 py-4 bg-zinc-900 border-2 border-zinc-800 hover:border-[#fac703] rounded-full font-bold text-white text-lg transition-all duration-500 flex items-center gap-2 hover:scale-110 hover:-rotate-2 hover:bg-zinc-800 animate-bounce-in opacity-0 delay-700"
          >
            <MapPin className="w-5 h-5 text-[#fac703] transition-transform duration-500 hover:scale-125" />
            Find Us
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap gap-8 justify-center text-center">
          {[
            { label: "Authentic", value: "100%" },
            { label: "Fresh", value: "Daily" },
            { label: "Ingredients", value: "Local" },
          ].map((item, i) => (
            <div 
              key={i} 
              className="transition-all duration-500 hover:scale-125 hover:-translate-y-2 animate-bounce-in opacity-0 cursor-pointer group"
              style={{ animationDelay: `${0.8 + i * 0.1}s` }}
            >
              <p className="text-2xl font-bold text-white transition-colors duration-500 group-hover:text-[#fac703]">{item.value}</p>
              <p className="text-sm text-zinc-500 uppercase tracking-wide transition-colors duration-500 group-hover:text-zinc-300">
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
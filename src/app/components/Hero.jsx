"use client";

import { memo, useState, useEffect } from "react";
import { Utensils, MapPin, LocationEdit, LocationEditIcon, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default memo(function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative overflow-hidden bg-zinc-950 min-h-screen">
      {/* Background Video - Optimized */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline 
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
          poster="/suya.jpg" // Fallback image while loading
        >
          <source src="/bukkavideo.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Simplified Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-30" />

      {/* Light effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(250,199,3,0.15),transparent_50%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#fac703]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#e6b800]/20 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-10 text-center">
        {/* Top Badge */}
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/80 border border-[#fac703]/20 rounded-full mb-8 backdrop-blur-sm">
          <span className="text-sm text-zinc-300 font-medium">
            Authentic Nigerian Cuisine
          </span>
        </div>

        {/* Heading */}
        <div className="relative mb-6">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-48 h-0.5 bg-gradient-to-r from-transparent via-[#fac703] to-[#e6b800]" />

          <h1 className="text-7xl md:text-8xl xl:text-9xl font-black text-white tracking-tight relative">
            <span className="font inline-block uppercase">Bukka</span>
            <br />
            <span className="font inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#fac703] to-[#e6b800] relative -mt-5">
              Island
            </span>
          </h1>

          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-[#fac703] to-[#e6b800]" />
            <Utensils className="w-5 h-5 text-[#fac703]" />
            <div className="h-0.5 w-20 bg-gradient-to-r from-[#fac703] via-[#e6b800] to-transparent" />
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mb-16 leading-relaxed">
          Where{" "}
          <span className="text-[#fac703] font-semibold">street flavors</span>{" "}
          meet Lagos vibes.
          <br />
          Your favorite Nigerian meals, rolling to you 🌴
        </p>

        {/* Central Circle - Optimized */}
        

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
     <Link
  href="/menu"
  className="px-8 py-4 bg-gradient-to-r from-[#fac703] to-[#e6b800] rounded-full font-bold text-white text-lg shadow-lg transition-all duration-500 hover:scale-110 hover:rotate-2 hover:shadow-2xl hover:shadow-[#fac703]/40 relative overflow-hidden group flex items-center gap-3"
>
  <span className="relative z-10 flex items-center gap-2">
    <ShoppingBag className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
    Order Pickup
  </span>

  <div className="absolute inset-0 bg-gradient-to-r from-[#e6b800] to-[#fac703] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
</Link>


          <Link
            href="https://www.ubereats.com/store/bukka-island-4300-old-spanish-trail/1JmSaVp9WPiGyAIgPDm47g?diningMode=DELIVERY&mod=deliveryTime&modctx=%257B%2522entryPoint%2522%253A%2522global-delivery-details%2522%257D&next=%2Fstore%2Fbukka-island-4300-old-spanish-trail%2F1JmSaVp9WPiGyAIgPDm47g%3FdiningMode%3DDELIVERY%26pl%3DJTdCJTIyYWRkcmVzcyUyMiUzQSUyMkNyYXZlJTIwU3V5YSUyMiUyQyUyMnJlZmVyZW5jZSUyMiUzQSUyMmFhYmViYjc4LWU2Y2YtNGNkNC04YjY3LWNkNjljY2IxNTU4MiUyMiUyQyUyMnJlZmVyZW5jZVR5cGUlMjIlM0ElMjJ1YmVyX3BsYWNlcyUyMiUyQyUyMmxhdGl0dWRlJTIyJTNBMjkuNzM2NDQwNSUyQyUyMmxvbmdpdHVkZSUyMiUzQS05NS40NzYwMTM5JTdE&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkNyYXZlJTIwU3V5YSUyMiUyQyUyMnJlZmVyZW5jZSUyMiUzQSUyMmFhYmViYjc4LWU2Y2YtNGNkNC04YjY3LWNkNjljY2IxNTU4MiUyMiUyQyUyMnJlZmVyZW5jZVR5cGUlMjIlM0ElMjJ1YmVyX3BsYWNlcyUyMiUyQyUyMmxhdGl0dWRlJTIyJTNBMjkuNzM2NDQwNSUyQyUyMmxvbmdpdHVkZSUyMiUzQS05NS40NzYwMTM5JTdE&ps=1"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-zinc-900 border-2 border-zinc-800 hover:border-[#fac703] rounded-full font-bold text-white text-lg transition-all duration-500 flex items-center gap-2   hover:bg-zinc-800 hover:scale-110 hover:-rotate-2"
          >
            <LocationEditIcon className="w-5 h-5 text-[#fac703]  duration-500 " />
            Order Delivery
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
              className="transition-all duration-500 hover:scale-125 hover:-translate-y-2 cursor-pointer group"
            >
              <p className="text-2xl font-bold text-white transition-colors duration-500 group-hover:text-[#fac703]">
                {item.value}
              </p>
              <p className="text-sm text-zinc-500 uppercase tracking-wide transition-colors duration-500 group-hover:text-zinc-300">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />

      <style jsx>{`
        @keyframes orbit {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, 20px);
          }
        }
        .animate-orbit {
          animation: orbit 8s ease-in-out infinite;
        }
        .delay-300 {
          animation-delay: 3s;
        }
      `}</style>
    </section>
  );
});

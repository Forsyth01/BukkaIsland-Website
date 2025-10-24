"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Contact from "../components/Contact";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
};

export default function About() {
  const [selectedMedia, setSelectedMedia] = useState(null);

  // Disable scroll when modal is open
  useEffect(() => {
    if (selectedMedia) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedMedia]);

  // Gallery media (images and videos)
  const galleryMedia = [
    { id: 1, type: "image", src: "/gallery/image-1.jpg", alt: "BukkaIsland founders indoors" },
    { id: 2, type: "image", src: "/gallery/image-2.jpg", alt: "Team members at the food truck" },
    { id: 3, type: "image", src: "/gallery/image-3.jpg", alt: "Three founders at BukkaIsland truck" },
    { id: 4, type: "video", src: "/gallery/video-4.mp4", alt: "BukkaIsland video showcase" },
    { id: 11, type: "video", src: "/gallery/video-3.mp4", alt: "BukkaIsland experience" },
    { id: 5, type: "image", src: "/gallery/image-5.jpg", alt: "Full team night shot" },
    { id: 6, type: "image", src: "/gallery/image-6.jpg", alt: "BukkaIsland team of five" },
    { id: 7, type: "image", src: "/gallery/image-7.jpg", alt: "Customer ordering at the window" },
    { id: 8, type: "image", src: "/gallery/image-8.jpg", alt: "Team celebrating together" },
    { id: 9, type: "image", src: "/gallery/image-9.jpg", alt: "Night service at BukkaIsland" },
    { id: 10, type: "image", src: "/gallery/image-10.jpg", alt: "Two founders inside" },
    { id: 12, type: "image", src: "/gallery/image-11.jpg", alt: "Team at service window" },
    { id: 13, type: "image", src: "/gallery/image-12.jpg", alt: "Founders with BukkaIsland banner" },
    { id: 14, type: "image", src: "/gallery/image-13.jpg", alt: "Busy night with customers" },
    { id: 15, type: "image", src: "/gallery/image-14.jpg", alt: "Large crowd at night event" },
    { id: 16, type: "image", src: "/gallery/image-15.jpg", alt: "Team celebrating success" },
    { id: 17, type: "image", src: "/gallery/image-16.jpg", alt: "Outdoor crowd gathering" },
    { id: 18, type: "image", src: "/gallery/image-17.jpg", alt: "Serving customers at night" },
    { id: 19, type: "image", src: "/gallery/image-18.jpg", alt: "Busy night service" },
  ];

  return (
    <>
    <Navbar/>
    <section className="relative overflow-hidden bg-zinc-950 min-h-screen">
      {/* Subtle grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#e6b800]/15 rounded-full blur-xl animate-pulse-slow will-change-transform" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#c49c00]/15 rounded-full blur-xl animate-pulse-slower will-change-transform" />

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
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
            From the bustling streets of Lagos to your table, we bring
            authentic Nigerian flavors wrapped in modern convenience — born
            from a passion for street food excellence and a mission to share
            our culture one meal at a time.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          {...fadeInUp}
          className="grid md:grid-cols-2 gap-12 items-center mb-20"
        >
          <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800">
            <Image
              src="/bukka_about3.jpg"
              alt="BukkaIsland Story"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Where It All Started
            </h2>
            <p className="text-zinc-400 text-lg mb-4 leading-relaxed">
              BukkaIsland was born from a simple dream — to bring the
              authentic taste of Nigerian street food to the heart of Houston.
              What started as a small food cart has grown into a vibrant
              culinary movement, celebrating Nigeria's rich flavors right here
              in the city's diverse food scene.
            </p>
            <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
              Every recipe tells a story — stories of grandmothers, home
              kitchens, and the lively streets of Lagos, now reimagined for
              Houston's food lovers. At BukkaIsland, we don't just serve food;
              we serve memories, traditions, and the comforting warmth of home
              — one delicious bite at a time.
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
                  Since 2025
                </p>
                <p className="text-zinc-500">
                  Serving authentic Nigerian cuisine
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Founders Section */}
        <motion.div {...fadeInUp} className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Meet The{" "}
              <span className="font text-transparent bg-clip-text bg-gradient-to-r from-[#e6b800] via-[#c49c00] to-[#b38f00]">
                Founders
              </span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              The visionaries behind BukkaIsland, united by a passion for
              authentic Nigerian cuisine
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Founder 1 - CEO */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 transition-all duration-300 hover:border-[#e6b800]/50">
                <div className="absolute inset-0 bg-gradient-to-br from-[#e6b800]/0 to-[#e6b800]/0 group-hover:from-[#e6b800]/10 group-hover:to-transparent transition-all duration-300" />

                <div className="relative h-80 overflow-hidden">
                  <Image
                    src="/founder3.jpg"
                    alt="Ola Kuforiji - Founder and CEO"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent opacity-60" />
                </div>

                <div className="relative p-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Ola Kuforiji
                  </h3>
                  <p className="text-[#e6b800] font-medium mb-3">
                    Founder & CEO
                  </p>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    3+ Years of Economics, Accounting, and Finance at Deloitte. Serving Clients in various industries such as Hospitality, Oil & Gas, and Software Development. Co-Owner of Above Average Hospitality Group.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Founder 2 - COO */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 transition-all duration-300 hover:border-[#e6b800]/50">
                <div className="absolute inset-0 bg-gradient-to-br from-[#e6b800]/0 to-[#e6b800]/0 group-hover:from-[#e6b800]/10 group-hover:to-transparent transition-all duration-300" />

                <div className="relative h-80 overflow-hidden">
                  <Image
                    src="/Bolaji Oni.jpg"
                    alt="Bolaji Oni - Founder and COO"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent opacity-60" />
                </div>

                <div className="relative p-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Bolaji Oni
                  </h3>
                  <p className="text-[#e6b800] font-medium mb-3">
                    Founder & COO
                  </p>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Adewale has 4+ years of experience in Account Management, Business Growth, and Strategy. He is currently an Account Strategist at Google, helping businesses scale through digital advertising. Previously, he worked at Uber Eats and drove a 150% revenue increase for a hotel when he worked at Expedia. He also founded HTX City Rentals, an event rental startup in Houston, and serves in U.S. Army reserve.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Founder 3 - CFO */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 transition-all duration-300 hover:border-[#e6b800]/50">
                <div className="absolute inset-0 bg-gradient-to-br from-[#e6b800]/0 to-[#e6b800]/0 group-hover:from-[#e6b800]/10 group-hover:to-transparent transition-all duration-300" />

                <div className="relative h-80 overflow-hidden">
                  <Image
                    src="/Dotun.jpg"
                    alt="Dotun Oyediran - Founder and CFO"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent opacity-60" />
                </div>

                <div className="relative p-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Dotun Oyediran
                  </h3>
                  <p className="text-[#e6b800] font-medium mb-3">
                    Founder & CFO
                  </p>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                   3+ years of experience in Engineering, Management, and Business Development. As a Key Account Manager in a multinational specialties chemical company, Bolaji manages over $10 million in AUM in the Petrochemical & Refining industry. He is also the co-founder of DealNest, a tech startup delivering efficiency solutions for Real Estate Development professionals.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Gallery Section */}
        <motion.div {...fadeInUp} className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our{" "}
              <span className="font text-transparent bg-clip-text bg-gradient-to-r from-[#e6b800] via-[#c49c00] to-[#b38f00]">
                Gallery
              </span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              A visual journey through our delicious Nigerian dishes
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryMedia.map((media, index) => (
              <motion.div
                key={media.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
                onClick={() => setSelectedMedia(media)}
                className="relative h-64 rounded-xl overflow-hidden cursor-pointer group will-change-transform"
              >
                {media.type === "image" ? (
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading={index < 6 ? "eager" : "lazy"}
                  />
                ) : (
                  <>
                    <video
                      src={media.src}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      muted
                      loop
                      playsInline
                    />
                    {/* Play icon overlay for videos */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors duration-300">
                      <div className="w-16 h-16 rounded-full bg-[#e6b800] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 text-black fill-black ml-1" />
                      </div>
                    </div>
                  </>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#e6b800] transition-colors duration-300 rounded-xl" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Media Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95"
            onClick={() => setSelectedMedia(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-zinc-900 text-white hover:bg-[#e6b800] transition-colors duration-300 shadow-xl"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Selected media - Full viewport */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-[90vw] h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedMedia.type === "image" ? (
                <Image
                  src={selectedMedia.src}
                  alt={selectedMedia.alt}
                  fill
                  sizes="90vw"
                  className="object-contain"
                  priority
                />
              ) : (
                <video
                  src={selectedMedia.src}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                  playsInline
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient fade bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
      <Contact/>
      <Footer/>
    </section>
    </>
  );
}
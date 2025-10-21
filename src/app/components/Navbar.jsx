"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Info,
  UtensilsCrossed,
  BookOpen,
  MessageSquare,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const pathname = usePathname();

  // Detect scroll for navbar background toggle
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
    { href: "/#about", label: "About", icon: <Info className="w-4 h-4" /> },
    { href: "/menu", label: "Menu", icon: <UtensilsCrossed className="w-4 h-4" /> },
    { href: "/blog", label: "Blog", icon: <BookOpen className="w-4 h-4" /> },
    { href: "/#contact", label: "Contact", icon: <MessageSquare className="w-4 h-4" /> },
  ];

  // Handle link clicks (especially for smooth scroll or Home)
  const handleLinkClick = (link) => {
    if (link.href === "/" || link.href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveLink("/");
      setOpen(false);
      return;
    }

    if (link.href.startsWith("/#")) {
      const targetId = link.href.split("#")[1];
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      setActiveLink(link.href);
      setOpen(false);
      return;
    }

    setActiveLink(link.href);
    setOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 100 }}
        transition={{ duration: 0.5 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/50 shadow-md shadow-black/20"
            : "bg-zinc-950/95"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* 🔸 Logo */}
            <motion.a
              href="/"
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLinkClick({ href: "/" })}
            >
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:shadow-amber-500/40 transition-all duration-300">
                  <UtensilsCrossed className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-black text-white tracking-tight">
                  Bukka
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                    Island
                  </span>
                </span>
                <div className="text-xs text-zinc-500 font-medium -mt-0.5 tracking-wide">
                  Street Food Truck
                </div>
              </div>
            </motion.a>

            {/* 🔹 Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {links.map((link) => {
                const isActive =
                  activeLink === link.href ||
                  (pathname === "/" &&
                    (link.href === "/" || link.href === "#"));

                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link);
                    }}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-zinc-400 hover:text-white"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full"
                        transition={{ type: "spring", stiffness: 250, damping: 20 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {link.icon}
                      {link.label}
                    </span>
                  </motion.a>
                );
              })}
            </div>

            {/* 🔸 CTA Button + Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* Desktop CTA */}
              <motion.a
                href="/menu"
                className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-bold text-sm shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MapPin className="w-4 h-4" />
                Order Now
              </motion.a>

              {/* Mobile Hamburger */}
              <motion.button
                onClick={() => setOpen(!open)}
                className="lg:hidden p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {open ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </nav>

        {/* 🔹 Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-zinc-800/50 bg-zinc-950/98 backdrop-blur-xl overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 py-6 space-y-1">
                {links.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.07 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link);
                    }}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-900/60 transition-all duration-200 group"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-amber-500 group-hover:text-amber-400 transition-colors">
                        {link.icon}
                      </span>
                      <span className="font-medium">{link.label}</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                  </motion.a>
                ))}

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: links.length * 0.1 }}
                  className="pt-4"
                >
                  <a
                    href="/menu"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3.5 rounded-full font-bold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300"
                  >
                    <MapPin className="w-5 h-5" />
                    Order Now
                  </a>
                </motion.div>

                {/* Mobile Footer Info */}
                <div className="pt-6 border-t border-zinc-800/50 text-center">
                  <p className="text-xs text-zinc-600">
                    🌴 Authentic Nigerian Street Food
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer to offset fixed navbar */}
      <div className="h-20" />
    </>
  );
}

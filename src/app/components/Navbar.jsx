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
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
    { href: "/#about", label: "About", icon: <Info className="w-4 h-4" /> },
    { href: "/menu", label: "Menu", icon: <UtensilsCrossed className="w-4 h-4" /> },
    { href: "/blog", label: "Blog", icon: <BookOpen className="w-4 h-4" /> },
    { href: "/#contact", label: "Contact", icon: <MessageSquare className="w-4 h-4" /> },
  ];

  // ✅ Scroll listener optimized
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Simplified click handler
  const handleLinkClick = (link) => {
    setOpen(false);
    if (link.href.startsWith("/#")) {
      const id = link.href.split("#")[1];
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (link.href === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    router.push(link.href);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-zinc-950/95 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md border-b border-zinc-800/50 shadow-md shadow-black/20"
            : ""
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* 🔸 Logo */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick({ href: "/" });
              }}
              className="flex items-center gap-3 group"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:shadow-amber-500/40 transition-all duration-300">
                <UtensilsCrossed className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-black text-white tracking-tight">
                  Bukka
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                    Island
                  </span>
                </span>
                <div className="text-xs text-zinc-500 font-medium -mt-0.5">
                  Street Food Truck
                </div>
              </div>
            </a>

            {/* 🔹 Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link);
                    }}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      isActive ? "text-white" : "text-zinc-400 hover:text-white"
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

            {/* 🔸 CTA + Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* Desktop CTA */}
              <a
                href="/menu"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick({ href: "/menu" });
                }}
                className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-bold text-sm shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300"
              >
                <MapPin className="w-4 h-4" />
                Order Now
              </a>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setOpen((o) => !o)}
                className="lg:hidden p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
                aria-label="Toggle menu"
              >
                {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
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
              transition={{ duration: 0.25 }}
              className="lg:hidden border-t border-zinc-800/50 bg-zinc-950/98 backdrop-blur-xl overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 py-6 space-y-1">
                {links.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
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
                <a
                  href="/menu"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3.5 rounded-full font-bold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300"
                >
                  <MapPin className="w-5 h-5" />
                  Order Now
                </a>

                <div className="pt-6 border-t border-zinc-800/50 text-center">
                  <p className="text-xs text-zinc-600">
                    🌴 Authentic Nigerian Street Food
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
}

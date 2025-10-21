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
import Link from "next/link";
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (href) => {
    if (href.startsWith("/#")) {
      const id = href.split("#")[1];
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (href === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push(href);
    }
    setOpen(false);
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
            {/* Logo */}
            <Link
              href="/"
              prefetch={false}
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("/");
              }}
              className="flex items-center gap-3 group"
            >
              <div>
                <img src="/logo/bukka_logo_white.png" alt="" className="h-35" />
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={link.href}
                      prefetch={false}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSmoothScroll(link.href);
                      }}
                      className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        isActive ? "text-white" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-[#e6b800] to-[#c49c00] rounded-full"
                          transition={{ type: "spring", stiffness: 250, damping: 20 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        {link.icon}
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA + Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* Desktop CTA */}
              <Link
                href="/menu"
                prefetch={false}
                onClick={(e) => {
                  e.preventDefault();
                  handleSmoothScroll("/menu");
                }}
                className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#e6b800] to-[#c49c00] text-white rounded-full font-bold text-sm shadow-lg shadow-[#c49c00]/25 hover:shadow-[#c49c00]/40 transition-all duration-300"
              >
                <MapPin className="w-4 h-4" />
                Order Now
              </Link>

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

        {/* Mobile Menu */}
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
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={false}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSmoothScroll(link.href);
                    }}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-900/60 transition-all duration-200 group"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-[#e6b800] group-hover:text-[#c49c00] transition-colors">
                        {link.icon}
                      </span>
                      <span className="font-medium">{link.label}</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-[#e6b800] group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}

                {/* Mobile CTA */}
                <Link
                  href="/menu"
                  prefetch={false}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSmoothScroll("/menu");
                  }}
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#e6b800] to-[#c49c00] text-white px-6 py-3.5 rounded-full font-bold shadow-lg shadow-[#c49c00]/25 hover:shadow-[#c49c00]/40 transition-all duration-300"
                >
                  <MapPin className="w-5 h-5" />
                  Order Now
                </Link>

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

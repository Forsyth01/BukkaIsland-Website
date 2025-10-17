"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu as MenuIcon,
  X as XIcon,
  Home as HomeIcon,
  Info,
  List as MenuList,
  BookOpen,
  MessageSquare,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  const links = [
    { href: "/", label: "Home", icon: <HomeIcon className="w-4 h-4" /> },
    { href: "/#about", label: "About", icon: <Info className="w-4 h-4" /> },
    { href: "/menu", label: "Menu", icon: <MenuList className="w-4 h-4" /> },
    { href: "/blog", label: "Blog", icon: <BookOpen className="w-4 h-4" /> },
    { href: "/#faq", label: "FAQ", icon: <BookOpen className="w-4 h-4" /> },
    { href: "/#contact", label: "Contact", icon: <MessageSquare className="w-4 h-4" /> },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "backdrop-blur bg-white/60 shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold shadow">
              BI
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-extrabold text-orange-600">
                BukkaIsland
              </span>
              <div className="text-xs text-gray-500 -mt-0.5">Street food truck</div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2">
            {links.map((l) => {
              const isActive =
                l.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(l.href.replace("/#", "/"));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                    isActive
                      ? "bg-orange-600 text-white"
                      : "text-gray-700 hover:bg-orange-50"
                  }`}
                >
                  <span className="hidden md:inline-flex">{l.icon}</span>
                  <span>{l.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle menu"
              className="p-2 rounded-md text-gray-700 hover:bg-orange-50"
            >
              {open ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden border-t border-slate-100 bg-white/95"
          >
            <div className="max-w-6xl mx-auto px-4 py-4 space-y-2">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-800 hover:bg-orange-50"
                >
                  <span className="text-orange-600">{l.icon}</span>
                  <span className="font-medium">{l.label}</span>
                </Link>
              ))}

              {/* CTA */}
              <div className="pt-2">
                <Link
                  href="/menu"
                  className="block text-center bg-orange-600 text-white px-4 py-2 rounded-full font-semibold"
                  onClick={() => setOpen(false)}
                >
                  Order Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

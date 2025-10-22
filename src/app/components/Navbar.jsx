"use client";

import { useState, useEffect } from "react";
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
    {
      href: "/menu",
      label: "Menu",
      icon: <UtensilsCrossed className="w-4 h-4" />,
    },
    { href: "/blog", label: "Blog", icon: <BookOpen className="w-4 h-4" /> },
    {
      href: "/#contact",
      label: "Contact",
      icon: <MessageSquare className="w-4 h-4" />,
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    setOpen(false);

    if (href.startsWith("/#")) {
      const id = href.split("#")[1];
      
      // If we're not on the home page, navigate there first
      if (pathname !== "/") {
        router.push("/");
        // Wait for navigation then scroll
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      } else {
        // We're already on home page, just scroll
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    } else if (href === "/") {
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/");
      }
    } else {
      router.push(href);
    }
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
              onClick={(e) => handleSmoothScroll(e, "/")}
              className="group"
            >
              <div className="flex items-center gap-2">
                <div className="bg-[#e6b800] rounded-lg p-2 px-4">
                  <h1 className="font text-3xl md:text-5xl text-white">B</h1>
                </div>
                <div className="text-lg md:text-2xl relative top-1 hidden md:block">
                  <p className="font text-white">Bukka</p>
                  <p className="font text-[#e6b800] relative bottom-2">Island</p>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={false}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95 ${
                      isActive
                        ? "text-white bg-gradient-to-r from-[#e6b800] to-[#c49c00]"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* CTA + Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* Desktop CTA */}
              <Link
                href="/menu"
                prefetch={false}
                onClick={(e) => handleSmoothScroll(e, "/menu")}
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
                {open ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden border-t border-zinc-800/50 bg-zinc-950/98 backdrop-blur-xl animate-slideDown">
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={false}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
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
                onClick={(e) => handleSmoothScroll(e, "/menu")}
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
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
}
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
  const [isClosing, setIsClosing] = useState(false);
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

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    closeMenu();

    setTimeout(() => {
      if (href.startsWith("/#")) {
        const id = href.split("#")[1];
        
        if (pathname !== "/") {
          router.push("/");
          setTimeout(() => {
            const el = document.getElementById(id);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 100);
        } else {
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
    }, 300);
  };

  return (
    <>
      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-20px);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes fadeOutScale {
          from {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          to {
            opacity: 0;
            transform: scale(0.9) translateY(-10px);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideOutRight {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(-30px);
          }
        }

        .mobile-menu-enter {
          animation: slideDown 0.3s ease-out forwards;
        }

        .mobile-menu-exit {
          animation: slideUp 0.3s ease-out forwards;
        }

        .menu-item-enter {
          animation: slideInRight 0.4s ease-out forwards;
        }

        .menu-item-exit {
          animation: slideOutRight 0.3s ease-out forwards;
        }

        .menu-cta-enter {
          animation: fadeInScale 0.5s ease-out forwards;
        }

        .menu-cta-exit {
          animation: fadeOutScale 0.3s ease-out forwards;
        }

        .hamburger-rotate-open {
          animation: rotateOpen 0.3s ease-out forwards;
        }

        .hamburger-rotate-close {
          animation: rotateClose 0.3s ease-out forwards;
        }

        @keyframes rotateOpen {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(90deg);
          }
        }

        @keyframes rotateClose {
          from {
            transform: rotate(90deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
      `}</style>

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
                <div className="bg-[#e6b800] rounded-lg p-2 px-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <h1 className="font text-3xl md:text-5xl text-white">B</h1>
                </div>
                <div className="text-lg md:text-2xl relative top-1 hidden md:block">
                  <p className="font text-white transition-colors group-hover:text-[#e6b800]">Bukka</p>
                  <p className="font text-[#e6b800] relative bottom-2 transition-colors group-hover:text-white">Island</p>
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
                className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#e6b800] to-[#c49c00] text-white rounded-full font-bold text-sm shadow-lg shadow-[#c49c00]/25 hover:shadow-[#c49c00]/40 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <MapPin className="w-4 h-4" />
                Order Now
              </Link>

              {/* Mobile Hamburger */}
              <button
                onClick={() => open ? closeMenu() : setOpen(true)}
                className="lg:hidden p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all duration-300 relative"
                aria-label="Toggle menu"
              >
                <div className={open ? "hamburger-rotate-open" : "hamburger-rotate-close"}>
                  {open ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {open && (
          <div className={`lg:hidden border-t border-zinc-800/50 bg-zinc-950/98 backdrop-blur-xl overflow-hidden ${
            isClosing ? 'mobile-menu-exit' : 'mobile-menu-enter'
          }`}>
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-1">
              {links.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={false}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-900/60 transition-all duration-200 group ${
                    isClosing ? 'menu-item-exit' : 'menu-item-enter'
                  }`}
                  style={{
                    animationDelay: isClosing ? `${index * 0.03}s` : `${index * 0.08}s`
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-[#e6b800] group-hover:text-[#c49c00] transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                      {link.icon}
                    </span>
                    <span className="font-medium">{link.label}</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-[#e6b800] group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              ))}

              {/* Mobile CTA */}
              <Link
                href="/menu"
                prefetch={false}
                onClick={(e) => handleSmoothScroll(e, "/menu")}
                className={`flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#e6b800] to-[#c49c00] text-white px-6 py-3.5 rounded-full font-bold shadow-lg shadow-[#c49c00]/25 hover:shadow-[#c49c00]/40 hover:scale-105 active:scale-95 transition-all duration-300 ${
                  isClosing ? 'menu-cta-exit' : 'menu-cta-enter'
                }`}
                style={{
                  animationDelay: isClosing ? '0s' : `${links.length * 0.08 + 0.1}s`
                }}
              >
                <MapPin className="w-5 h-5" />
                Order Now
              </Link>

              <div 
                className={`pt-6 border-t border-zinc-800/50 text-center ${
                  isClosing ? 'menu-cta-exit' : 'menu-cta-enter'
                }`}
                style={{
                  animationDelay: isClosing ? '0s' : `${links.length * 0.08 + 0.2}s`
                }}
              >
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
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
    { href: "/about", label: "About", icon: <Info className="w-4 h-4" /> },
    {
      href: "/menu",
      label: "Menu",
      icon: <UtensilsCrossed className="w-4 h-4" />,
    },
    // { href: "/blog", label: "Blog", icon: <BookOpen className="w-4 h-4" /> },
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
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all bg-zinc-950/95 duration-500 ${
          scrolled
            ? "bg-zinc-950/95 backdrop-blur-xl shadow-2xl shadow-black/20 border-b border-zinc-800/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
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
            <div className="hidden lg:flex items-center gap-2">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <a
                    key={link.href}
                    href="#"
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95 ${
                      isActive
                        ? "text-white bg-gradient-to-r from-[#e6b800] to-[#c49c00]"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </a>
                );
              })}
            </div>

            {/* CTA + Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* Desktop CTAs */}
              <div className="hidden md:flex items-center gap-3">
                <Link
                  href="/menu"
                  onClick={(e) => handleSmoothScroll(e, "/menu")}
                  className="flex items-center gap-2 px-5 py-4 bg-zinc-800/60 text-white rounded-full font-bold text-sm border border-zinc-700/50 hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  Order Pickup
                </Link>
                <a
                  href="https://www.ubereats.com/store/bukka-island-4300-old-spanish-trail/1JmSaVp9WPiGyAIgPDm47g?diningMode=DELIVERY&mod=deliveryTime&modctx=%257B%2522entryPoint%2522%253A%2522global-delivery-details%2522%257D&next=%2Fstore%2Fbukka-island-4300-old-spanish-trail%2F1JmSaVp9WPiGyAIgPDm47g%3FdiningMode%3DDELIVERY%26pl%3DJTdCJTIyYWRkcmVzcyUyMiUzQSUyMkNyYXZlJTIwU3V5YSUyMiUyQyUyMnJlZmVyZW5jZSUyMiUzQSUyMmFhYmViYjc4LWU2Y2YtNGNkNC04YjY3LWNkNjljY2IxNTU4MiUyMiUyQyUyMnJlZmVyZW5jZVR5cGUlMjIlM0ElMjJ1YmVyX3BsYWNlcyUyMiUyQyUyMmxhdGl0dWRlJTIyJTNBMjkuNzM2NDQwNSUyQyUyMmxvbmdpdHVkZSUyMiUzQS05NS40NzYwMTM5JTdE&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkNyYXZlJTIwU3V5YSUyMiUyQyUyMnJlZmVyZW5jZSUyMiUzQSUyMmFhYmViYjc4LWU2Y2YtNGNkNC04YjY3LWNkNjljY2IxNTU4MiUyMiUyQyUyMnJlZmVyZW5jZVR5cGUlMjIlM0ElMjJ1YmVyX3BsYWNlcyUyMiUyQyUyMmxhdGl0dWRlJTIyJTNBMjkuNzM2NDQwNSUyQyUyMmxvbmdpdHVkZSUyMiUzQS05NS40NzYwMTM5JTdE&ps=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-zinc-800/60 text-white px-6 py-3.5 rounded-full font-bold border border-zinc-700/50 hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <MapPin className="w-4 h-4" />
                  Order Delivery
                </a>
              </div>

              {/* Mobile Hamburger */}
              <button
                onClick={() => (open ? closeMenu() : setOpen(true))}
                className="lg:hidden p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all duration-300 relative"
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6">
                  {open ? (
                    <X className="w-6 h-6 absolute inset-0 animate-in spin-in-180 duration-300" />
                  ) : (
                    <Menu className="w-6 h-6 absolute inset-0 animate-in fade-in duration-300" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div
          className={`fixed inset-0 z-40 lg:hidden ${
            isClosing ? "animate-out fade-out duration-300" : "animate-in fade-in duration-300"
          }`}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeMenu}
          />
          <div
            className={`absolute top-20 left-0 right-0 bg-zinc-950/98 backdrop-blur-xl border-b border-zinc-800/50 shadow-2xl ${
              isClosing ? "animate-out slide-out-to-top duration-300" : "animate-in slide-in-from-top duration-300"
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-2">
              {links.map((link, index) => (
                <a
                  key={link.href}
                  href="#"
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-900/60 transition-all duration-200 group ${
                    isClosing ? 'menu-item-exit' : 'menu-item-enter'
                  }`}
                  style={{
                    animationDelay: isClosing ? `${index * 0.03}s` : `${index * 0.08}s`
                  }}
                >
                  <div className="flex items-center gap-3">
                    {link.icon}
                    <span className="font-medium">{link.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-[#e6b800] group-hover:translate-x-1 transition-all" />
                </a>
              ))}

              {/* Mobile CTAs */}
              <div className="space-y-3 pt-4">
                
                <Link
                  href="/menu"
                  onClick={(e) => handleSmoothScroll(e, "/menu")}
                  className={`flex items-center justify-center gap-2 w-full bg-zinc-800/60 text-white px-6 py-3.5 rounded-full font-bold border border-zinc-700/50 hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all duration-300 ${
                    isClosing ? 'menu-cta-exit' : 'menu-cta-enter'
                  }`}
                  style={{
                    animationDelay: isClosing ? '0s' : `${links.length * 0.08 + 0.15}s`
                  }}
                >
                  <UtensilsCrossed className="w-5 h-5" />
                  Order Pickup
                </Link>
                <a
                  href="https://www.ubereats.com/store/bukka-island-4300-old-spanish-trail/1JmSaVp9WPiGyAIgPDm47g?diningMode=DELIVERY&mod=deliveryTime&modctx=%257B%2522entryPoint%2522%253A%2522global-delivery-details%2522%257D&next=%2Fstore%2Fbukka-island-4300-old-spanish-trail%2F1JmSaVp9WPiGyAIgPDm47g%3FdiningMode%3DDELIVERY%26pl%3DJTdCJTIyYWRkcmVzcyUyMiUzQSUyMkNyYXZlJTIwU3V5YSUyMiUyQyUyMnJlZmVyZW5jZSUyMiUzQSUyMmFhYmViYjc4LWU2Y2YtNGNkNC04YjY3LWNkNjljY2IxNTU4MiUyMiUyQyUyMnJlZmVyZW5jZVR5cGUlMjIlM0ElMjJ1YmVyX3BsYWNlcyUyMiUyQyUyMmxhdGl0dWRlJTIyJTNBMjkuNzM2NDQwNSUyQyUyMmxvbmdpdHVkZSUyMiUzQS05NS40NzYwMTM5JTdE&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkNyYXZlJTIwU3V5YSUyMiUyQyUyMnJlZmVyZW5jZSUyMiUzQSUyMmFhYmViYjc4LWU2Y2YtNGNkNC04YjY3LWNkNjljY2IxNTU4MiUyMiUyQyUyMnJlZmVyZW5jZVR5cGUlMjIlM0ElMjJ1YmVyX3BsYWNlcyUyMiUyQyUyMmxhdGl0dWRlJTIyJTNBMjkuNzM2NDQwNSUyQyUyMmxvbmdpdHVkZSUyMiUzQS05NS40NzYwMTM5JTdE&ps=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2  bg-zinc-800/60 text-white px-6 py-3.5 rounded-full font-bold border border-zinc-700/50 hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all duration-300${
                    isClosing ? 'menu-cta-exit' : 'menu-cta-enter'
                  }`}
                  style={{
                    animationDelay: isClosing ? '0s' : `${links.length * 0.08 + 0.1}s`
                  }}
                >
                  <MapPin className="w-5 h-5" />
                  Order Delivery
                </a>
              </div>

              <div className="pt-4 border-t border-zinc-800/50">
                <p className="text-center text-sm text-zinc-500">
                  🌴 Authentic Nigerian Street Food
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
}
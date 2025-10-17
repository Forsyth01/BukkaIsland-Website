"use client";

import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-gray-300 text-center py-10">
      <div className="flex justify-center gap-6 mb-4">
        <a href="#" className="hover:text-orange-500"><Facebook /></a>
        <a href="#" className="hover:text-orange-500"><Instagram /></a>
        <a href="#" className="hover:text-orange-500"><Twitter /></a>
      </div>
      <p>© {new Date().getFullYear()} BukkaIsland. All rights reserved.</p>
    </footer>
  );
}

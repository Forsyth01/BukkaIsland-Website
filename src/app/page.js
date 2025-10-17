"use client";

import Hero from "./components/Hero";
import About from "./components/About";
import MenuPreview from "./components/MenuPreview";
import BlogPreview from "./components/BlogPreview";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="bg-[#fffaf0] text-gray-900">
      <Navbar/>
      <Hero />
      <About />
      <MenuPreview />
      <BlogPreview/>
      <FAQ/>
      <Contact />
      <Footer />
    </main>
  );
}

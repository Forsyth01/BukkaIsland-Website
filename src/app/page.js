"use client";

import Hero from "./components/Hero";
import About from "./components/About";
import MenuPreview from "./components/MenuPreview";
import BlogPreview from "./components/BlogPreview";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AllergyNotice from "./components/AllergyNotice";
import NoticeSection from "./components/NoticeSection";

export default function Home() {
  return (
    <main className="bg-[#fffaf0] text-gray-900">
      <Navbar/>
      <Hero />
      {/* <About /> */}
      <MenuPreview />
      {/* <BlogPreview/> */}
      <NoticeSection/>
      <AllergyNotice />
      <FAQ/>
      <Contact />
      <Footer />
    </main>
  );
}

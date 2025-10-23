"use client";

import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { SiDoordash, SiUbereats } from "react-icons/si";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Instagram,
      href: "https://www.instagram.com/bukkaisland",
      label: "Instagram",
    },
    // { icon: Facebook, href: "https://facebook.com/bukkaisland", label: "Facebook" },
    // { icon: Twitter, href: "https://twitter.com/bukkaisland", label: "Twitter" },
    {
      icon: SiDoordash,
      href: "https://www.doordash.com/store/bukkaisland",
      label: "DoorDash",
    },
    {
      icon: SiUbereats,
      href: "https://www.ubereats.com/store/bukkaisland",
      label: "Uber Eats",
    },
  ];

  const quickLinks = [
    { label: "Menu", href: "/#menu" },
    // { label: "Blog", href: "/blog" },
    { label: "About", href: "/#about" },
    { label: "FAQ", href: "/#faq" },
  ];

  const contactInfo = [
    { icon: Mail, text: "contact@bukkaisland.com" },
    { icon: Phone, text: "+1 (317) 459-3144" },
    { icon: MapPin, text: "4300 Old Spanish Trl, Houston, TX 77021" },
  ];

  return (
    <footer className="relative bg-zinc-950 text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="md:col-span-1"
            >
              <div className="flex items-center gap-2">
                <div className="bg-[#e6b800] rounded-lg p-2 px-4">
                  <h1 className="font text-5xl text-white">B</h1>
                </div>
                <div className="text-2xl relative top-1">
                  <p className="font text-white">Bukka</p>
                  <p className="font text-[#e6b800] relative bottom-2">
                    Island
                  </p>
                </div>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Bringing authentic Nigerian street food to your table, one meal
                at a time.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-zinc-400 hover:text-[#fac703] transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">
                Contact
              </h4>
              <ul className="space-y-3">
                {contactInfo.map((info, idx) => {
                  const Icon = info.icon;
                  return (
                    <li key={idx} className="flex items-start gap-3">
                      <Icon className="w-4 h-4 text-[#fac703] mt-0.5 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm">{info.text}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">
                Follow Us
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-gradient-to-br from-[#fac703]/10 to-[#e6b800]/10 border border-zinc-800 rounded-lg text-[#fac703] hover:border-[#fac703]/40 transition-all duration-300"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent mb-8 origin-left"
          />

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-center items-center gap-4"
          >
            <p className="text-sm text-zinc-400">
              © {currentYear}{" "}
              <span className="text-[#fac703] font-semibold">BukkaIsland</span>.
              All rights reserved.
            </p>

            {/* <div className="flex gap-6 text-sm">
              <Link href="#" className="text-zinc-400 hover:text-[#fac703] transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-[#fac703] transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-[#fac703] transition-colors">
                Cookies
              </Link>
            </div> */}
          </motion.div>
        </div>

        {/* Decorative bottom element */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#fac703]/20 to-transparent" />
      </div>
    </footer>
  );
}

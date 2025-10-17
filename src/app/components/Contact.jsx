"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 md:px-16 bg-orange-600 text-white">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-6 flex justify-center items-center gap-2"
        >
          <Mail className="w-8 h-8" />
          Get in Touch
        </motion.h2>
        <p className="text-lg mb-8">
          Book our food truck for your events or stop by our regular locations!
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a
            href="mailto:contact@bukkaisland.com"
            className="bg-white text-orange-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition flex items-center gap-2 justify-center"
          >
            <Mail className="w-5 h-5" />
            contact@bukkaisland.com
          </a>

          <a
            href="#"
            className="border border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-700 transition flex items-center gap-2 justify-center"
          >
            <MapPin className="w-5 h-5" />
            Find Us
          </a>
        </div>
      </div>
    </section>
  );
}

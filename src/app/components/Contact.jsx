"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, MessageCircle, ArrowRight } from "lucide-react";

export default function Contact() {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "contact@bukkaisland.com",
      href: "mailto:contact@bukkaisland.com",
      color: "from-amber-400 to-orange-500"
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "+234 (0) 700 000 0000",
      href: "https://wa.me/2347000000000",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+234 (0) 1 234 5678",
      href: "tel:+2341234567",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Lekki Phase 1, Lagos",
      href: "#",
      color: "from-red-400 to-pink-500"
    }
  ];

  return (
    <section id="contact" className="relative min-h-screen bg-zinc-950 py-20 px-6 md:px-16 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              className="h-0.5 w-20 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
            />
            <Mail className="w-6 h-6 text-amber-500" />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              className="h-0.5 w-20 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
            />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tight"
          >
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Touch</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-zinc-400 max-w-2xl mx-auto"
          >
            Book our food truck for your events or find us at our regular locations. We'd love to hear from you!
          </motion.p>
        </motion.div>

        {/* Contact Methods Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactMethods.map((method, idx) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={idx}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : "_self"}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : ""}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-6 border border-zinc-800 hover:border-amber-500/50 transition-all duration-300 overflow-hidden"
              >
                {/* Gradient background on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute inset-0 bg-gradient-to-br ${method.color}`}
                />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${method.color} mb-4 text-white`}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>

                  <p className="text-sm text-zinc-500 uppercase tracking-widest font-semibold mb-2">
                    {method.label}
                  </p>
                  <p className="text-white font-bold text-lg group-hover:text-amber-400 transition-colors">
                    {method.value}
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-4 right-4"
                >
                  <ArrowRight className="w-5 h-5 text-amber-500" />
                </motion.div>
              </motion.a>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 border border-zinc-800 rounded-2xl p-12 backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Order?</h3>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Reach out through any of our channels above, or click below to start exploring our menu and placing your order!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="mailto:contact@bukkaisland.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-bold shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 transition-all group"
              >
                Send Email
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </motion.a>

              <motion.a
                href="/#menu"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-900 border-2 border-zinc-800 hover:border-amber-500/50 text-white rounded-full font-bold transition-all group"
              >
                View Menu
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12 text-sm text-zinc-500"
        >
          Follow us on Instagram @BukkaIsland for daily location updates and special offers 🌴
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
    </section>
  );
}
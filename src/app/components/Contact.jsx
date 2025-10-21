"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, MessageCircle, ArrowRight } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@bukkaisland.com",
    href: "mailto:contact@bukkaisland.com",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+234 (0) 700 000 0000",
    href: "https://wa.me/2347000000000",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+234 (0) 1 234 5678",
    href: "tel:+2341234567",
    color: "from-blue-400 to-cyan-500",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Lekki Phase 1, Lagos",
    href: "#",
    color: "from-red-400 to-pink-500",
  },
];

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative min-h-screen bg-zinc-950 py-20 px-6 md:px-16 overflow-hidden"
    >
      {/* Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Glow Circles (static pulse only) */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-amber-500/15 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-600/15 rounded-full blur-2xl animate-pulse" />

      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
            <Mail className="w-6 h-6 text-amber-500" />
            <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tight">
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Touch
            </span>
          </h2>

          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Book our food truck for your events or find us at our regular
            locations. We'd love to hear from you!
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          variants={{
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
          }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactMethods.map((method, idx) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={idx}
                variants={fadeUp}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : "_self"}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : ""}
                whileHover={{ y: -4 }}
                className="group relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-6 border border-zinc-800 hover:border-amber-500/50 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br from-amber-500/30 to-orange-500/30" />
                <div className="relative z-10">
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${method.color} mb-4 text-white`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-zinc-500 uppercase tracking-widest font-semibold mb-2">
                    {method.label}
                  </p>
                  <p className="text-white font-bold text-lg group-hover:text-amber-400 transition-colors">
                    {method.value}
                  </p>
                </div>
                <ArrowRight className="absolute bottom-4 right-4 w-5 h-5 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div variants={fadeUp} className="text-center">
          <div className="bg-gradient-to-br from-zinc-900/60 to-zinc-950/60 border border-zinc-800 rounded-2xl p-12 backdrop-blur-xs">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Order?</h3>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Reach out through any of our channels above, or click below to
              explore our menu!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contact@bukkaisland.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-bold shadow-md hover:shadow-lg transition-transform hover:scale-105"
              >
                Send Email <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="/#menu"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 text-white rounded-full font-bold transition-transform hover:scale-105"
              >
                View Menu <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          variants={fadeUp}
          className="text-center mt-12 text-sm text-zinc-500"
        >
          Follow us on Instagram @BukkaIsland for daily location updates 🌴
        </motion.p>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "Where is BukkaIsland located?",
    a: "We're currently parked in Lekki Phase 1, Lagos — right by Admiralty Way. We update our location weekly on Instagram @BukkaIsland.",
  },
  {
    q: "What type of food do you serve?",
    a: "We specialize in vibrant Nigerian street food — from smoky jollof rice and suya wraps to plantain bowls and spicy grilled chicken.",
  },
  {
    q: "Do you offer home or office delivery?",
    a: "Yes! You can order directly through our WhatsApp line or via our delivery partners like Chowdeck and Bolt Food.",
  },
  {
    q: "Do you cater for events?",
    a: "Absolutely! We cater for parties, office gatherings, and outdoor events. Bookings should be made at least 48 hours in advance.",
  },
  {
    q: "What are your operating hours?",
    a: "We're open from 10:00 AM to 9:00 PM every day, except Mondays (our prep and restock day).",
  },
  {
    q: "Is your food spicy?",
    a: "Most of our meals are mildly spicy, but we can always make it hotter or milder based on your preference!",
  },
  {
    q: "Do you have vegetarian options?",
    a: "Yes! We serve delicious plantain bowls, coconut rice with sautéed veggies, and bean cakes (moi-moi).",
  },
  {
    q: "Do you accept card and bank transfers?",
    a: "Of course. We accept POS payments, transfers, and cash — whichever is easiest for you.",
  },
  {
    q: "Do you sell drinks too?",
    a: "Yes! From zobo and palm wine to fresh fruit juices — we've got the perfect drink to pair with your meal.",
  },
  {
    q: "Can I customize my order?",
    a: "Definitely. Want extra sauce, more meat, or no pepper? Just let us know when placing your order.",
  },
  {
    q: "Do you change locations often?",
    a: "We move twice a week to reach more customers. Follow our Instagram stories for live location updates every morning.",
  },
  {
    q: "Can I franchise BukkaIsland?",
    a: "We're working on expanding soon! You can reach out to us via our contact form to discuss franchise opportunities.",
  },
];

function FAQItem({ q, a, i, openIndex, setOpenIndex }) {
  const isOpen = openIndex === i;

  return (
    <motion.div
      className="border-b border-zinc-800 last:border-b-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: i * 0.05 }}
    >
      <motion.button
        onClick={() => setOpenIndex(isOpen ? null : i)}
        className="w-full py-5 px-6 flex items-center justify-between text-left hover:bg-zinc-800/50 transition-colors duration-300 group"
        whileHover={{ paddingRight: 28 }}
      >
        <span className="font-semibold text-white text-lg group-hover:text-amber-400 transition-colors duration-300">
          {q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-amber-500 flex-shrink-0"
        >
          <Plus size={24} />
        </motion.span>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={`faq-${i}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-zinc-300 leading-relaxed text-base border-l-4 border-amber-500/50">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="relative min-h-screen bg-zinc-950 py-20 px-6 md:px-10 overflow-hidden">
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

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-4xl relative z-10"
      >
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
            <HelpCircle className="w-6 h-6 text-amber-500" />
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
            className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight"
          >
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Questions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-zinc-400 max-w-2xl mx-auto"
          >
            Got questions? We've got answers. Dive into our FAQ section to learn more about BukkaIsland.
          </motion.p>
        </motion.div>

        {/* FAQ Container */}
        <motion.div
          className="rounded-2xl bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 border border-zinc-800 hover:border-amber-500/20 transition-all duration-300 overflow-hidden backdrop-blur-sm shadow-2xl"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {faqs.map((f, i) => (
            <FAQItem
              key={i}
              i={i}
              q={f.q}
              a={f.a}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-zinc-400 mb-6">
            Still have questions? We'd love to hear from you!
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-bold shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 transition-all"
          >
            Get in Touch
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
    </section>
  );
}
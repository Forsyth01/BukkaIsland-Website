"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Where is BukkaIsland located?",
    a: "We’re currently parked in Lekki Phase 1, Lagos — right by Admiralty Way. We update our location weekly on Instagram @BukkaIsland.",
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
    a: "We’re open from 10:00 AM to 9:00 PM every day, except Mondays (our prep and restock day).",
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
    a: "Yes! From zobo and palm wine to fresh fruit juices — we’ve got the perfect drink to pair with your meal.",
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
    a: "We’re working on expanding soon! You can reach out to us via our contact form to discuss franchise opportunities.",
  },
];

function FAQItem({ q, a, i, openIndex, setOpenIndex }) {
  const isOpen = openIndex === i;

  return (
    <motion.div
      className="border-b border-slate-200"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <button
        onClick={() => setOpenIndex(isOpen ? null : i)}
        className="w-full py-4 flex items-center justify-between text-left"
      >
        <span className="font-medium text-slate-900">{q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-orange-500"
        >
          <Plus size={20} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={`faq-${i}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-slate-600">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="bg-slate-50 py-20 tracking-tight">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6 text-center"
        >
          Frequently Asked Questions
        </motion.h2>

        <motion.div
          className="rounded-2xl bg-white ring-1 ring-black/5 p-2 md:p-4"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
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
      </motion.div>
    </section>
  );
}

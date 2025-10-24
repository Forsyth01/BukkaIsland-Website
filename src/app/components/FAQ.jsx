"use client";

import { useState } from "react";
import { LazyMotion, m, AnimatePresence, domAnimation, useReducedMotion } from "framer-motion";
import { Plus, HelpCircle } from "lucide-react";

const faqs = [
  { q: "Where is BukkaIsland located?", a: "We're currently located at 4300 Old Spanish Trl, Houston, TX 77021. We update our location weekly on Instagram @BukkaIsland." },
  { q: "What type of food do you serve?", a: "We specialize in vibrant Nigerian street food — from smoky jollof rice and suya wraps to plantain bowls and spicy grilled chicken." },
  { q: "Do you offer home or office delivery?", a: "Yes! You can order directly through our Uber Eats and dooordash." },
  { q: "Do you cater for events?", a: "Absolutely! We cater for parties, office gatherings, and outdoor events. Bookings should be made at least 48 hours in advance." },
  { q: "What are your operating hours?", a: "We're open from 4:00 PM to 11:00 PM every day." },
  { q: "Is your food spicy?", a: "Most of our meals are mildly spicy, but we can always make it hotter or milder based on your preference!" },
  { q: "Do you accept card and bank transfers?", a: "Of course. We accept transfers, and cash — whichever is easiest for you." },
  { q: "Do you sell drinks too?", a: "Yes! From zobo and palm wine to fresh fruit juices — we've got the perfect drink to pair with your meal." },
  { q: "Can I customize my order?", a: "Definitely. Want extra sauce, more meat, or no pepper? Just let us know when placing your order." },
];

function FAQItem({ q, a, i, openIndex, setOpenIndex }) {
  const isOpen = openIndex === i;
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.div
      className="border-b border-zinc-800 last:border-b-0"
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={() => setOpenIndex(isOpen ? null : i)}
        className="w-full py-5 px-6 flex items-center justify-between text-left hover:bg-gradient-to-r hover:from-[#fac703]/10 hover:to-[#e6b800]/10 transition-all duration-300 group"
      >
        <span className="font-semibold text-white text-lg group-hover:text-[#fac703] transition-colors duration-300">
          {q}
        </span>
        <m.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="text-[#fac703] flex-shrink-0"
        >
          <Plus size={22} />
        </m.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            key={`faq-${i}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.25 }, opacity: { duration: 0.3 } }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-[#f5f5f5] leading-relaxed text-base border-l-4 border-gradient-to-b from-[#fac703] via-[#f6d303] to-[#e6b800]">
              {a}
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <section id="faq" className="relative min-h-screen bg-zinc-950 py-20 px-6 md:px-10 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        {/* Glowing background orb */}
        <m.div
          animate={
            shouldReduceMotion
              ? {}
              : { scale: [1, 1.15, 1], opacity: [0.3, 0.45, 0.3] }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/2 w-[28rem] h-[28rem] -translate-x-1/2 bg-gradient-to-r from-[#fac703]/20 via-[#f6d303]/20 to-[#e6b800]/15 rounded-full blur-3xl"
        />

        <div className="mx-auto max-w-4xl relative z-10">
          {/* Header */}
          <m.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: -20 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-[#fac703] to-transparent" />
              <HelpCircle className="w-6 h-6 text-[#fac703]" />
              <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-[#fac703] to-transparent" />
            </div>

            <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
              Frequently Asked{" "}
              <span className="font text-transparent bg-clip-text bg-gradient-to-r from-[#fac703] via-[#f6d303] to-[#e6b800]">
                Questions
              </span>
            </h2>

            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Got questions? We've got answers. Dive into our FAQ section to learn more about BukkaIsland.
            </p>
          </m.div>

          {/* FAQ List */}
          <m.div
            className="rounded-2xl bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 border border-zinc-800 hover:border-[#fac703]/40 transition-all duration-300 overflow-hidden backdrop-blur-sm shadow-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {faqs.map((f, i) => (
              <FAQItem key={i} i={i} q={f.q} a={f.a} openIndex={openIndex} setOpenIndex={setOpenIndex} />
            ))}
          </m.div>

          {/* CTA */}
          {/* <m.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-zinc-400 mb-6">Still have questions? We'd love to hear from you!</p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#fac703] via-[#f6d303] to-[#e6b800] text-white rounded-full font-bold shadow-lg shadow-[#fac703]/25 hover:shadow-xl hover:shadow-[#fac703]/40 transition-all"
            >
              Get in Touch →
            </a>
          </m.div> */}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
      </section>
    </LazyMotion>
  );
}

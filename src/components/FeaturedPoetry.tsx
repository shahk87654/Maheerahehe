"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { bookTitle } from "@/lib/content";

export function FeaturedPoetry() {
  return (
    <section className="poetry-section" id="the-words" aria-labelledby="poem-title">
      <div className="poetry-grain" aria-hidden="true" />
      <div className="poetry-meta">
        <span>02 &nbsp; / &nbsp; A FEW WORDS</span>
        <span>READ IT LIKE A LETTER</span>
      </div>
      <Reveal className="poetry-content">
        <p className="eyebrow" id="poem-title">A NOTE TO THE SELF</p>
        <blockquote>
          <motion.span
            className="poem-line"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05 }}
          >“I pray you want to live</motion.span>
          <motion.span
            className="poem-line"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >And pray you don’t do it for me</motion.span>
          <motion.span
            className="poem-line poem-emphasis"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >Live for yourself darling</motion.span>
          <motion.span
            className="poem-line"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >I pray you do”</motion.span>
        </blockquote>
        <cite>— {bookTitle.toUpperCase()}</cite>
      </Reveal>
      <div className="poetry-footer">
        <span>WORDS TO KEEP CLOSE</span>
        <span className="poetry-star" aria-hidden="true">✳</span>
        <span>MAHEERA BURHAN</span>
      </div>
    </section>
  );
}

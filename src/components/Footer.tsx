"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { LINKEDIN } from "@/lib/content";
import { Wordmark } from "./Logo";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);
  return (
    <footer ref={ref} className="noise relative overflow-hidden border-t border-line bg-ink-2">
      <div className="wrap flex flex-col gap-12 pt-16 pb-8">
        <div className="flex flex-wrap justify-between gap-6 font-mono text-sm text-mute">
          <span>Your Story. Our Strategy. Real Traction.</span>
          <nav className="flex gap-6" aria-label="Footer">
            <a href={LINKEDIN} target="_blank" rel="noopener" className="hover:text-lime">LinkedIn ↗</a>
            <a href="#careers" className="hover:text-lime">Careers</a>
            <a href="#contact" className="hover:text-lime">Contact</a>
          </nav>
        </div>
        <motion.div style={{ y }} className="text-[clamp(4.5rem,-0.5rem+22vw,20rem)] text-paper">
          <Wordmark />
        </motion.div>
        <div className="flex flex-wrap justify-between gap-4 font-mono text-xs text-mute">
          <span>© 2026 Tracktion · New Delhi</span>
          <span>We grow creators, founders &amp; brands on social.</span>
        </div>
      </div>
    </footer>
  );
}

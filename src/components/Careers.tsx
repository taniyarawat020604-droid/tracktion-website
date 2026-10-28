"use client";

import { motion } from "motion/react";
import { LINKEDIN } from "@/lib/content";
import Magnetic, { Arrow } from "./Magnetic";

export default function Careers() {
  return (
    <section id="careers" className="pb-24 md:pb-32">
      <div className="wrap">
        <motion.div
          initial={{ clipPath: "inset(12% 6% 12% 6% round 40px)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0% round 32px)" }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative grid items-center gap-10 overflow-hidden bg-lime p-8 text-ink md:grid-cols-[1.4fr_1fr] md:p-14"
        >
          <svg viewBox="0 0 800 500" className="pointer-events-none absolute -right-20 -bottom-24 w-[620px] opacity-15" fill="none" aria-hidden="true">
            <path d="M40 470 L330 260 L470 360 L740 90 M560 80 L750 80 L750 270" stroke="#0b0b0b" strokeWidth="70" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="relative">
            <span className="eyebrow !text-ink">We&apos;re hiring</span>
            <h2 className="mt-5 text-[clamp(2.2rem,1.4rem+3.5vw,4.2rem)] font-bold leading-[0.95]">Work in the Founder&apos;s Office.</h2>
            <p className="mt-5 max-w-[44ch] text-lg text-ink/80">
              Work directly with Rishi and Hardik. Manage client communication, plan the team&apos;s daily tasks and make sure every deliverable goes out on time.
              Bring the curiosity; you don&apos;t need it all figured out.
            </p>
          </div>
          <div className="relative flex flex-col gap-3 rounded-3xl bg-ink p-7 text-paper">
            <b className="font-display text-2xl">Founder&apos;s Office</b>
            <span className="font-mono text-sm text-mute">Full-time · On-site<br />Paschim Vihar, New Delhi</span>
            <Magnetic href={`${LINKEDIN}/jobs`} className="mt-3 self-start bg-lime px-6 py-3 text-ink hover:bg-paper">Apply on LinkedIn <Arrow /></Magnetic>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

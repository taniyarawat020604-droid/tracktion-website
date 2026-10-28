"use client";

import { motion } from "motion/react";
import { audiences } from "@/lib/content";
import { SplitReveal } from "./Reveal";

export default function Audiences() {
  return (
    <section className="border-y border-line bg-ink-2 py-24 md:py-32">
      <div className="wrap">
        <div className="grid items-end gap-8 md:grid-cols-2">
          <div>
            <span className="eyebrow">Who we work with</span>
            <SplitReveal className="mt-5 text-[clamp(2.2rem,1.4rem+3.5vw,4.2rem)] font-bold leading-[0.95]" lines={["People with", "something worth saying."]} />
          </div>
          <p className="max-w-[40ch] text-lg text-paper/70">India&apos;s top brands, founders, creators and podcasters. They&apos;re busy running companies. We turn what they know into a presence people follow.</p>
        </div>
        <motion.ul
          className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10% 0px" }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
          {audiences.map(a => (
            <li key={a.tag} className="group relative overflow-hidden bg-ink-2 p-7 md:p-9">
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-lime transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100" />
              <motion.div
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
                className="relative flex flex-col gap-3 transition-colors duration-300 group-hover:text-ink">
                <span className="font-mono text-xs text-lime transition-colors group-hover:text-ink">{a.tag}</span>
                <h3 className="text-2xl font-semibold">{a.title}</h3>
                <p className="text-paper/65 transition-colors group-hover:text-ink/80">{a.body}</p>
              </motion.div>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

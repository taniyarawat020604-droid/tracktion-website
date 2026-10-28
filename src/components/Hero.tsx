"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { socials } from "@/lib/content";
import Counter from "./Counter";
import Magnetic, { Arrow } from "./Magnetic";

const ease = [0.16, 1, 0.3, 1] as const;

const pings = ["+312 comments", "New follower · Series A founder", "+146 reposts", "DM: “Can we talk?”", "Profile views ↑ 9×"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const arrowY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const [ping, setPing] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPing(p => (p + 1) % pings.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={ref} id="top" className="noise grid-bg relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* the big growth arrow from the LinkedIn cover */}
      <motion.svg style={{ y: arrowY }} viewBox="0 0 800 500" className="pointer-events-none absolute -right-[10%] bottom-[-8%] w-[min(1100px,120vw)] opacity-90" fill="none" aria-hidden="true">
        <motion.path
          d="M40 470 L330 260 L470 360 L740 90"
          stroke="var(--lime-deep)" strokeWidth="70" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
        />
        <motion.path
          d="M560 80 L750 80 L750 270"
          stroke="var(--lime-deep)" strokeWidth="70" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, ease, delay: 1.7 }}
        />
      </motion.svg>

      <div className="wrap relative grid items-center gap-14 lg:grid-cols-[1.45fr_1fr]">
        <motion.div style={{ y: textY }} className="min-w-0">
          <motion.span className="eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            Personal branding studio · New Delhi
          </motion.span>
          <h1 className="mt-6 text-[clamp(2.6rem,1rem+6.4vw,6.3rem)] font-bold leading-[0.92]">
            {["Your story.", "Our strategy.", "Real traction."].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.1em] lg:whitespace-nowrap">
                <motion.span
                  className={`block ${i === 2 ? "text-lime" : i === 1 ? "text-transparent [-webkit-text-stroke:2px_var(--paper)]" : ""}`}
                  initial={{ y: "110%", rotate: 4 }} animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 1, ease, delay: 0.15 + i * 0.12 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p className="mt-7 max-w-[34ch] text-lg leading-relaxed text-paper/80 md:text-xl" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.6 }}>
            We grow creators, founders &amp; brands on social. Strategy, writing, editing and distribution, all in your voice.
          </motion.p>
          {/* Only LinkedIn is linked: no Instagram, YouTube or X accounts are listed on the company's LinkedIn page. */}
          <motion.ul className="mt-7 flex flex-wrap gap-2" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.75 } } }}>
            {socials.map(p => (
              <motion.li key={p.label} variants={{ hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1 } }}>
                <a href={p.href} target="_blank" rel="noopener"
                  className="inline-flex items-center gap-1.5 rounded-full border border-lime/60 px-4 py-1.5 font-display text-sm font-medium text-lime transition-colors hover:bg-lime hover:text-ink">
                  {p.label} <span aria-hidden="true">↗</span>
                </a>
              </motion.li>
            ))}
          </motion.ul>
          <motion.div className="mt-9 flex flex-wrap gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95 }}>
            <Magnetic href="#contact" className="bg-lime px-7 py-4 text-ink hover:bg-paper">Get a free content audit <Arrow /></Magnetic>
            <Magnetic href="#services" className="border border-paper/30 px-7 py-4 text-paper hover:border-lime hover:text-lime">See what we do</Magnetic>
          </motion.div>
        </motion.div>

        {/* post card */}
        <motion.div style={{ y: cardY }} className="relative min-w-0">
          <motion.article
            className="relative mx-auto max-w-[440px] rounded-3xl border border-line bg-ink-2/90 p-5 shadow-[0_40px_80px_-30px_rgba(155,228,58,0.25)] backdrop-blur"
            initial={{ opacity: 0, y: 60, rotate: 6 }} animate={{ opacity: 1, y: 0, rotate: 2 }} transition={{ duration: 1.1, ease, delay: 0.4 }}
            whileHover={{ rotate: 0, scale: 1.02 }}
          >
            <motion.span className="absolute -top-4 -right-3 rounded-full bg-lime px-3 py-2 font-mono text-[0.7rem] font-semibold uppercase tracking-wider text-ink"
              initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 8 }} transition={{ type: "spring", stiffness: 300, damping: 12, delay: 1.4 }}>
              Ghostwritten by us
            </motion.span>
            <div className="flex items-center gap-3">
              <div className="grid size-11 place-items-center rounded-full bg-lime font-display text-sm font-bold text-ink">YF</div>
              <div><b className="block text-sm">Your Founder</b><small className="text-xs text-mute">Building in public · 2h</small></div>
            </div>
            <p className="my-4 text-[0.95rem] leading-relaxed"><b>We had ₹20,000 in revenue and no office.</b><br />Nine months later, here&apos;s what changed…</p>
            <div className="rounded-2xl border border-line bg-ink p-4">
              <div className="flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-wider text-mute">
                <span>Impressions · 30 days</span>
                <span className="rounded bg-lime/15 px-2 py-1 text-lime">+<Counter to={2140} duration={2.4} />%</span>
              </div>
              <div className="mt-2 font-display text-4xl font-bold text-lime"><Counter to={1284600} duration={2.6} /></div>
              <svg viewBox="0 0 300 110" className="mt-2 h-28 w-full" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="hg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="var(--lime)" stopOpacity=".35" /><stop offset="1" stopColor="var(--lime)" stopOpacity="0" /></linearGradient>
                </defs>
                {[27, 55, 82].map(y => <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="var(--line)" />)}
                <motion.path d="M0 104 C40 102 70 100 100 96 S150 88 180 74 S230 48 255 30 S285 10 300 6 L300 110 L0 110 Z" fill="url(#hg)"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }} />
                <motion.path d="M0 104 C40 102 70 100 100 96 S150 88 180 74 S230 48 255 30 S285 10 300 6" stroke="var(--lime)" strokeWidth="3" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.2, ease: [0.65, 0, 0.35, 1], delay: 0.6 }} />
                <motion.circle cx="298" cy="7" r="5" fill="var(--lime)" initial={{ scale: 0 }} animate={{ scale: [0, 1.6, 1] }} transition={{ delay: 2.7, duration: 0.5 }} />
              </svg>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 font-mono text-xs text-mute"><span>♥ 2,184</span><span>312 comments</span><span>146 reposts</span></div>
          </motion.article>

          {/* live notification pings */}
          <div className="pointer-events-none absolute -bottom-8 left-0 h-12 w-full max-w-[440px] sm:-left-8" aria-hidden="true">
            <AnimatePresence mode="popLayout">
              <motion.div key={ping}
                className="absolute left-0 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2.5 font-display text-sm font-semibold text-ink shadow-xl"
                initial={{ opacity: 0, y: 24, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -24, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}>
                <span className="size-2 rounded-full bg-lime shadow-[0_0_0_4px_rgba(155,228,58,0.3)]" />
                {pings[ping]}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "motion/react";

// The zigzag growth arrow from Tracktion's LinkedIn logo, redrawn as a vector so it can animate.
export function Mark({ className = "", draw = false, delay = 0 }: { className?: string; draw?: boolean; delay?: number }) {
  const t = { duration: 1.1, ease: [0.65, 0, 0.35, 1] as const, delay };
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
      <motion.path
        d="M14 72 L38 50 L54 62 L84 30"
        stroke="var(--lime)" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round"
        initial={draw ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={t}
      />
      <motion.path
        d="M62 28 L86 28 L86 52"
        stroke="var(--lime)" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round"
        initial={draw ? { pathLength: 0, opacity: 0 } : false}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ ...t, duration: 0.5, delay: delay + 0.85 }}
      />
    </svg>
  );
}

// "tracktion" wordmark: the i is an upward lime arrow, as on the LinkedIn cover.
export function Wordmark({ className = "", animate = false }: { className?: string; animate?: boolean }) {
  return (
    <span className={`inline-flex items-baseline font-display font-bold tracking-[-0.04em] leading-none ${className}`} aria-label="tracktion">
      <span aria-hidden="true">trackt</span>
      <span aria-hidden="true" className="relative inline-block w-[0.34em] self-stretch">
        <motion.svg
          viewBox="0 0 34 100"
          className="absolute bottom-[0.02em] left-0 h-[0.98em] w-full overflow-visible"
          initial={animate ? { y: "45%", opacity: 0 } : false}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.5 }}
        >
          <rect x="8" y="24" width="18" height="76" rx="2" fill="var(--lime)" />
          <path d="M17 0 L34 28 L0 28 Z" fill="var(--lime)" />
        </motion.svg>
      </span>
      <span aria-hidden="true">on</span>
    </span>
  );
}

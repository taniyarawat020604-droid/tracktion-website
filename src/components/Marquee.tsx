"use client";

import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity, wrap } from "motion/react";
import { useRef } from "react";

// Ticker whose speed and direction follow the scroll.
export default function Marquee({ items, baseVelocity = -2, className = "" }: { items: string[]; baseVelocity?: number; className?: string }) {
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const v = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(v, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(base, n => `${wrap(-50, 0, n)}%`);
  const dir = useRef(1);
  useAnimationFrame((_, delta) => {
    let move = dir.current * baseVelocity * (delta / 1000);
    if (factor.get() < 0) dir.current = -1;
    else if (factor.get() > 0) dir.current = 1;
    move += dir.current * move * factor.get();
    base.set(base.get() + move);
  });
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`} aria-hidden="true">
      <motion.div className="flex w-max" style={{ x }}>
        {[0, 1].map(k => (
          <div key={k} className="flex shrink-0">
            {row.map((t, i) => (
              <span key={i} className="flex items-center gap-8 pr-8 font-display text-[clamp(1.6rem,1rem+2.5vw,3rem)] font-bold tracking-tight">
                {t}
                <svg viewBox="0 0 100 100" className="size-[0.8em]" fill="none"><path d="M14 72 L38 50 L54 62 L84 30 M62 28 L86 28 L86 52" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

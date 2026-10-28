"use client";

import { motion, useMotionValue, useSpring } from "motion/react";

// Buttons that lean toward the cursor.
export default function Magnetic({ children, className = "", href, onClick, type, disabled, strength = 0.35 }: { children: React.ReactNode; className?: string; href?: string; onClick?: () => void; type?: "submit" | "button"; disabled?: boolean; strength?: number }) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15 }), sy = useSpring(y, { stiffness: 220, damping: 15 });
  const move = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const leave = () => { x.set(0); y.set(0); };
  const base = `inline-flex items-center gap-3 rounded-full font-display font-semibold transition-colors ${className}`;
  const external = href?.startsWith("http");
  if (href)
    return (
      <motion.a href={href} style={{ x: sx, y: sy }} onPointerMove={move} onPointerLeave={leave} className={base} {...(external ? { target: "_blank", rel: "noopener" } : {})} whileTap={{ scale: 0.96 }}>
        {children}
      </motion.a>
    );
  return (
    <motion.button type={type ?? "button"} disabled={disabled} onClick={onClick} style={{ x: sx, y: sy }} onPointerMove={move} onPointerLeave={leave} className={base} whileTap={{ scale: 0.96 }}>
      {children}
    </motion.button>
  );
}

export const Arrow = () => (
  <svg viewBox="0 0 24 24" className="size-[1.1em]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

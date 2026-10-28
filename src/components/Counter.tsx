"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

export default function Counter({ to, prefix = "", suffix = "", duration = 1.6, format = (n: number) => Math.round(n).toLocaleString("en-IN") }: { to: number; prefix?: string; suffix?: string; duration?: number; format?: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: v => { el.textContent = prefix + format(v) + suffix; } });
    return () => controls.stop();
  }, [inView, to, prefix, suffix, duration, format]);
  return <span ref={ref} className="tabular-nums">{prefix + format(to) + suffix}</span>;
}

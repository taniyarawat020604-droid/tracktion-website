"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { process } from "@/lib/content";

// Five points on a rising curve; the line draws as you scroll and each point lights up when reached.
const pts = [[60, 300], [270, 250], [480, 190], [690, 120], [900, 40]] as const;
const d = "M" + pts.map(p => p.join(" ")).join(" L");

function Node({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const at = i / (pts.length - 1);
  const scale = useTransform(progress, [at - 0.05, at], [0.4, 1]);
  const fill = useTransform(progress, [at - 0.01, at], ["#262622", "#9be43a"]);
  return <motion.circle cx={pts[i][0]} cy={pts[i][1]} r="16" style={{ scale, fill }} stroke="#0b0b0b" strokeWidth="6" />;
}

function Step({ i, progress, title, body }: { i: number; progress: MotionValue<number>; title: string; body: string }) {
  const at = i / (pts.length - 1);
  const opacity = useTransform(progress, [at - 0.15, at], [0.3, 1]);
  return (
    <motion.li style={{ opacity }} className="flex flex-col gap-2 border-t border-line pt-5">
      <span className="font-mono text-xs text-lime">Step {i + 1}</span>
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="text-sm leading-relaxed text-paper/65">{body}</p>
    </motion.li>
  );
}

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "center 45%"] });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true });

  return (
    <section ref={ref} id="process" className="grid-bg border-y border-line py-24 md:py-32">
      <div className="wrap">
        <span className="eyebrow">How it works</span>
        <h2 className="mt-5 max-w-[16ch] text-[clamp(2.2rem,1.4rem+3.5vw,4.2rem)] font-bold leading-[0.95]">From first call to compounding reach.</h2>
        <div className="mt-12 overflow-hidden">
          <svg viewBox="0 0 960 340" className="w-full" fill="none" aria-hidden="true">
            {[80, 160, 240, 320].map(y => <line key={y} x1="0" x2="960" y1={y} y2={y} stroke="#262622" strokeDasharray="4 8" />)}
            <path d={d} stroke="#262622" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <motion.path d={d} stroke="var(--lime)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" style={{ pathLength: progress }} />
            {pts.map((_, i) => <Node key={i} i={i} progress={progress} />)}
          </svg>
        </div>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {process.map((p, i) => <Step key={p.title} i={i} progress={progress} {...p} />)}
        </ol>
      </div>
    </section>
  );
}

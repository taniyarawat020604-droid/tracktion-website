"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { story } from "@/lib/content";

function Beat({ i, total, progress, when, line }: { i: number; total: number; progress: MotionValue<number>; when: string; line: string }) {
  const start = i / total, end = (i + 1) / total;
  const opacity = useTransform(progress, [start - 0.12, start, end], [0.18, 1, i === total - 1 ? 1 : 0.35]);
  const x = useTransform(progress, [start - 0.12, start], [24, 0]);
  return (
    <motion.li style={{ opacity, x }} className="grid grid-cols-[6.5rem_1fr] gap-5 border-t border-line py-7 md:grid-cols-[9rem_1fr]">
      <span className="pt-1.5 font-mono text-xs uppercase tracking-widest text-lime">{when}</span>
      <p className="font-display text-[clamp(1.25rem,1rem+1.2vw,2rem)] font-semibold leading-tight tracking-tight">{line}</p>
    </motion.li>
  );
}

export default function Story() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const rupees = useTransform(scrollYProgress, [0, 1], [20000, 1800000]);
  const rupeeText = useTransform(rupees, v => "₹" + Math.round(v / 1000).toLocaleString("en-IN") + "k");

  return (
    <section ref={ref} id="story" className="relative py-28 md:py-40">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="eyebrow">Our own traction</span>
          <h2 className="mt-5 text-[clamp(2.4rem,1.4rem+4vw,4.8rem)] font-bold leading-[0.95]">
            From ₹20,000 and a flat to <span className="text-lime">18+ clients</span> in nine months.
          </h2>
          <p className="mt-6 max-w-[42ch] text-lg text-paper/70">
            We grew Tracktion the same way we grow our clients: by posting what we learned, every day, on LinkedIn.
          </p>
          <div className="mt-10 flex items-end gap-5">
            <div className="relative h-40 w-3 overflow-hidden rounded-full bg-line">
              <motion.div style={{ scaleY: bar }} className="absolute inset-0 origin-bottom rounded-full bg-lime" />
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-mute">Growth, as you scroll</div>
              <motion.div className="font-display text-5xl font-bold tabular-nums text-lime">{rupeeText}</motion.div>
            </div>
          </div>
        </div>
        <ol>
          {story.map((s, i) => <Beat key={i} i={i} total={story.length} progress={scrollYProgress} {...s} />)}
        </ol>
      </div>
    </section>
  );
}

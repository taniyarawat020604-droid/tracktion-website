"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { services } from "@/lib/content";

// Pinned section: vertical scroll drives the cards sideways on wide screens; stacks on phones.
export default function Services() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const [wide, setWide] = useState(false);

  useLayoutEffect(() => {
    const measure = () => {
      const isWide = window.matchMedia("(min-width: 900px)").matches;
      setWide(isWide);
      setDist(isWide && track.current ? Math.max(0, track.current.scrollWidth - window.innerWidth) : 0);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={section} id="services" className="relative" style={wide ? { height: `calc(100vh + ${dist}px)` } : undefined}>
      <div className={wide ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : "py-24"}>
        <div className="wrap mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow">Services</span>
            <h2 className="mt-5 text-[clamp(2.2rem,1.4rem+3.5vw,4.2rem)] font-bold leading-[0.95]">One team for <span className="text-lime">every platform.</span></h2>
          </div>
          {wide && (
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-mute">
              Scroll
              <div className="h-px w-32 bg-line"><motion.div style={{ scaleX: progress }} className="h-px origin-left bg-lime" /></div>
            </div>
          )}
        </div>
        <motion.div ref={track} style={wide ? { x } : undefined} className={wide ? "flex w-max gap-6 pl-[max(16px,calc((100vw-1280px)/2+48px))] pr-12" : "wrap grid gap-5"}>
          {services.map((s, i) => (
            <motion.article key={s.key}
              initial={wide ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className={`group relative flex flex-col overflow-hidden rounded-[28px] border p-8 ${wide ? "h-[min(62vh,520px)] w-[min(420px,80vw)]" : ""} ${i === 0 ? "border-lime bg-lime text-ink" : "border-line bg-ink-2"}`}>
              <div className="flex items-center justify-between">
                <span className={`rounded-full border px-3 py-1 font-mono text-xs ${i === 0 ? "border-ink/30" : "border-lime/50 text-lime"}`}>{s.platform}</span>
                <svg viewBox="0 0 100 100" className={`size-10 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 ${i === 0 ? "text-ink" : "text-lime"}`} fill="none" aria-hidden="true">
                  <path d="M14 72 L38 50 L54 62 L84 30 M62 28 L86 28 L86 52" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="mt-auto pt-16 text-[2rem] font-bold leading-[1.02]">{s.title}</h3>
              <p className={`mt-4 leading-relaxed ${i === 0 ? "text-ink/80" : "text-paper/65"}`}>{s.body}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {s.tags.map(t => <li key={t} className={`rounded-full px-3 py-1.5 text-xs ${i === 0 ? "bg-ink/10" : "bg-paper/5 text-paper/80"}`}>{t}</li>)}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

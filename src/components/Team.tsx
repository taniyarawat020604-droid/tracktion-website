"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { team } from "@/lib/content";
import { SplitReveal } from "./Reveal";

function Card({ m, i }: { m: (typeof team)[number]; i: number }) {
  const mx = useMotionValue(0.5), my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });
  const initials = m.name.split(" ").map(s => s[0]).join("");
  const Wrapper = m.linkedin ? motion.a : motion.div;
  return (
    <Wrapper
      {...(m.linkedin ? { href: m.linkedin, target: "_blank", rel: "noopener" } : {})}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={e => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width); my.set((e.clientY - r.top) / r.height); }}
      onPointerLeave={() => { mx.set(0.5); my.set(0.5); }}
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
      className="group flex flex-col items-center gap-4 rounded-3xl border border-line bg-ink-2 px-4 pt-7 pb-5 text-center transition-colors hover:border-lime"
    >
      {/* Small on purpose: three of the LinkedIn photos are only 100×100, so they stay sharp at this size. */}
      <div className="relative size-24 overflow-hidden rounded-full bg-lime-deep ring-2 ring-line ring-offset-4 ring-offset-ink-2 transition-[box-shadow] duration-300 group-hover:ring-lime sm:size-28">
        {m.photo ? (
          <Image src={m.photo} alt={`${m.name}, ${m.role} of Tracktion`} fill sizes="112px" unoptimized
            className="object-cover grayscale transition duration-500 group-hover:grayscale-0" />
        ) : (
          <span className="grid size-full place-items-center font-display text-3xl font-bold tracking-tighter text-lime">{initials}</span>
        )}
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="font-mono text-[0.7rem] uppercase tracking-widest text-lime">{m.role}</span>
        <h3 className="text-lg font-semibold leading-tight">{m.name}</h3>
      </div>
      {m.linkedin && <span className="rounded-full border border-line px-2.5 py-1 font-mono text-xs text-mute transition-colors group-hover:border-lime group-hover:text-lime">in ↗</span>}
    </Wrapper>
  );
}

export default function Team() {
  return (
    <section id="team" className="py-24 md:py-32">
      <div className="wrap">
        <div className="grid items-end gap-8 md:grid-cols-2">
          <div>
            <span className="eyebrow">The team</span>
            <SplitReveal className="mt-5 text-[clamp(2.2rem,1.4rem+3.5vw,4.2rem)] font-bold leading-[0.95]" lines={["Small team.", <span key="s" className="text-lime">Senior attention.</span>]} />
          </div>
          <p className="max-w-[40ch] text-lg text-paper/70">You work directly with the people writing and editing your content, founders included.</p>
        </div>
        <div className="mt-14 grid max-w-4xl grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {team.map((m, i) => <Card key={m.name} m={m} i={i} />)}
        </div>
      </div>
    </section>
  );
}

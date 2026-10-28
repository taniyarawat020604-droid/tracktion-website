"use client";

import Counter from "./Counter";
import { FadeUp } from "./Reveal";

const inr = (n: number) => Math.round(n).toLocaleString("en-IN");

export default function Stats() {
  const items = [
    { n: <Counter to={18} suffix="+" />, label: "clients signed in our first nine months" },
    { n: <Counter to={9} />, label: "months from a flat to our own Delhi office" },
    { n: <>M<span className="text-paper">+</span></>, label: "views across the profiles we manage" },
    { n: <Counter to={4} />, label: "platforms: LinkedIn, Instagram, YouTube and X" },
  ];
  return (
    <section className="py-24 md:py-28">
      <div className="wrap grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <div key={i} className="bg-ink p-8"><FadeUp delay={i * 0.08} className="flex flex-col gap-3">
            <div className="font-display text-[clamp(3.5rem,2.5rem+3vw,5.5rem)] font-bold leading-none tracking-tighter text-lime">{it.n}</div>
            <p className="max-w-[24ch] text-paper/65">{it.label}</p>
          </FadeUp></div>
        ))}
      </div>
      <p className="sr-only">First month revenue was ₹{inr(20000)}.</p>
    </section>
  );
}

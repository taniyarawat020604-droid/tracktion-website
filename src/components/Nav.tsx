"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Wordmark } from "./Logo";
import Magnetic, { Arrow } from "./Magnetic";

const links = [
  { href: "#story", label: "Story" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#team", label: "Team" },
  { href: "#careers", label: "Careers" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", y => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240 && !open);
    setSolid(y > 24);
  });

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)]"
      animate={{ y: hidden ? "-110%" : 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`transition-colors duration-300 ${solid || open ? "border-b border-line bg-ink/80 backdrop-blur-xl" : "border-b border-transparent"}`}>
        <nav className="wrap flex items-center justify-between gap-4 py-4" aria-label="Main">
          <a href="#top" className="text-[1.6rem] text-paper" aria-label="Tracktion home"><Wordmark /></a>
          <ul className="hidden items-center gap-8 text-sm text-paper/80 md:flex">
            {links.map(l => (
              <li key={l.href}>
                <a href={l.href} className="group relative py-1 hover:text-paper">
                  {l.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-lime transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <Magnetic href="#contact" className="hidden bg-lime px-5 py-2.5 text-sm text-ink hover:bg-paper sm:inline-flex">Book a call <Arrow /></Magnetic>
            <button
              className="relative grid size-11 place-items-center rounded-full border border-line md:hidden"
              aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}
              onClick={() => setOpen(o => !o)}
            >
              <motion.span className="absolute h-0.5 w-5 bg-paper" animate={{ rotate: open ? 45 : 0, y: open ? 0 : -4 }} />
              <motion.span className="absolute h-0.5 w-5 bg-paper" animate={{ rotate: open ? -45 : 0, y: open ? 0 : 4 }} />
            </button>
          </div>
        </nav>
        <AnimatePresence>
          {open && (
            <motion.ul
              className="wrap flex flex-col gap-1 overflow-hidden pb-6 md:hidden"
              initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            >
              {[...links, { href: "#contact", label: "Book a call" }].map((l, i) => (
                <motion.li key={l.href} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.05 * i }}>
                  <a href={l.href} onClick={() => setOpen(false)} className="block py-2 font-display text-3xl font-semibold">{l.label}</a>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { LINKEDIN, platforms } from "@/lib/content";
import Magnetic, { Arrow } from "./Magnetic";
import { SplitReveal } from "./Reveal";

const field = "w-full rounded-2xl border border-line bg-ink-2 px-4 py-3.5 text-paper placeholder:text-mute focus:border-lime focus:outline-none focus:ring-2 focus:ring-lime/30";
const label = "font-mono text-xs uppercase tracking-widest text-mute";

export default function Contact() {
  const [picked, setPicked] = useState<string[]>(["LinkedIn"]);
  const [state, setState] = useState<{ ok: boolean; msg: string } | null>(null);

  const [sending, setSending] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const name = String(f.get("name") || "").trim(), email = String(f.get("email") || "").trim();
    if (!name || !/^\S+@\S+\.\S+$/.test(email)) return setState({ ok: false, msg: "Add your name and a valid email so we can reach you." });

    setSending(true);
    setState(null);
    try {
      const res = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email,
          role: f.get("role"),
          platforms: picked,
          message: f.get("msg"),
          company_website: f.get("company_website"),
        }),
      });
      const out = await res.json().catch(() => ({ ok: false }));
      if (!out.ok) throw new Error(out.error || "We couldn't save your request. Please try again in a minute.");
      setState({ ok: true, msg: `Thanks, ${name.split(" ")[0]}. Your call request is in. We'll email ${email} within two working days.` });
      form.reset();
      setPicked(["LinkedIn"]);
    } catch (err) {
      setState({ ok: false, msg: err instanceof Error ? err.message : "Something went wrong. Please try again." });
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="border-t border-line py-24 md:py-32">
      <div className="wrap grid gap-14 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div>
            <span className="eyebrow">Book a call</span>
            <SplitReveal className="mt-5 text-[clamp(2.4rem,1.4rem+4vw,4.8rem)] font-bold leading-[0.95]" lines={["Let's get you", <span key="t" className="text-lime">some traction.</span>]} />
          </div>
          <p className="max-w-[38ch] text-lg text-paper/70">Tell us who you are and where you want to grow. We&apos;ll set up a call and bring a free audit of your current presence.</p>
          <dl className="grid gap-5">
            <div><dt className={label}>Studio</dt><dd className="mt-1 text-lg">Paschim Vihar, New Delhi 110063</dd></div>
            <div><dt className={label}>LinkedIn</dt><dd className="mt-1 text-lg"><a href={LINKEDIN} target="_blank" rel="noopener" className="underline decoration-lime underline-offset-4 hover:text-lime">linkedin.com/company/tracktion-media</a></dd></div>
          </dl>
        </div>

        <form onSubmit={submit} noValidate aria-busy={sending} className="relative grid gap-5 rounded-[28px] border border-line bg-ink p-6 md:p-9">
          <div className="grid gap-2"><label htmlFor="f-name" className={label}>Your name</label><input id="f-name" name="name" autoComplete="name" placeholder="Aarav Sharma" className={field} /></div>
          <div className="grid gap-2"><label htmlFor="f-email" className={label}>Work email</label><input id="f-email" name="email" type="email" autoComplete="email" placeholder="aarav@company.com" className={field} /></div>
          <div className="grid gap-2">
            <label htmlFor="f-role" className={label}>You are a</label>
            <select id="f-role" name="role" className={field}>
              {["Startup founder", "Creator", "Podcaster", "Finance professional", "Healthcare brand", "Industry leader", "Something else"].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <fieldset className="grid gap-2">
            <legend className={`${label} mb-2`}>Where do you want to grow?</legend>
            <div className="flex flex-wrap gap-2">
              {platforms.map(p => {
                const on = picked.includes(p);
                return (
                  <motion.button key={p} type="button" aria-pressed={on} whileTap={{ scale: 0.92 }}
                    onClick={() => setPicked(s => (on ? s.filter(x => x !== p) : [...s, p]))}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${on ? "border-lime bg-lime text-ink" : "border-line text-paper hover:border-lime"}`}>
                    {p}
                  </motion.button>
                );
              })}
            </div>
            <input type="hidden" name="platforms" value={picked.join(",")} />
          </fieldset>
          <div className="grid gap-2"><label htmlFor="f-msg" className={label}>Anything else?</label><textarea id="f-msg" name="msg" rows={4} placeholder="Links to your profiles, goals, timelines…" className={field} /></div>
          {/* honeypot for bots; hidden from people and screen readers */}
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
          <Magnetic type="submit" disabled={sending} className="justify-self-start bg-lime px-7 py-4 text-ink hover:bg-paper disabled:cursor-wait disabled:opacity-60">
            {sending ? "Booking…" : <>Book my call <Arrow /></>}
          </Magnetic>
          <AnimatePresence mode="wait">
            {state && (
              <motion.p key={state.msg} role="status" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className={state.ok ? "font-semibold text-lime" : "text-paper/80"}>
                {state.msg}
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </div>
    </section>
  );
}

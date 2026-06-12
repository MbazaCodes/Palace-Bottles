"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Send } from "lucide-react";
import { InstagramIcon } from "@/components/ui/SocialIcons";

const TESTIMONIALS: { name: string; city: string; text: string }[] = [];

const IG_TILES: string[] = [];

export default function SocialProof() {
  const [idx, setIdx] = useState(0);
  if (TESTIMONIALS.length === 0 && IG_TILES.length === 0) return null;
  return (
    <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-16 lg:grid-cols-3">
      {/* Testimonials */}
      <div className="glass-navy relative overflow-hidden rounded-2xl p-6 text-white">
        <h3 className="font-display text-lg font-bold">What Our Customers Say</h3>
        <Quote aria-hidden className="absolute bottom-4 right-4 size-12 text-white/10" />
        <div className="mt-4 min-h-[7.5rem]">
          <AnimatePresence mode="wait">
            <motion.blockquote key={idx}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
              <p className="text-sm text-white/85">&ldquo;{TESTIMONIALS[idx].text}&rdquo;</p>
              <footer className="mt-4 flex items-center gap-3">
                <span aria-hidden className="size-9 rounded-full bg-gradient-to-br from-ice to-royal" />
                <div className="text-xs"><strong className="block text-sm">{TESTIMONIALS[idx].name}</strong><span className="text-white/60">{TESTIMONIALS[idx].city}</span></div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <div className="mt-4 flex gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} aria-label={`Show testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-ice" : "w-2.5 bg-white/30"}`} />
          ))}
        </div>
      </div>

      {/* Instagram */}
      <div className="rounded-2xl border border-silver bg-white p-6 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="flex items-center gap-2 font-display text-lg font-bold text-navy"><InstagramIcon className="size-5" /> Follow Us On Instagram</h3>
            <p className="text-xs text-navy/55">@palacebottles</p>
          </div>
          <a href="https://instagram.com/palacebottles" target="_blank" rel="noopener noreferrer" className="rounded-xl bg-navy px-4 py-2 text-xs font-bold text-white hover:bg-navy-deep">Follow Us</a>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {IG_TILES.map((c, i) => (
            <span key={i} aria-hidden className="aspect-square rounded-lg transition-transform hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${c}, #dceeff)` }} />
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="glass-navy relative overflow-hidden rounded-2xl p-6 text-white">
        <div aria-hidden className="absolute -right-8 -top-8 size-36 rounded-full bg-ice/20 blur-2xl" />
        <h3 className="font-display text-lg font-bold">Join The Palace Family</h3>
        <p className="mt-2 text-sm text-white/70">Get exclusive offers, new arrivals and hydration tips.</p>
        <form className="mt-5 flex" onSubmit={(e) => e.preventDefault()}>
          <input type="email" required placeholder="Enter your email" aria-label="Email address"
            className="w-full rounded-l-xl border border-white/15 bg-white/10 px-3 py-3 text-sm outline-none placeholder:text-white/45 focus:border-ice" />
          <button aria-label="Subscribe" className="rounded-r-xl bg-royal px-4 hover:bg-royal-bright"><Send className="size-4" /></button>
        </form>
      </div>
    </section>
  );
}

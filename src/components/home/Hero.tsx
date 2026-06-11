"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Bottle3D from "@/components/ui/Bottle3D";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

function IceCube({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.span
      aria-hidden
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay }}
      className={`absolute size-10 rotate-12 rounded-lg border border-white/40 bg-gradient-to-br from-ice/70 to-white/20 backdrop-blur-sm animate-float ${className}`}
      style={{ boxShadow: "inset 0 0 14px rgba(255,255,255,0.5), 0 8px 24px rgba(220,238,255,0.25)" }}
    />
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-night text-white">
      {/* mountain horizon glow */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(37,99,235,0.35),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(16,42,107,0.6),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-navy-deep/80 to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
        {/* Copy */}
        <div>
          <motion.span {...fadeUp(0)} className="glass inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-ice">
            Premium Quality
          </motion.span>
          <motion.h1 {...fadeUp(0.1)} className="mt-5 font-display text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">
            Keep It Hot.<br />Keep It Cold.<br />Keep It <span className="bg-gradient-to-r from-ice to-royal-bright bg-clip-text text-transparent">Palace.</span>
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="mt-5 max-w-md text-white/75">
            Premium thermal flasks and hydration products trusted across Tanzania.
          </motion.p>
          <motion.div {...fadeUp(0.3)} className="mt-7 flex flex-wrap gap-3">
            <Link href="/shop" className="flex items-center gap-2 rounded-xl bg-royal px-6 py-3.5 text-sm font-bold shadow-glass transition-all hover:bg-royal-bright hover:shadow-float">
              Shop Now <ArrowRight className="size-4" />
            </Link>
            <Link href="/best-sellers" className="glass rounded-xl px-6 py-3.5 text-sm font-bold transition-colors hover:bg-white/15">
              Explore Collection
            </Link>
          </motion.div>
          <motion.div {...fadeUp(0.4)} className="mt-9 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5" aria-hidden>
                {["#f59e0b", "#10b981", "#8b5cf6", "#ef4444"].map((c) => (
                  <span key={c} className="size-8 rounded-full border-2 border-navy-night" style={{ background: `linear-gradient(135deg, ${c}, #102a6b)` }} />
                ))}
              </div>
              <div className="text-xs"><strong className="block font-display text-sm">10K+</strong><span className="text-white/60">Happy Customers</span></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex" aria-hidden>{[1, 2, 3, 4, 5].map((n) => <Star key={n} className="size-4 fill-amber-400 text-amber-400" />)}</span>
              <div className="text-xs"><strong className="font-display text-sm">4.9/5</strong> <span className="text-white/60">from 2,000+ reviews</span></div>
            </div>
          </motion.div>
        </div>

        {/* 3D product stage */}
        <div className="relative mx-auto h-[26rem] w-full max-w-lg sm:h-[30rem]" aria-label="Palace Bottles product showcase">
          {/* glowing halo ring */}
          <div aria-hidden className="absolute left-1/2 top-1/2 size-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ice/30 animate-pulse-ring"
            style={{ boxShadow: "0 0 80px rgba(96,165,250,0.45), inset 0 0 60px rgba(96,165,250,0.15)" }} />
          <div aria-hidden className="absolute left-1/2 top-1/2 size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 animate-spin-slow" />

          {/* podium */}
          <div aria-hidden className="absolute bottom-6 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-[50%] bg-royal/40 blur-md" />
          <div aria-hidden className="absolute bottom-8 left-1/2 h-5 w-2/3 -translate-x-1/2 rounded-[50%] bg-gradient-to-r from-navy via-royal to-navy"
            style={{ boxShadow: "0 0 30px rgba(59,130,246,0.7)" }} />

          {/* bottles */}
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}
            className="absolute bottom-12 left-1/2 w-[38%] -translate-x-1/2 animate-float" style={{ "--tilt": "0deg" } as React.CSSProperties}>
            <Bottle3D body="#102a6b" accent="#2563eb" shape="flask" className="drop-shadow-[0_24px_40px_rgba(6,15,46,0.7)]" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.45 }}
            className="absolute bottom-16 left-[6%] w-[28%] animate-float-rev" style={{ "--tilt": "-8deg" } as React.CSSProperties}>
            <Bottle3D body="#eef0f4" accent="#cdd3dd" shape="bottle" className="drop-shadow-[0_20px_32px_rgba(6,15,46,0.6)]" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.6 }}
            className="absolute bottom-14 right-[6%] w-[28%] animate-float-slow" style={{ "--tilt": "8deg" } as React.CSSProperties}>
            <Bottle3D body="#2563eb" accent="#60a5fa" shape="sport" className="drop-shadow-[0_20px_32px_rgba(6,15,46,0.6)]" />
          </motion.div>

          <IceCube className="left-[2%] top-[28%]" delay={0.8} />
          <IceCube className="right-[4%] top-[14%] size-7" delay={1} />
          <IceCube className="bottom-[18%] right-[16%] size-6" delay={1.2} />
        </div>
      </div>
    </section>
  );
}

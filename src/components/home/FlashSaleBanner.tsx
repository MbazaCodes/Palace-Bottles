"use client";
import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import Countdown from "@/components/ui/Countdown";
import Bottle3D from "@/components/ui/Bottle3D";

// Demo target: rolls forward so the timer is always live
const target = new Date(Date.now() + 2 * 86400000 + 14 * 3600000 + 36 * 60000);

export default function FlashSaleBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4">
      <div className="glass-navy relative flex flex-col items-center gap-5 overflow-hidden rounded-2xl px-6 py-6 text-white sm:flex-row sm:justify-between">
        <div aria-hidden className="absolute -left-10 -top-10 size-44 rounded-full bg-royal/30 blur-3xl" />
        <div className="flex items-center gap-4">
          <div className="hidden w-16 -rotate-12 animate-float sm:block" style={{ "--tilt": "-12deg" } as React.CSSProperties}>
            <Bottle3D body="#16181d" accent="#3a3f4a" shape="flask" label={false} />
          </div>
          <div>
            <p className="flex items-center gap-2 font-display text-xl font-bold">
              <Zap className="size-5 fill-amber-400 text-amber-400" /> Flash Sale
            </p>
            <p className="text-sm text-white/70">Limited time offer on selected items. Don&apos;t miss out!</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Countdown target={target} />
          <Link href="/offers" className="flex items-center gap-2 rounded-xl bg-royal px-5 py-3 text-sm font-bold hover:bg-royal-bright">
            Shop The Sale <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

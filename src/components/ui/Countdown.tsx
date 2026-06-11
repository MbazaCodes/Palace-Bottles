"use client";
import { useEffect, useState } from "react";

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown({ target, light = false }: { target: Date; light?: boolean }) {
  const t = useCountdown(target);
  const cells = [
    [t.days, "Days"], [t.hours, "Hours"], [t.minutes, "Minutes"], [t.seconds, "Seconds"],
  ] as const;
  return (
    <div className="flex gap-2" role="timer" aria-label="Sale countdown">
      {cells.map(([v, l]) => (
        <div key={l} className={`min-w-[3.4rem] rounded-xl px-2 py-2 text-center ${light ? "bg-white/10 text-white" : "glass text-white"}`}>
          <span className="font-display text-xl font-bold tabular-nums">{String(v).padStart(2, "0")}</span>
          <span className="block text-[10px] uppercase tracking-wide opacity-70">{l}</span>
        </div>
      ))}
    </div>
  );
}

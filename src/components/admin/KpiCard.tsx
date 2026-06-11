import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

export default function KpiCard({ label, value, delta, up, vs, warn }: {
  label: string; value: string | number; delta: string; up: boolean; vs: string; warn?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-silver bg-white p-4 shadow-card">
      <div className="flex items-center gap-2">
        {warn && <AlertTriangle className="size-4 text-amber-500" />}
        <p className="text-xs font-medium text-navy/60">{label}</p>
      </div>
      <p className="mt-1.5 font-display text-xl font-extrabold text-navy">{value}</p>
      <p className={`mt-1 flex items-center gap-1 text-xs font-semibold ${up ? "text-emerald-600" : "text-red-500"}`}>
        {up ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
        {delta} <span className="font-normal text-navy/45">{vs}</span>
      </p>
    </div>
  );
}

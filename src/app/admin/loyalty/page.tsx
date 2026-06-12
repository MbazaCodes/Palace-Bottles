"use client";
import { useState } from "react";
import { Gift, Save } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";

const POINTS: { customer: string; phone: string; points: number; earned: string; lifetime: number }[] = [];

const HISTORY: { customer: string; change: string; reason: string; type: string; date: string }[] = [];

export default function AdminLoyaltyPage() {
  const [saved, setSaved] = useState(false);
  const input = "mt-1 w-full rounded-xl border border-silver bg-white px-3.5 py-2.5 text-sm outline-none focus:border-royal";

  return (
    <>
      <div>
        <h1 className="font-display text-2xl font-extrabold text-navy">Loyalty Program</h1>
        <p className="text-xs text-navy/50">Dashboard › Loyalty Program</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[["Members", "0"], ["Points Issued", "0"], ["Points Redeemed", "0"], ["Rewards Value", "TZS 0"]].map(([l, v]) => (
          <div key={l} className="rounded-2xl border border-silver bg-white p-4 shadow-card">
            <p className="text-xs text-navy/55">{l}</p>
            <p className="font-display text-xl font-extrabold text-navy">{v}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_22rem]">
        <div className="space-y-5">
          <div className="overflow-x-auto rounded-2xl border border-silver bg-white shadow-card">
            <h2 className="px-4 pt-4 font-display text-base font-bold text-navy">Top Point Holders</h2>
            <table className="mt-2 w-full min-w-[36rem] text-sm">
              <thead><tr className="border-b border-silver text-left text-xs text-navy/50"><th className="px-4 py-3 font-medium">Customer</th><th className="font-medium">Phone</th><th className="font-medium">Current Points</th><th className="font-medium">Lifetime Points</th><th className="px-4 font-medium">Last Activity</th></tr></thead>
              <tbody>
                {POINTS.map((p) => (
                  <tr key={p.phone} className="border-b border-silver/60 last:border-0 hover:bg-frost/60">
                    <td className="px-4 py-3 font-semibold text-navy">{p.customer}</td>
                    <td className="text-navy/70">{p.phone}</td>
                    <td><span className="flex items-center gap-1.5 font-display font-bold text-navy"><Gift className="size-3.5 text-royal" />{p.points.toLocaleString()}</span></td>
                    <td className="text-navy/70">{p.lifetime.toLocaleString()}</td>
                    <td className="px-4 text-xs text-navy/55">{p.earned}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-silver bg-white shadow-card">
            <h2 className="px-4 pt-4 font-display text-base font-bold text-navy">Redemption History</h2>
            <table className="mt-2 w-full min-w-[36rem] text-sm">
              <thead><tr className="border-b border-silver text-left text-xs text-navy/50"><th className="px-4 py-3 font-medium">Customer</th><th className="font-medium">Change</th><th className="font-medium">Reason</th><th className="font-medium">Type</th><th className="px-4 font-medium">Date</th></tr></thead>
              <tbody>
                {HISTORY.map((h, i) => (
                  <tr key={i} className="border-b border-silver/60 last:border-0 hover:bg-frost/60">
                    <td className="px-4 py-3 font-semibold text-navy">{h.customer}</td>
                    <td className={`font-bold ${h.change.startsWith("+") ? "text-emerald-600" : "text-violet-600"}`}>{h.change}</td>
                    <td className="text-navy/70">{h.reason}</td>
                    <td><StatusBadge status={h.type} /></td>
                    <td className="px-4 text-xs text-navy/55">{h.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setSaved(true); }} className="h-fit space-y-4 rounded-2xl border border-silver bg-white p-5 shadow-card">
          <h2 className="font-display text-base font-bold text-navy">Points Rules</h2>
          <label className="block text-sm font-semibold text-navy">Points per TZS 1,000 spent<input defaultValue="1" inputMode="numeric" className={input} /></label>
          <label className="block text-sm font-semibold text-navy">Points value (TZS per point)<input defaultValue="10" inputMode="numeric" className={input} /></label>
          <label className="block text-sm font-semibold text-navy">Minimum points to redeem<input defaultValue="500" inputMode="numeric" className={input} /></label>
          <label className="block text-sm font-semibold text-navy">Signup bonus points<input defaultValue="100" inputMode="numeric" className={input} /></label>
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-royal py-2.5 text-sm font-bold text-white hover:bg-royal-bright"><Save className="size-4" /> Save Rules</button>
          {saved && <p className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">Points rules saved successfully.</p>}
        </form>
      </div>
    </>
  );
}

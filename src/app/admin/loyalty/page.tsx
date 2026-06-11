"use client";
import { useState } from "react";
import { Gift, Save } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";

const POINTS = [
  { customer: "Juma Mwinyi", phone: "+255 712 345 678", points: 2450, earned: "May 18, 2026", lifetime: 5200 },
  { customer: "David Patrick", phone: "+255 712 654 321", points: 2100, earned: "May 14, 2026", lifetime: 4100 },
  { customer: "Asha Mohamed", phone: "+255 684 123 456", points: 1865, earned: "May 17, 2026", lifetime: 3320 },
  { customer: "Hassan Khamis", phone: "+255 624 333 444", points: 1580, earned: "May 12, 2026", lifetime: 2940 },
  { customer: "Michael John", phone: "+255 753 987 654", points: 1420, earned: "May 16, 2026", lifetime: 2680 },
];

const HISTORY = [
  { customer: "Juma Mwinyi", change: "+102", reason: "Order PB785291", type: "Earned", date: "May 18, 2026" },
  { customer: "Neema Paul", change: "-1,000", reason: "Redeemed: TZS 10,000 voucher", type: "Redeemed", date: "May 17, 2026" },
  { customer: "Asha Mohamed", change: "+75", reason: "Order PB785290", type: "Earned", date: "May 17, 2026" },
  { customer: "David Patrick", change: "-500", reason: "Redeemed: Free delivery", type: "Redeemed", date: "May 15, 2026" },
];

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
        {[["Members", "3,240"], ["Points Issued", "486,500"], ["Points Redeemed", "212,300"], ["Rewards Value", "TZS 2.12M"]].map(([l, v]) => (
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

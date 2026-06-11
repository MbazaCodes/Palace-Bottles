"use client";
import { useState } from "react";
import { Plus, X, Zap } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import Countdown from "@/components/ui/Countdown";
import Bottle3D from "@/components/ui/Bottle3D";

const target = new Date(Date.now() + 2 * 86400000 + 14 * 3600000 + 36 * 60000);

const SALES = [
  { name: "Mega Flash Sale", discount: "Up to 30%", products: 8, revenue: "TZS 4,560,000", sold: 228, orders: 156, status: "Live" },
  { name: "Weekend Hydration Deal", discount: "15%", products: 5, revenue: "TZS 1,840,000", sold: 96, orders: 71, status: "Scheduled" },
  { name: "Eid Special", discount: "20%", products: 12, revenue: "TZS 6,120,000", sold: 312, orders: 240, status: "Ended" },
  { name: "Back to School Kids Sale", discount: "25%", products: 6, revenue: "TZS 3,275,000", sold: 187, orders: 142, status: "Ended" },
];

export default function AdminFlashSalesPage() {
  const [showForm, setShowForm] = useState(false);
  const input = "mt-1 w-full rounded-xl border border-silver bg-white px-3.5 py-2.5 text-sm outline-none focus:border-royal";

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-navy">Flash Sales</h1>
          <p className="text-xs text-navy/50">Dashboard › Flash Sales</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 rounded-xl bg-royal px-4 py-2.5 text-sm font-bold text-white hover:bg-royal-bright">
          {showForm ? <X className="size-4" /> : <Plus className="size-4" />} {showForm ? "Close" : "Create Flash Sale"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={(e) => { e.preventDefault(); setShowForm(false); }} className="mt-5 grid gap-4 rounded-2xl border border-silver bg-white p-5 shadow-card sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-sm font-semibold text-navy">Sale Name *<input className={input} placeholder="e.g. June Mega Sale" required /></label>
          <label className="text-sm font-semibold text-navy">Discount (%) *<input inputMode="numeric" className={input} placeholder="e.g. 25" required /></label>
          <label className="text-sm font-semibold text-navy">Starts *<input type="datetime-local" className={input} required /></label>
          <label className="text-sm font-semibold text-navy">Ends *<input type="datetime-local" className={input} required /></label>
          <label className="text-sm font-semibold text-navy lg:col-span-3">Products
            <select multiple className={`${input} h-20`}>
              <option>Palace Classic Flask 1L</option><option>Hydro Active Bottle 750ml</option><option>Kids Fun Bottle 500ml</option><option>Sport Pro Bottle 1L</option>
            </select>
          </label>
          <div className="flex items-end"><button className="w-full rounded-xl bg-navy py-2.5 text-sm font-bold text-white hover:bg-navy-deep">Save Sale</button></div>
          <p className="text-xs text-navy/45 lg:col-span-4">Demo mode: writes to flash_sales + flash_sale_products in Phase 4.</p>
        </form>
      )}

      {/* Active sale */}
      <div className="glass-navy mt-5 grid gap-6 rounded-2xl p-6 text-white lg:grid-cols-[7rem_1fr_auto]">
        <div className="relative hidden w-28 lg:block">
          <span className="absolute -right-2 -top-2 z-10 rounded-full bg-red-500 px-2 py-1 text-[10px] font-bold">30% OFF</span>
          <Bottle3D body="#16181d" accent="#3a3f4a" shape="flask" label={false} />
        </div>
        <div>
          <p className="flex items-center gap-2 font-display text-xl font-bold"><Zap className="size-5 fill-amber-400 text-amber-400" /> Mega Flash Sale <StatusBadge status="Live" /></p>
          <p className="mt-1 text-sm text-white/70">8 products · ends in</p>
          <div className="mt-3"><Countdown target={target} light /></div>
          <div className="mt-4 max-w-md">
            <div className="flex justify-between text-xs"><span className="text-white/60">Sales Progress</span><span className="font-bold">72%</span></div>
            <div className="mt-1.5 h-2 rounded-full bg-white/15"><div className="h-2 w-[72%] rounded-full bg-gradient-to-r from-amber-400 to-orange-500" /></div>
          </div>
        </div>
        <dl className="grid grid-cols-3 gap-3 self-center text-center lg:grid-cols-1">
          <div className="glass rounded-xl px-4 py-3"><dt className="text-[10px] text-white/60">Revenue</dt><dd className="font-display text-sm font-bold">TZS 4.56M</dd></div>
          <div className="glass rounded-xl px-4 py-3"><dt className="text-[10px] text-white/60">Items Sold</dt><dd className="font-display text-sm font-bold">228</dd></div>
          <div className="glass rounded-xl px-4 py-3"><dt className="text-[10px] text-white/60">Orders</dt><dd className="font-display text-sm font-bold">156</dd></div>
        </dl>
      </div>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-silver bg-white shadow-card">
        <table className="w-full min-w-[42rem] text-sm">
          <thead>
            <tr className="border-b border-silver text-left text-xs text-navy/50">
              <th className="px-4 py-3 font-medium">Sale</th><th className="font-medium">Discount</th><th className="font-medium">Products</th>
              <th className="font-medium">Revenue</th><th className="font-medium">Items Sold</th><th className="font-medium">Orders</th><th className="px-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {SALES.map((s) => (
              <tr key={s.name} className="border-b border-silver/60 last:border-0 hover:bg-frost/60">
                <td className="px-4 py-3 font-semibold text-navy">{s.name}</td>
                <td className="font-bold text-red-500">{s.discount}</td>
                <td className="text-navy/70">{s.products}</td>
                <td className="font-semibold text-navy">{s.revenue}</td>
                <td className="text-navy/70">{s.sold}</td>
                <td className="text-navy/70">{s.orders}</td>
                <td className="px-4"><StatusBadge status={s.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

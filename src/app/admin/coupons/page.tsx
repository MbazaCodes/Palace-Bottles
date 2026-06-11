"use client";
import { useState } from "react";
import { Plus, X, Trash2, Copy } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";

interface Coupon { code: string; kind: "Percentage" | "Fixed"; value: number; start: string; end: string; limit: number; used: number; active: boolean }

const INITIAL: Coupon[] = [
  { code: "KARIBU10", kind: "Percentage", value: 10, start: "May 1, 2026", end: "Jun 30, 2026", limit: 500, used: 213, active: true },
  { code: "PALACE5000", kind: "Fixed", value: 5000, start: "May 10, 2026", end: "May 31, 2026", limit: 200, used: 88, active: true },
  { code: "FLASH20", kind: "Percentage", value: 20, start: "May 16, 2026", end: "May 20, 2026", limit: 300, used: 251, active: true },
  { code: "EID15", kind: "Percentage", value: 15, start: "Mar 28, 2026", end: "Apr 5, 2026", limit: 400, used: 396, active: false },
];

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState(INITIAL);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: "", kind: "Percentage" as Coupon["kind"], value: "10", limit: "100" });
  const input = "mt-1 w-full rounded-xl border border-silver bg-white px-3.5 py-2.5 text-sm outline-none focus:border-royal";

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code.trim()) return;
    setCoupons([{ code: form.code.toUpperCase(), kind: form.kind, value: Number(form.value), start: "Today", end: "—", limit: Number(form.limit), used: 0, active: true }, ...coupons]);
    setForm({ code: "", kind: "Percentage", value: "10", limit: "100" }); setShowForm(false);
  };

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-navy">Coupons</h1>
          <p className="text-xs text-navy/50">Dashboard › Coupons</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 rounded-xl bg-royal px-4 py-2.5 text-sm font-bold text-white hover:bg-royal-bright">
          {showForm ? <X className="size-4" /> : <Plus className="size-4" />} {showForm ? "Close" : "Create Coupon"}
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[["Active Coupons", coupons.filter((c) => c.active).length], ["Total Redemptions", coupons.reduce((t, c) => t + c.used, 0)], ["Best Performer", "FLASH20"], ["Discount Given", "TZS 4.2M"]].map(([l, v]) => (
          <div key={String(l)} className="rounded-2xl border border-silver bg-white p-4 shadow-card">
            <p className="text-xs text-navy/55">{l}</p>
            <p className="font-display text-xl font-extrabold text-navy">{v}</p>
          </div>
        ))}
      </div>

      {showForm && (
        <form onSubmit={add} className="mt-5 grid gap-4 rounded-2xl border border-silver bg-white p-5 shadow-card sm:grid-cols-2 lg:grid-cols-5">
          <label className="text-sm font-semibold text-navy">Coupon Code *
            <input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className={`${input} uppercase`} placeholder="e.g. JUNE15" required />
          </label>
          <label className="text-sm font-semibold text-navy">Type
            <select value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value as Coupon["kind"] })} className={input}>
              <option>Percentage</option><option>Fixed</option>
            </select>
          </label>
          <label className="text-sm font-semibold text-navy">{form.kind === "Percentage" ? "Discount (%)" : "Amount (TZS)"}
            <input value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} inputMode="numeric" className={input} />
          </label>
          <label className="text-sm font-semibold text-navy">Usage Limit
            <input value={form.limit} onChange={(e) => setForm({ ...form, limit: e.target.value })} inputMode="numeric" className={input} />
          </label>
          <div className="flex items-end"><button className="w-full rounded-xl bg-navy py-2.5 text-sm font-bold text-white hover:bg-navy-deep">Save Coupon</button></div>
          <p className="text-xs text-navy/45 lg:col-span-5">Demo mode: start/end dates and Supabase writes connect in Phase 4.</p>
        </form>
      )}

      <div className="mt-5 overflow-x-auto rounded-2xl border border-silver bg-white shadow-card">
        <table className="w-full min-w-[44rem] text-sm">
          <thead>
            <tr className="border-b border-silver text-left text-xs text-navy/50">
              <th className="px-4 py-3 font-medium">Code</th><th className="font-medium">Type</th><th className="font-medium">Value</th>
              <th className="font-medium">Start</th><th className="font-medium">End</th><th className="font-medium">Usage</th>
              <th className="font-medium">Status</th><th className="px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c.code} className="border-b border-silver/60 last:border-0 hover:bg-frost/60">
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1.5 font-display font-bold text-navy">{c.code}
                    <button onClick={() => navigator.clipboard?.writeText(c.code)} aria-label={`Copy ${c.code}`}><Copy className="size-3.5 text-navy/40" /></button>
                  </span>
                </td>
                <td className="text-navy/70">{c.kind}</td>
                <td className="font-semibold text-navy">{c.kind === "Percentage" ? `${c.value}%` : `TZS ${c.value.toLocaleString()}`}</td>
                <td className="text-xs text-navy/55">{c.start}</td>
                <td className="text-xs text-navy/55">{c.end}</td>
                <td>
                  <span className="text-xs font-semibold text-navy">{c.used}/{c.limit}</span>
                  <div className="mt-1 h-1.5 w-20 rounded-full bg-silver"><div className="h-1.5 rounded-full bg-royal" style={{ width: `${Math.min(100, (c.used / c.limit) * 100)}%` }} /></div>
                </td>
                <td><StatusBadge status={c.active ? "Active" : "Expired"} /></td>
                <td className="px-4">
                  <span className="flex gap-1">
                    <button onClick={() => setCoupons(coupons.map((x) => x.code === c.code ? { ...x, active: !x.active } : x))} className="rounded-lg border border-silver px-2 py-1.5 text-xs font-semibold text-navy hover:bg-frost">{c.active ? "Disable" : "Enable"}</button>
                    <button onClick={() => setCoupons(coupons.filter((x) => x.code !== c.code))} aria-label={`Delete ${c.code}`} className="rounded-lg border border-red-200 p-1.5 text-red-500 hover:bg-red-50"><Trash2 className="size-3.5" /></button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

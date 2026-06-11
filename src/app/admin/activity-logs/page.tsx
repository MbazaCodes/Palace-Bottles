"use client";
import { useState } from "react";
import { Search } from "lucide-react";

const LOGS = [
  { user: "Palace Admin", action: "Order Updated", entity: "Order PB785290 → Processing", date: "May 18, 2026 09:50 AM", ip: "197.250.12.44" },
  { user: "Zawadi Komba", action: "Order Updated", entity: "Order PB785288 → Shipped", date: "May 18, 2026 09:02 AM", ip: "197.250.18.91" },
  { user: "Frank Mallya", action: "Stock Changed", entity: "Palace Classic Flask 1L +50 units", date: "May 18, 2026 08:15 AM", ip: "41.222.55.10" },
  { user: "Palace Admin", action: "Coupon Created", entity: "FLASH20 (20% off)", date: "May 16, 2026 11:40 AM", ip: "197.250.12.44" },
  { user: "Palace Admin", action: "Flash Sale Created", entity: "Mega Flash Sale", date: "May 16, 2026 11:35 AM", ip: "197.250.12.44" },
  { user: "Grace Mhando", action: "Review Approved", entity: "Review #3 on Kids Fun Bottle", date: "May 15, 2026 02:20 PM", ip: "102.68.77.31" },
  { user: "Frank Mallya", action: "Product Added", entity: "Aqua Flow Bottle 500ml", date: "May 14, 2026 04:05 PM", ip: "41.222.55.10" },
  { user: "Palace Admin", action: "Settings Updated", entity: "Mobile money numbers", date: "May 13, 2026 10:12 AM", ip: "197.250.12.44" },
];

const ACTION_COLORS: Record<string, string> = {
  "Order Updated": "bg-blue-100 text-blue-700",
  "Stock Changed": "bg-emerald-100 text-emerald-700",
  "Coupon Created": "bg-violet-100 text-violet-700",
  "Flash Sale Created": "bg-amber-100 text-amber-700",
  "Review Approved": "bg-cyan-100 text-cyan-700",
  "Product Added": "bg-emerald-100 text-emerald-700",
  "Settings Updated": "bg-slate-100 text-slate-600",
};

export default function AdminActivityLogsPage() {
  const [q, setQ] = useState("");
  const rows = LOGS.filter((l) => q === "" || `${l.user} ${l.action} ${l.entity}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <div>
        <h1 className="font-display text-2xl font-extrabold text-navy">Activity Logs</h1>
        <p className="text-xs text-navy/50">Dashboard › Activity Logs</p>
      </div>

      <label className="mt-6 flex items-center gap-2 rounded-2xl border border-silver bg-white px-4 py-3 shadow-card">
        <Search className="size-4 text-navy/45" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by user, action or entity..." aria-label="Search activity logs"
          className="w-full bg-transparent text-sm outline-none placeholder:text-navy/40" />
      </label>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-silver bg-white shadow-card">
        <table className="w-full min-w-[44rem] text-sm">
          <thead>
            <tr className="border-b border-silver text-left text-xs text-navy/50">
              <th className="px-4 py-3 font-medium">User</th><th className="font-medium">Action</th>
              <th className="font-medium">Entity</th><th className="font-medium">Date</th><th className="px-4 font-medium">IP Address</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((l, i) => (
              <tr key={i} className="border-b border-silver/60 last:border-0 hover:bg-frost/60">
                <td className="px-4 py-3 font-semibold text-navy">{l.user}</td>
                <td><span className={`rounded-md px-2 py-1 text-[11px] font-bold ${ACTION_COLORS[l.action] ?? "bg-slate-100 text-slate-600"}`}>{l.action}</span></td>
                <td className="text-navy/70">{l.entity}</td>
                <td className="whitespace-nowrap text-xs text-navy/55">{l.date}</td>
                <td className="px-4 font-mono text-xs text-navy/55">{l.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

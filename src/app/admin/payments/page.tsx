"use client";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";

type PayStatus = "Pending" | "Verified" | "Failed";
const INITIAL = [
  { ref: "MP240518A91", order: "PB785291", customer: "Juma Mwinyi", method: "M-Pesa", amount: 102000, status: "Verified" as PayStatus, date: "May 18, 2026 10:32 AM" },
  { ref: "AM240518B22", order: "PB785290", customer: "Asha Mohamed", method: "Airtel Money", amount: 75000, status: "Verified" as PayStatus, date: "May 18, 2026 09:47 AM" },
  { ref: "MX240518C40", order: "PB785289", customer: "Michael John", method: "Mixx by Yas", amount: 50000, status: "Pending" as PayStatus, date: "May 18, 2026 09:21 AM" },
  { ref: "MP240518D15", order: "PB785288", customer: "Neema Paul", method: "M-Pesa", amount: 125000, status: "Verified" as PayStatus, date: "May 18, 2026 08:56 AM" },
  { ref: "HP240517E08", order: "PB785287", customer: "David Patrick", method: "HaloPesa", amount: 60000, status: "Verified" as PayStatus, date: "May 17, 2026 07:41 PM" },
  { ref: "—", order: "PB785286", customer: "Fatma Salum", method: "Cash on Delivery", amount: 45000, status: "Pending" as PayStatus, date: "May 17, 2026 06:15 PM" },
  { ref: "AM240517F73", order: "PB785285", customer: "Hassan Khamis", method: "Airtel Money", amount: 90000, status: "Failed" as PayStatus, date: "May 17, 2026 05:31 PM" },
];

const METHODS = ["All Methods", "M-Pesa", "Airtel Money", "Mixx by Yas", "HaloPesa", "Cash on Delivery"];
const STATUSES = ["All Status", "Pending", "Verified", "Failed"];

export default function AdminPaymentsPage() {
  const [txs, setTxs] = useState(INITIAL);
  const [method, setMethod] = useState("All Methods");
  const [status, setStatus] = useState("All Status");

  const rows = txs.filter((t) => (method === "All Methods" || t.method === method) && (status === "All Status" || t.status === status));
  const verify = (ref: string) => setTxs(txs.map((t) => (t.ref === ref ? { ...t, status: "Verified" } : t)));

  const SUMMARY = [
    { label: "M-Pesa", value: "TZS 5.84M", count: 142 },
    { label: "Airtel Money", value: "TZS 3.12M", count: 88 },
    { label: "Mixx by Yas", value: "TZS 1.45M", count: 41 },
    { label: "HaloPesa", value: "TZS 0.92M", count: 27 },
    { label: "Cash on Delivery", value: "TZS 1.12M", count: 58 },
  ];

  return (
    <>
      <div>
        <h1 className="font-display text-2xl font-extrabold text-navy">Payments</h1>
        <p className="text-xs text-navy/50">Dashboard › Payments</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        {SUMMARY.map((s) => (
          <div key={s.label} className="rounded-2xl border border-silver bg-white p-4 shadow-card">
            <p className="text-xs text-navy/55">{s.label}</p>
            <p className="font-display text-lg font-extrabold text-navy">{s.value}</p>
            <p className="text-[11px] font-semibold text-navy/45">{s.count} payments this month</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3 rounded-2xl border border-silver bg-white p-4 shadow-card">
        <select value={method} onChange={(e) => setMethod(e.target.value)} aria-label="Filter by method" className="rounded-xl border border-silver bg-white px-3 py-2.5 text-sm font-semibold text-navy outline-none">
          {METHODS.map((m) => <option key={m}>{m}</option>)}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status" className="rounded-xl border border-silver bg-white px-3 py-2.5 text-sm font-semibold text-navy outline-none">
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-silver bg-white shadow-card">
        <table className="w-full min-w-[46rem] text-sm">
          <thead>
            <tr className="border-b border-silver text-left text-xs text-navy/50">
              <th className="px-4 py-3 font-medium">Reference</th><th className="font-medium">Order</th><th className="font-medium">Customer</th>
              <th className="font-medium">Method</th><th className="font-medium">Amount</th><th className="font-medium">Status</th>
              <th className="font-medium">Date</th><th className="px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.ref + t.order} className="border-b border-silver/60 last:border-0 hover:bg-frost/60">
                <td className="px-4 py-3 font-mono text-xs font-semibold text-navy">{t.ref}</td>
                <td className="font-bold text-navy">{t.order}</td>
                <td className="text-navy/75">{t.customer}</td>
                <td className="text-navy/70">{t.method}</td>
                <td className="font-semibold text-navy">TZS {t.amount.toLocaleString()}</td>
                <td><StatusBadge status={t.status} /></td>
                <td className="text-xs text-navy/55">{t.date}</td>
                <td className="px-4">
                  {t.status === "Pending" ? (
                    <button onClick={() => verify(t.ref)} className="flex items-center gap-1 rounded-lg bg-emerald-500 px-2.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-600">
                      <CheckCircle2 className="size-3.5" /> Verify
                    </button>
                  ) : <span className="text-xs text-navy/40">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

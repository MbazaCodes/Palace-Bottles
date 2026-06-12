"use client";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { formatTZS } from "@/lib/constants";

export default function AdminPaymentsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orders, setOrders] = useState<any[]>([]);
  const [method, setMethod] = useState("All");
  const [status, setStatus] = useState("All");

  useEffect(() => { fetch("/api/orders").then((r) => r.json()).then((d) => setOrders(Array.isArray(d) ? d : [])).catch(() => {}); }, []);

  const pmMap: Record<string, string> = { mpesa: "M-Pesa", airtel_money: "Airtel Money", mixx_by_yas: "Mixx by Yas", halopesa: "HaloPesa", cash_on_delivery: "Cash on Delivery" };
  const psMap: Record<string, string> = { pending: "Pending", verified: "Verified", failed: "Failed" };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows = orders.filter((o: any) => (method === "All" || pmMap[o.payment_method] === method) && (status === "All" || psMap[o.payment_status] === status));

  const verify = async (id: string) => {
    await fetch("/api/orders", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ order_number: id, status: "confirmed" }) });
    setOrders(orders.map((o) => o.order_number === id ? { ...o, payment_status: "verified" } : o));
  };

  return (
    <>
      <h1 className="font-display text-2xl font-extrabold text-navy">Payments</h1>
      <p className="text-xs text-navy/50">Dashboard › Payments</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[["Total Payments", orders.length], ["Verified", orders.filter((o) => o.payment_status === "verified").length], ["Pending", orders.filter((o) => o.payment_status === "pending").length], ["Revenue", formatTZS(orders.reduce((t, o) => t + Number(o.subtotal ?? 0), 0))]].map(([l, v]) => (
          <div key={String(l)} className="rounded-2xl border border-silver bg-white p-4 shadow-card"><p className="text-xs text-navy/55">{l}</p><p className="font-display text-xl font-extrabold text-navy">{v}</p></div>
        ))}
      </div>

      <div className="mt-5 flex gap-3 rounded-2xl border border-silver bg-white p-4 shadow-card">
        <select value={method} onChange={(e) => setMethod(e.target.value)} className="rounded-xl border border-silver px-3 py-2 text-sm font-semibold text-navy outline-none">
          <option>All</option>{Object.values(pmMap).map((m) => <option key={m}>{m}</option>)}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-silver px-3 py-2 text-sm font-semibold text-navy outline-none">
          <option>All</option><option>Pending</option><option>Verified</option><option>Failed</option>
        </select>
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-silver bg-white shadow-card">
        <table className="w-full min-w-[40rem] text-sm">
          <thead><tr className="border-b border-silver text-left text-xs text-navy/50"><th className="px-4 py-3 font-medium">Order</th><th className="font-medium">Customer</th><th className="font-medium">Method</th><th className="font-medium">Amount</th><th className="font-medium">Payment Status</th><th className="font-medium">Date</th><th className="px-4 font-medium">Actions</th></tr></thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={7} className="px-4 py-8 text-center text-sm text-navy/55">No payments yet.</td></tr>}
            {rows.map((o) => (
              <tr key={o.order_number} className="border-b border-silver/60 last:border-0 hover:bg-frost/60">
                <td className="px-4 py-3 font-bold text-navy">{o.order_number}</td>
                <td className="text-navy/75">{o.customer?.full_name ?? "—"}</td>
                <td className="text-navy/70">{pmMap[o.payment_method] ?? o.payment_method}</td>
                <td className="font-semibold text-navy">{formatTZS(Number(o.subtotal))}</td>
                <td><StatusBadge status={psMap[o.payment_status] ?? o.payment_status} /></td>
                <td className="text-xs text-navy/55">{new Date(o.created_at).toLocaleString()}</td>
                <td className="px-4">{o.payment_status === "pending" ? <button onClick={() => verify(o.order_number)} className="flex items-center gap-1 rounded-lg bg-emerald-500 px-2.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-600"><CheckCircle2 className="size-3.5" /> Verify</button> : <span className="text-xs text-navy/40">—</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Truck, StickyNote } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";

export default function AdminShippingPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orders, setOrders] = useState<any[]>([]);
  const [tab, setTab] = useState("All");

  useEffect(() => { fetch("/api/orders").then((r) => r.json()).then((d) => setOrders(Array.isArray(d) ? d : [])).catch(() => {}); }, []);

  const TABS = ["All", "pending", "packed", "shipped", "delivered"];
  const visible = orders.filter((o) => tab === "All" || o.status === tab);
  const statusLabel = (s: string) => s?.charAt(0).toUpperCase() + s?.slice(1);

  const advance = async (orderNum: string, nextStatus: string) => {
    await fetch("/api/orders", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ order_number: orderNum, status: nextStatus }) });
    setOrders(orders.map((o) => o.order_number === orderNum ? { ...o, status: nextStatus } : o));
  };

  const nextStatus = (s: string) => {
    const flow = ["pending", "confirmed", "processing", "packed", "shipped", "delivered"];
    const i = flow.indexOf(s);
    return i < flow.length - 1 ? flow[i + 1] : null;
  };

  return (
    <>
      <h1 className="font-display text-2xl font-extrabold text-navy">Shipping</h1>
      <p className="text-xs text-navy/50">Dashboard › Shipping</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[["Total Orders", orders.length], ["Pending/Processing", orders.filter((o) => ["pending", "confirmed", "processing"].includes(o.status)).length], ["Shipped", orders.filter((o) => o.status === "shipped").length], ["Delivered", orders.filter((o) => o.status === "delivered").length]].map(([l, v]) => (
          <div key={String(l)} className="rounded-2xl border border-silver bg-white p-4 shadow-card"><p className="text-xs text-navy/55">{l}</p><p className="font-display text-xl font-extrabold text-navy">{v}</p></div>
        ))}
      </div>

      <div className="mt-5 flex gap-1 rounded-2xl border border-silver bg-white p-1.5 shadow-card">
        {TABS.map((t) => (<button key={t} onClick={() => setTab(t)} className={`rounded-xl px-4 py-2 text-sm font-semibold capitalize ${tab === t ? "bg-royal text-white" : "text-navy/60 hover:bg-frost"}`}>{t === "All" ? "All" : statusLabel(t)}</button>))}
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-silver bg-white shadow-card">
        <table className="w-full min-w-[40rem] text-sm">
          <thead><tr className="border-b border-silver text-left text-xs text-navy/50"><th className="px-4 py-3 font-medium">Order</th><th className="font-medium">Customer</th><th className="font-medium">Destination</th><th className="font-medium">Status</th><th className="font-medium">Date</th><th className="px-4 font-medium">Actions</th></tr></thead>
          <tbody>
            {visible.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-sm text-navy/55">No orders yet.</td></tr>}
            {visible.map((o) => {
              const ns = nextStatus(o.status);
              return (
                <tr key={o.order_number} className="border-b border-silver/60 last:border-0 hover:bg-frost/60">
                  <td className="px-4 py-3"><Link href={`/admin/orders/${o.order_number}`} className="font-bold text-navy hover:text-royal">{o.order_number}</Link></td>
                  <td className="text-navy/75">{o.customer?.full_name ?? "—"}</td>
                  <td className="text-navy/70">{o.region}, {o.district}</td>
                  <td><StatusBadge status={statusLabel(o.status)} /></td>
                  <td className="text-xs text-navy/55">{new Date(o.created_at).toLocaleString()}</td>
                  <td className="px-4">{ns && o.status !== "delivered" ? <button onClick={() => advance(o.order_number, ns)} className="flex items-center gap-1 rounded-lg bg-royal px-2.5 py-1.5 text-xs font-bold text-white hover:bg-royal-bright"><Truck className="size-3.5" /> Mark {statusLabel(ns)}</button> : <span className="text-xs text-navy/40">—</span>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

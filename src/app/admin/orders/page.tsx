"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Download, Plus, Search, Eye, Pencil, Filter, CheckCircle2, X } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { formatTZS } from "@/lib/constants";

const STATUSES = ["All Status", "pending", "confirmed", "processing", "packed", "shipped", "delivered", "cancelled"];
const METHODS = ["All Methods", "M-Pesa", "Airtel Money", "Mixx by Yas", "HaloPesa", "Cash on Delivery"];
const pmMap: Record<string, string> = { mpesa: "M-Pesa", airtel_money: "Airtel Money", mixx_by_yas: "Mixx by Yas", halopesa: "HaloPesa", cash_on_delivery: "Cash on Delivery" };
const statusLabel = (s: string) => s?.charAt(0).toUpperCase() + s?.slice(1);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OrderRow = any;

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All Status");
  const [method, setMethod] = useState("All Methods");
  const [verifyId, setVerifyId] = useState<string | null>(null);
  const [payRef, setPayRef] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/orders").then((r) => r.json()).then((d) => { setOrders(Array.isArray(d) ? d : []); setLoaded(true); }).catch(() => setLoaded(true));
  }, []);

  const rows = useMemo(() =>
    orders.filter((o) =>
      (status === "All Status" || o.status === status) &&
      (method === "All Methods" || pmMap[o.payment_method] === method) &&
      (!q || `${o.order_number} ${o.customer?.full_name ?? ""} ${o.customer?.phone ?? ""}`.toLowerCase().includes(q.toLowerCase()))
    ), [orders, q, status, method]);

  // Dynamic summary
  const summary = [
    { label: "All Orders", value: orders.length },
    { label: "Pending", value: orders.filter((o) => o.status === "pending").length },
    { label: "Processing", value: orders.filter((o) => o.status === "processing").length },
    { label: "Packed", value: orders.filter((o) => o.status === "packed").length },
    { label: "Shipped", value: orders.filter((o) => o.status === "shipped").length },
    { label: "Delivered", value: orders.filter((o) => o.status === "delivered").length },
    { label: "Cancelled", value: orders.filter((o) => o.status === "cancelled").length },
  ];

  const verifyPayment = async (orderNum: string) => {
    await fetch("/api/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order_number: orderNum, payment_status: "verified", payment_reference: payRef || `VRF-${Date.now()}` }),
    });
    setOrders(orders.map((o) => o.order_number === orderNum ? { ...o, payment_status: "verified", payment_reference: payRef || `VRF-${Date.now()}` } : o));
    setVerifyId(null);
    setPayRef("");
  };

  const initials = (n: string) => n?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() ?? "—";
  const colors = ["bg-blue-100 text-blue-700", "bg-rose-100 text-rose-700", "bg-emerald-100 text-emerald-700", "bg-violet-100 text-violet-700", "bg-amber-100 text-amber-700"];

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-navy">Orders</h1>
          <p className="text-xs text-navy/50">Dashboard › Orders</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-xl border border-silver bg-white px-4 py-2.5 text-sm font-semibold text-navy shadow-card"><Download className="size-4" /> Export</button>
        </div>
      </div>

      {/* Dynamic summary cards */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-7">
        {summary.map((s) => (
          <button key={s.label} onClick={() => setStatus(s.label === "All Orders" ? "All Status" : s.label.toLowerCase())}
            className={`rounded-2xl border bg-white p-3.5 text-left shadow-card transition-colors ${status === s.label.toLowerCase() || (s.label === "All Orders" && status === "All Status") ? "border-royal" : "border-silver"}`}>
            <p className="text-xs text-navy/55">{s.label}</p>
            <p className="font-display text-xl font-extrabold text-navy">{s.value}</p>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="mt-5 grid gap-3 rounded-2xl border border-silver bg-white p-4 shadow-card sm:grid-cols-2 lg:grid-cols-4">
        <label className="flex items-center gap-2 rounded-xl border border-silver bg-frost px-3 py-2.5">
          <Search className="size-4 text-navy/45" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by Order ID, Name or Phone..." className="w-full bg-transparent text-sm outline-none placeholder:text-navy/40" />
        </label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-silver bg-white px-3 py-2.5 text-sm font-semibold text-navy outline-none capitalize">
          {STATUSES.map((s) => <option key={s} value={s}>{s === "All Status" ? s : statusLabel(s)}</option>)}
        </select>
        <select value={method} onChange={(e) => setMethod(e.target.value)} className="rounded-xl border border-silver bg-white px-3 py-2.5 text-sm font-semibold text-navy outline-none">
          {METHODS.map((m) => <option key={m}>{m}</option>)}
        </select>
        <button className="flex items-center justify-center gap-2 rounded-xl border border-silver bg-frost px-4 py-2.5 text-sm font-semibold text-navy"><Filter className="size-4" /> Filters</button>
      </div>

      {/* Table */}
      <div className="mt-5 overflow-x-auto rounded-2xl border border-silver bg-white shadow-card">
        <table className="w-full min-w-[56rem] text-sm">
          <thead>
            <tr className="border-b border-silver text-left text-xs text-navy/50">
              <th className="px-4 py-3 font-medium">Order ID</th>
              <th className="font-medium">Customer</th>
              <th className="font-medium">Amount</th>
              <th className="font-medium">Payment</th>
              <th className="font-medium">Paid</th>
              <th className="font-medium">Status</th>
              <th className="font-medium">Date</th>
              <th className="px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loaded && <tr><td colSpan={8} className="px-4 py-8 text-center text-sm text-navy/55">Loading orders...</td></tr>}
            {loaded && rows.length === 0 && <tr><td colSpan={8} className="px-4 py-8 text-center text-sm text-navy/55">No orders yet.</td></tr>}
            {rows.map((o) => {
              const name = o.customer?.full_name ?? "—";
              const phone = o.customer?.phone ?? "";
              const isPaid = o.payment_status === "verified";
              return (
                <tr key={o.order_number ?? o.id} className="border-b border-silver/60 last:border-0 hover:bg-frost/60">
                  <td className="px-4 py-3.5">
                    <Link href={`/admin/orders/${o.order_number}`} className="font-bold text-navy hover:text-royal">{o.order_number}</Link>
                  </td>
                  <td>
                    <span className="flex items-center gap-2.5">
                      <span className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${colors[name.length % 5]}`}>{initials(name)}</span>
                      <span><span className="block font-semibold text-navy">{name}</span><span className="text-xs text-navy/50">{phone}</span></span>
                    </span>
                  </td>
                  <td className="font-semibold text-navy">{formatTZS(Number(o.subtotal))}<p className="text-xs font-normal text-navy/50">{pmMap[o.payment_method] ?? o.payment_method}</p></td>
                  <td><StatusBadge status={pmMap[o.payment_method] ?? o.payment_method} /></td>
                  <td>
                    {isPaid ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-600"><CheckCircle2 className="size-3.5" /> Paid</span>
                    ) : (
                      <button onClick={() => { setVerifyId(o.order_number); setPayRef(""); }}
                        className="rounded-lg bg-amber-100 px-2 py-1 text-[11px] font-bold text-amber-700 hover:bg-amber-200">
                        Unpaid — Verify
                      </button>
                    )}
                    {o.payment_reference && <p className="mt-0.5 text-[10px] text-navy/45">Ref: {o.payment_reference}</p>}
                  </td>
                  <td><StatusBadge status={statusLabel(o.status)} /></td>
                  <td className="text-xs text-navy/55">{new Date(o.created_at).toLocaleString()}</td>
                  <td className="px-4">
                    <span className="flex gap-1">
                      <Link href={`/admin/orders/${o.order_number}`} className="rounded-lg border border-silver p-1.5 hover:bg-frost"><Eye className="size-3.5 text-navy/60" /></Link>
                      <Link href={`/admin/orders/${o.order_number}`} className="rounded-lg border border-silver p-1.5 hover:bg-frost"><Pencil className="size-3.5 text-navy/60" /></Link>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="px-4 py-3 text-xs text-navy/55">{loaded ? `${rows.length} order${rows.length !== 1 ? "s" : ""}` : "Loading..."}</p>
      </div>

      {/* Payment verification modal */}
      {verifyId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-night/60 px-4 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) setVerifyId(null); }}>
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-float">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-navy">Verify Payment</h2>
              <button onClick={() => setVerifyId(null)} className="rounded-full p-1.5 hover:bg-frost"><X className="size-5 text-navy/50" /></button>
            </div>
            <p className="mt-2 text-sm text-navy/60">Confirm payment received for order <strong className="text-navy">{verifyId}</strong></p>
            <label className="mt-4 block text-sm font-semibold text-navy">
              Payment Reference / Transaction ID
              <input value={payRef} onChange={(e) => setPayRef(e.target.value)} placeholder="e.g. MP240612ABC123"
                className="mt-1 w-full rounded-xl border border-silver px-3.5 py-2.5 text-sm outline-none focus:border-royal" />
            </label>
            <button onClick={() => verifyPayment(verifyId)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-sm font-bold text-white hover:bg-emerald-600">
              <CheckCircle2 className="size-4" /> Mark as Paid
            </button>
          </div>
        </div>
      )}
    </>
  );
}

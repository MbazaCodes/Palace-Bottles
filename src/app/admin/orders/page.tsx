"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Download, Plus, Search, Eye, Pencil, MoreVertical, Filter } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { ADMIN_ORDERS, ORDER_STATUS_SUMMARY, type AdminOrder, type AdminOrderStatus } from "@/data/admin";
import { getAllOrders } from "@/lib/orders";

const STATUSES = ["All Status", "Pending", "Confirmed", "Processing", "Packed", "Shipped", "Delivered", "Cancelled"];
const METHODS = ["All Methods", "M-Pesa", "Airtel Money", "Mixx by Yas", "HaloPesa", "Cash on Delivery"];

export default function AdminOrdersPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All Status");
  const [method, setMethod] = useState("All Methods");
  const [liveOrders, setLiveOrders] = useState<AdminOrder[]>([]);

  useEffect(() => {
    setLiveOrders(
      getAllOrders().map((o, i) => ({
        id: o.id,
        seq: `#L${String(i + 1).padStart(3, "0")}`,
        customer: o.customer.fullName,
        phone: o.customer.phone,
        email: o.customer.email,
        amount: o.subtotal,
        payment: o.payment,
        paid: false,
        status: o.status as AdminOrderStatus,
        date: new Date(o.createdAt).toLocaleString(),
        region: o.delivery.region,
        district: o.delivery.district,
        address: o.delivery.address,
        items: o.items.map((it) => ({
          name: it.name, variant: `${it.capacity} / ${it.color}`, price: it.price, qty: it.qty,
          body: it.visual.body, accent: it.visual.accent, shape: it.visual.shape,
        })),
      }))
    );
  }, []);

  const rows = useMemo(
    () =>
      [...liveOrders, ...ADMIN_ORDERS].filter(
        (o) =>
          (status === "All Status" || o.status === status) &&
          (method === "All Methods" || o.payment === method) &&
          (q === "" || o.id.toLowerCase().includes(q.toLowerCase()) || o.customer.toLowerCase().includes(q.toLowerCase()) || o.phone.includes(q))
      ),
    [q, status, method, liveOrders]
  );

  const initials = (n: string) => n.split(" ").map((w) => w[0]).join("").slice(0, 2);
  const avatarColor = (n: string) => ["bg-blue-100 text-blue-700", "bg-rose-100 text-rose-700", "bg-emerald-100 text-emerald-700", "bg-violet-100 text-violet-700", "bg-amber-100 text-amber-700"][n.length % 5];

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-navy">Orders</h1>
          <p className="text-xs text-navy/50">Dashboard › Orders</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-xl border border-silver bg-white px-4 py-2.5 text-sm font-semibold text-navy shadow-card"><Download className="size-4" /> Export</button>
          <button className="flex items-center gap-2 rounded-xl bg-royal px-4 py-2.5 text-sm font-bold text-white hover:bg-royal-bright"><Plus className="size-4" /> New Order</button>
        </div>
      </div>

      {/* Status summary */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-7">
        {ORDER_STATUS_SUMMARY.map((s) => (
          <button key={s.label} onClick={() => setStatus(s.label === "All Orders" ? "All Status" : s.label)}
            className={`rounded-2xl border bg-white p-3.5 text-left shadow-card transition-colors ${status === s.label || (s.label === "All Orders" && status === "All Status") ? "border-royal" : "border-silver"}`}>
            <p className="text-xs text-navy/55">{s.label}</p>
            <p className="font-display text-xl font-extrabold text-navy">{s.value}</p>
            <p className={`text-[11px] font-semibold ${s.up ? "text-emerald-600" : "text-red-500"}`}>{s.delta} vs last week</p>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="mt-5 grid gap-3 rounded-2xl border border-silver bg-white p-4 shadow-card sm:grid-cols-2 lg:grid-cols-4">
        <label className="flex items-center gap-2 rounded-xl border border-silver bg-frost px-3 py-2.5">
          <Search className="size-4 text-navy/45" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by Order ID, Name or Phone..." aria-label="Search orders"
            className="w-full bg-transparent text-sm outline-none placeholder:text-navy/40" />
        </label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status"
          className="rounded-xl border border-silver bg-white px-3 py-2.5 text-sm font-semibold text-navy outline-none">
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select value={method} onChange={(e) => setMethod(e.target.value)} aria-label="Filter by payment method"
          className="rounded-xl border border-silver bg-white px-3 py-2.5 text-sm font-semibold text-navy outline-none">
          {METHODS.map((m) => <option key={m}>{m}</option>)}
        </select>
        <button className="flex items-center justify-center gap-2 rounded-xl border border-silver bg-frost px-4 py-2.5 text-sm font-semibold text-navy"><Filter className="size-4" /> Filters</button>
      </div>

      {/* Table */}
      <div className="mt-5 overflow-x-auto rounded-2xl border border-silver bg-white shadow-card">
        <table className="w-full min-w-[52rem] text-sm">
          <thead>
            <tr className="border-b border-silver text-left text-xs text-navy/50">
              <th className="px-4 py-3 font-medium">Order ID</th>
              <th className="font-medium">Customer</th>
              <th className="font-medium">Amount</th>
              <th className="font-medium">Payment</th>
              <th className="font-medium">Status</th>
              <th className="font-medium">Date</th>
              <th className="px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((o) => (
              <tr key={o.id} className="border-b border-silver/60 last:border-0 hover:bg-frost/60">
                <td className="px-4 py-3.5">
                  <Link href={`/admin/orders/${o.id}`} className="font-bold text-navy hover:text-royal">{o.id}</Link>
                  <p className="text-xs text-navy/45">{o.seq}{o.seq.startsWith("#L") && <span className="ml-1.5 rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700">LIVE</span>}</p>
                </td>
                <td>
                  <span className="flex items-center gap-2.5">
                    <span className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${avatarColor(o.customer)}`}>{initials(o.customer)}</span>
                    <span><span className="block font-semibold text-navy">{o.customer}</span><span className="text-xs text-navy/50">{o.phone}</span></span>
                  </span>
                </td>
                <td className="font-semibold text-navy">TZS {o.amount.toLocaleString()}<p className="text-xs font-normal text-navy/50">{o.payment}</p></td>
                <td><StatusBadge status={o.paid ? "Paid" : "Unpaid"} /></td>
                <td><StatusBadge status={o.status} /></td>
                <td className="text-xs text-navy/55">{o.date}</td>
                <td className="px-4">
                  <span className="flex gap-1">
                    <Link href={`/admin/orders/${o.id}`} aria-label={`View ${o.id}`} className="rounded-lg border border-silver p-1.5 hover:bg-frost"><Eye className="size-3.5 text-navy/60" /></Link>
                    <Link href={`/admin/orders/${o.id}`} aria-label={`Edit ${o.id}`} className="rounded-lg border border-silver p-1.5 hover:bg-frost"><Pencil className="size-3.5 text-navy/60" /></Link>
                    <button aria-label="More actions" className="rounded-lg border border-silver p-1.5 hover:bg-frost"><MoreVertical className="size-3.5 text-navy/60" /></button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="px-4 py-3 text-xs text-navy/55">Showing 1 to {rows.length} of 356 orders</p>
      </div>
    </>
  );
}

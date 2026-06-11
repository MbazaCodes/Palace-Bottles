"use client";
import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Printer, MoreVertical, Copy, Check, CheckCircle2, Settings, Package, Truck, CircleCheck, XCircle, Pencil } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import Bottle3D from "@/components/ui/Bottle3D";
import { ADMIN_ORDERS, type AdminOrderStatus } from "@/data/admin";

const FLOW: AdminOrderStatus[] = ["Pending", "Confirmed", "Processing", "Packed", "Shipped", "Delivered"];
const ACTIONS: { status: AdminOrderStatus; label: string; icon: typeof Check }[] = [
  { status: "Confirmed", label: "Confirm Order", icon: CheckCircle2 },
  { status: "Processing", label: "Mark Processing", icon: Settings },
  { status: "Packed", label: "Mark Packed", icon: Package },
  { status: "Shipped", label: "Mark Shipped", icon: Truck },
  { status: "Delivered", label: "Mark Delivered", icon: CircleCheck },
];

export default function AdminOrderDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const order = ADMIN_ORDERS.find((o) => o.id === id);
  const [status, setStatus] = useState<AdminOrderStatus>(order?.status ?? "Pending");
  if (!order) notFound();

  const idx = FLOW.indexOf(status);

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-navy">Order Details</h1>
          <p className="text-xs text-navy/50"><Link href="/admin" className="hover:text-royal">Dashboard</Link> › <Link href="/admin/orders" className="hover:text-royal">Orders</Link> › Order Details</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="flex items-center gap-2 rounded-xl border border-silver bg-white px-4 py-2.5 text-sm font-semibold text-navy shadow-card"><Printer className="size-4" /> Print Invoice</button>
          <button className="flex items-center gap-2 rounded-xl border border-silver bg-white px-4 py-2.5 text-sm font-semibold text-navy shadow-card"><MoreVertical className="size-4" /> More Actions</button>
        </div>
      </div>

      {/* Header summary + stepper */}
      <div className="mt-6 grid gap-4 xl:grid-cols-[1fr_1.2fr]">
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-silver bg-white p-5 shadow-card sm:grid-cols-4 xl:grid-cols-2 2xl:grid-cols-4">
          <div>
            <p className="text-xs text-navy/55">Order ID</p>
            <p className="flex items-center gap-1.5 font-display text-lg font-bold text-navy">{order.id}
              <button onClick={() => navigator.clipboard?.writeText(order.id)} aria-label="Copy order ID"><Copy className="size-3.5 text-navy/40" /></button>
            </p>
            <StatusBadge status={status} />
            <p className="mt-1 text-[11px] text-navy/45">Placed on {order.date}</p>
          </div>
          <div>
            <p className="text-xs text-navy/55">Payment</p>
            <p className="font-semibold text-navy">{order.payment} <StatusBadge status={order.paid ? "Paid" : "Unpaid"} /></p>
            {order.paid && <p className="text-[11px] text-navy/45">Ref: 123456789012</p>}
          </div>
          <div>
            <p className="text-xs text-navy/55">Total Amount</p>
            <p className="font-display text-lg font-bold text-navy">TZS {order.amount.toLocaleString()}</p>
            <p className="text-[11px] text-navy/45">Items: {order.items.length}</p>
          </div>
          <div>
            <p className="text-xs text-navy/55">Customer</p>
            <p className="font-semibold text-navy">{order.customer}</p>
            <p className="text-[11px] text-navy/45">{order.phone}</p>
            {order.email && <p className="break-all text-[11px] text-navy/45">{order.email}</p>}
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-silver bg-white p-5 shadow-card">
          <ol className="flex min-w-[30rem] items-center" aria-label="Order progress">
            {FLOW.map((s, i) => {
              const done = i < idx, current = i === idx;
              return (
                <li key={s} className="flex flex-1 items-center last:flex-none">
                  <div className="flex flex-col items-center">
                    <span className={`flex size-9 items-center justify-center rounded-full border-2 ${current ? "border-amber-400 bg-amber-400 text-white" : done ? "border-emerald-500 bg-emerald-500 text-white" : "border-silver bg-frost text-navy/40"}`}>
                      <Check className="size-4" />
                    </span>
                    <span className={`mt-1.5 text-[10px] font-semibold ${done || current ? "text-navy" : "text-navy/45"}`}>{s}</span>
                  </div>
                  {i < FLOW.length - 1 && <span className={`mx-1 mb-4 h-0.5 flex-1 border-t-2 border-dashed ${i < idx ? "border-emerald-400" : "border-silver"}`} aria-hidden />}
                </li>
              );
            })}
          </ol>
          <p className="mt-2 text-xs text-navy/55">{status === "Pending" ? "Order is waiting for confirmation." : status === "Delivered" ? "Order delivered successfully." : `Order is ${status.toLowerCase()}.`}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_1fr_1fr]">
        {/* Items */}
        <div className="rounded-2xl border border-silver bg-white p-5 shadow-card">
          <h2 className="font-display text-base font-bold text-navy">Order Items ({order.items.length})</h2>
          <table className="mt-3 w-full text-sm">
            <thead><tr className="text-left text-xs text-navy/50"><th className="py-2 font-medium">Product</th><th className="font-medium">Price</th><th className="font-medium">Qty</th><th className="text-right font-medium">Total</th></tr></thead>
            <tbody>
              {order.items.map((it) => (
                <tr key={it.name} className="border-t border-silver/60">
                  <td className="py-3">
                    <span className="flex items-center gap-2.5">
                      <span className="w-9 shrink-0 rounded-lg bg-frost p-1"><Bottle3D body={it.body} accent={it.accent} shape={it.shape} label={false} /></span>
                      <span><span className="block font-semibold text-navy">{it.name}</span><span className="text-xs text-navy/50">{it.variant}</span></span>
                    </span>
                  </td>
                  <td>TZS {it.price.toLocaleString()}</td>
                  <td>{it.qty}</td>
                  <td className="text-right font-semibold text-navy">TZS {(it.price * it.qty).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3 space-y-1.5 border-t border-silver pt-3 text-sm">
            <div className="flex justify-between"><span className="text-navy/55">Subtotal</span><span>TZS {order.amount.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-navy/55">Delivery Fee</span><span>TZS 0</span></div>
            <div className="flex justify-between font-bold text-navy"><span>Total Amount</span><span className="font-display text-lg">TZS {order.amount.toLocaleString()}</span></div>
          </div>
        </div>

        {/* Delivery */}
        <div className="rounded-2xl border border-silver bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-navy">Delivery Information</h2>
            <button className="flex items-center gap-1 rounded-lg border border-silver px-2.5 py-1.5 text-xs font-semibold text-navy"><Pencil className="size-3" /> Edit</button>
          </div>
          <dl className="mt-4 space-y-3.5 text-sm">
            {[["Recipient Name", order.customer], ["Phone Number", order.phone], ["Address", order.address], ["Region", order.region], ["District", order.district], ["Delivery Method", "Standard Delivery"]].map(([t, v]) => (
              <div key={t}><dt className="text-xs text-navy/50">{t}</dt><dd className="font-semibold text-navy">{v}</dd></div>
            ))}
          </dl>
        </div>

        {/* Payment + notes */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-silver bg-white p-5 shadow-card">
            <h2 className="font-display text-base font-bold text-navy">Payment Information</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-navy/55">Method</dt><dd className="font-semibold text-navy">{order.payment}</dd></div>
              <div className="flex justify-between"><dt className="text-navy/55">Payment Status</dt><dd><StatusBadge status={order.paid ? "Paid" : "Unpaid"} /></dd></div>
              <div className="flex justify-between"><dt className="text-navy/55">Amount {order.paid ? "Paid" : "Due"}</dt><dd className="font-semibold text-navy">TZS {order.amount.toLocaleString()}</dd></div>
            </dl>
          </div>
          <div className="rounded-2xl border border-silver bg-white p-5 shadow-card">
            <h2 className="font-display text-base font-bold text-navy">Order Notes</h2>
            <p className="mt-2 text-xs text-navy/50">Customer Note</p>
            <p className="text-sm text-navy">{order.note ?? "—"}</p>
            <p className="mt-3 text-xs text-navy/50">Admin Note</p>
            <p className="text-sm text-navy">—</p>
          </div>
        </div>
      </div>

      {/* Update status */}
      <div className="mt-5 rounded-2xl border border-silver bg-white p-5 shadow-card">
        <h2 className="font-display text-base font-bold text-navy">Update Order Status</h2>
        <p className="text-xs text-navy/55">Update the status of this order</p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {ACTIONS.map((a) => {
            const next = FLOW.indexOf(a.status) === idx + 1;
            const done = FLOW.indexOf(a.status) <= idx;
            return (
              <button key={a.status} onClick={() => setStatus(a.status)} disabled={done || status === "Cancelled"}
                className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-xs font-bold transition-colors disabled:opacity-40 ${next ? "border-amber-400 bg-amber-50 text-amber-700" : "border-silver bg-white text-navy hover:border-royal"}`}>
                <a.icon className="size-5" /> {a.label}
              </button>
            );
          })}
        </div>
        <button onClick={() => setStatus("Cancelled")} disabled={status === "Delivered" || status === "Cancelled"}
          className="mt-4 flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 disabled:opacity-40">
          <XCircle className="size-4" /> Cancel Order
        </button>
        <p className="mt-2 text-xs text-navy/45">Demo mode: status changes are local. Phase 4 connects this to Supabase.</p>
      </div>
    </>
  );
}

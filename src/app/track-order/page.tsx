"use client";
import { Suspense, useState } from "react";
import { PackageSearch, Check, Clock, Phone, MapPin } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Bottle3D from "@/components/ui/Bottle3D";
import { getOrder, DEMO_ORDER, type Order } from "@/lib/orders";
import { formatTZS, ORDER_STATUSES, BRAND } from "@/lib/constants";

function TrackOrderInner() {
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);

  const track = (e: React.FormEvent) => {
    e.preventDefault();
    const found = query.trim().toUpperCase() === DEMO_ORDER.id ? DEMO_ORDER : getOrder(query.trim());
    setOrder(found ?? null);
    setNotFound(!found);
  };

  const statusIdx = order ? ORDER_STATUSES.indexOf(order.status) : -1;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* Search */}
      <form onSubmit={track} className="flex flex-col gap-4 rounded-2xl border border-silver bg-white p-6 shadow-card sm:flex-row sm:items-center">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-ice text-navy"><PackageSearch className="size-6" /></span>
        <div className="flex-1">
          <label htmlFor="orderId" className="text-sm font-bold text-navy">Enter your Order ID</label>
          <input id="orderId" value={query} onChange={(e) => { setQuery(e.target.value); setNotFound(false); }}
            placeholder="e.g. PB785291"
            className="mt-1 w-full rounded-xl border border-silver px-3.5 py-3 text-sm outline-none focus:border-royal" />
          <p className="mt-1 text-xs text-navy/50">You can find your Order ID in the confirmation message we sent you. Try PB785291 for a demo.</p>
        </div>
        <button className="rounded-xl bg-royal px-6 py-3.5 text-sm font-bold text-white hover:bg-royal-bright">Track Order</button>
      </form>

      {notFound && (
        <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
          No order found with that ID. Check the ID and try again, or message us on WhatsApp for help.
        </p>
      )}

      {order && (
        <div className="mt-8 space-y-6">
          {/* Header card */}
          <div className="grid gap-4 rounded-2xl border border-silver bg-white p-6 shadow-card sm:grid-cols-4">
            <div><p className="text-xs text-navy/55">Order ID</p><p className="font-display text-lg font-bold text-navy">{order.id}</p></div>
            <div><p className="text-xs text-navy/55">Order Date</p><p className="text-sm font-semibold text-navy">{new Date(order.createdAt).toLocaleString()}</p></div>
            <div><p className="text-xs text-navy/55">Payment Method</p><p className="text-sm font-semibold text-navy">{order.payment}</p></div>
            <div><p className="text-xs text-navy/55">Status</p>
              <span className="inline-block rounded-md bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700">{order.status}</span>
            </div>
          </div>

          {/* Status stepper */}
          <div className="overflow-x-auto rounded-2xl border border-silver bg-white p-6 shadow-card">
            <ol className="flex min-w-[34rem] items-center" aria-label="Order progress">
              {ORDER_STATUSES.map((s, i) => {
                const done = i <= statusIdx;
                const current = i === statusIdx;
                return (
                  <li key={s} className="flex flex-1 items-center last:flex-none">
                    <div className="flex flex-col items-center">
                      <span className={`flex size-10 items-center justify-center rounded-full border-2 ${current ? "border-royal bg-royal text-white" : done ? "border-emerald-500 bg-emerald-500 text-white" : "border-silver bg-frost text-navy/40"}`}>
                        {done && !current ? <Check className="size-4" /> : current ? <Clock className="size-4" /> : <span className="text-xs">{i + 1}</span>}
                      </span>
                      <span className={`mt-2 text-[11px] font-semibold ${done ? "text-navy" : "text-navy/45"}`}>{s}</span>
                    </div>
                    {i < ORDER_STATUSES.length - 1 && <span className={`mx-1 mb-5 h-0.5 flex-1 ${i < statusIdx ? "bg-emerald-400" : "bg-silver"}`} aria-hidden />}
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Items */}
            <div className="rounded-2xl border border-silver bg-white p-6 shadow-card">
              <h2 className="font-display text-lg font-bold text-navy">Order Summary</h2>
              <ul className="mt-4 space-y-3">
                {order.items.map((it, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-10 shrink-0 rounded-lg bg-frost p-1"><Bottle3D {...it.visual} label={false} /></div>
                    <div className="flex-1">
                      <p className="font-semibold text-navy">{it.name}</p>
                      <p className="text-xs text-navy/55">{it.capacity} · {it.color} · Qty {it.qty}</p>
                    </div>
                    <span className="font-semibold">{formatTZS(it.price * it.qty)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 space-y-1.5 border-t border-silver pt-3 text-sm">
                <div className="flex justify-between"><span className="text-navy/60">Subtotal</span><span>{formatTZS(order.subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-navy/60">Delivery</span><span className="text-navy/60">To be confirmed</span></div>
                <div className="flex justify-between font-bold text-navy"><span>Total</span><span className="font-display text-lg">{formatTZS(order.subtotal)}</span></div>
              </div>
              <p className="mt-3 rounded-lg bg-ice/60 px-3 py-2 text-xs text-navy/70">Our team will contact you to confirm delivery charges and details.</p>
            </div>

            {/* Delivery + help */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-silver bg-white p-6 shadow-card">
                <h2 className="font-display text-lg font-bold text-navy">Delivery Information</h2>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-royal" /><div><dt className="text-xs text-navy/55">Region / District</dt><dd className="font-semibold text-navy">{order.delivery.region}, {order.delivery.district}</dd></div></div>
                  <div className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-royal" /><div><dt className="text-xs text-navy/55">Address</dt><dd className="font-semibold text-navy">{order.delivery.address}</dd></div></div>
                  <div className="flex gap-2"><Phone className="mt-0.5 size-4 shrink-0 text-royal" /><div><dt className="text-xs text-navy/55">Phone</dt><dd className="font-semibold text-navy">{order.customer.phone}</dd></div></div>
                </dl>
              </div>
              <div className="glass-navy rounded-2xl p-6 text-white">
                <h2 className="font-display text-lg font-bold">Need Help?</h2>
                <p className="mt-1 text-sm text-white/70">Our support team is ready to assist you.</p>
                <a href={`https://wa.me/${BRAND.phoneRaw}?text=Hello!%20I%20need%20help%20with%20order%20${order.id}`} target="_blank" rel="noopener noreferrer"
                  className="mt-4 block rounded-xl bg-[#25D366] py-3 text-center text-sm font-bold hover:brightness-105">Chat on WhatsApp</a>
                <a href={`tel:${BRAND.phoneRaw}`} className="mt-2 block rounded-xl border border-white/25 py-3 text-center text-sm font-bold hover:bg-white/10">Call Us: {BRAND.phone}</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <>
      <PageHero
        title="Track Your Order"
        subtitle="Enter your Order ID to check the latest status of your order in real time."
        crumbs={[["Home", "/"], ["Track Order", "/track-order"]]}
      />
      <Suspense><TrackOrderInner /></Suspense>
    </>
  );
}

"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Copy, Smartphone, Banknote } from "lucide-react";
import { BRAND, formatTZS } from "@/lib/constants";
import { trackOrder, type Order } from "@/lib/orders";

function Inner() {
  const id = useSearchParams().get("id") ?? "—";
  const [order, setOrder] = useState<Order | undefined>(undefined);
  useEffect(() => { trackOrder(id).then((o) => { if (o) setOrder(o); }); }, [id]);

  const isCod = order?.payment === "Cash on Delivery";

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <CheckCircle2 className="mx-auto size-16 text-emerald-500" />
      <h1 className="mt-4 font-display text-3xl font-extrabold text-navy">Order Placed!</h1>
      <p className="mt-2 text-sm text-navy/65">Thank you for shopping with Palace Bottles.</p>

      <div className="mt-6 rounded-2xl border border-silver bg-white p-6 shadow-card">
        <p className="text-xs uppercase tracking-wide text-navy/55">Your Order ID</p>
        <p className="mt-1 flex items-center justify-center gap-2 font-display text-2xl font-bold text-navy">
          {id}
          <button onClick={() => navigator.clipboard?.writeText(id)} aria-label="Copy order ID" className="rounded-lg p-1.5 text-navy/50 hover:bg-frost"><Copy className="size-4" /></button>
        </p>
        {order && (
          <p className="mt-1 text-sm text-navy/65">{order.payment} · Total {formatTZS(order.subtotal)} <span className="text-navy/45">+ delivery</span></p>
        )}
        <p className="mt-3 text-sm text-navy/65">Palace Bottles team will contact you to confirm delivery costs.</p>
      </div>

      {/* Payment instructions */}
      <div className="mt-4 rounded-2xl border border-silver bg-white p-6 text-left shadow-card">
        <h2 className="flex items-center justify-center gap-2 font-display text-base font-bold text-navy">
          {isCod ? <Banknote className="size-4" /> : <Smartphone className="size-4" />} How to Pay
        </h2>
        {isCod ? (
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-navy/70">
            <li>Keep your phone reachable — our team will call to confirm your order and delivery fee.</li>
            <li>Prepare the total amount in cash.</li>
            <li>Pay the delivery agent when your bottles arrive. Karibu!</li>
          </ol>
        ) : (
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-navy/70">
            <li>Our team will send the official {order?.payment ?? "mobile money"} payment number on WhatsApp/SMS after confirming your delivery fee.</li>
            <li>Send the total amount and keep the transaction reference.</li>
            <li>Reply with the reference — we verify and start processing right away.</li>
          </ol>
        )}
        <p className="mt-3 rounded-xl bg-ice/60 px-3 py-2 text-xs text-navy/60">
          For your safety, only pay numbers confirmed by Palace Bottles on {BRAND.phone}.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link href="/track-order" className="rounded-xl bg-royal px-6 py-3 text-sm font-bold text-white hover:bg-royal-bright">Track This Order</Link>
        <a href={`https://wa.me/${BRAND.phoneRaw}?text=Hello!%20I%20just%20placed%20order%20${id}`} target="_blank" rel="noopener noreferrer"
          className="rounded-xl border border-silver bg-white px-6 py-3 text-sm font-bold text-navy hover:bg-frost">Confirm on WhatsApp</a>
      </div>
      <Link href="/shop" className="mt-4 inline-block text-sm font-semibold text-navy/55 hover:text-royal">Continue shopping →</Link>
    </div>
  );
}

export default function OrderConfirmedPage() {
  return <Suspense><Inner /></Suspense>;
}

"use client";
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Copy } from "lucide-react";
import { BRAND } from "@/lib/constants";

function Inner() {
  const id = useSearchParams().get("id") ?? "—";
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <CheckCircle2 className="mx-auto size-16 text-emerald-500" />
      <h1 className="mt-4 font-display text-3xl font-extrabold text-navy">Order Placed!</h1>
      <p className="mt-2 text-sm text-navy/65">Thank you for shopping with Palace Bottles.</p>

      <div className="mt-6 rounded-2xl border border-silver bg-white p-6 shadow-card">
        <p className="text-xs uppercase tracking-wide text-navy/55">Your Order ID</p>
        <p className="mt-1 flex items-center justify-center gap-2 font-display text-2xl font-bold text-navy">
          {id}
          <button onClick={() => navigator.clipboard?.writeText(id)} aria-label="Copy order ID" className="rounded-lg p-1.5 text-navy/50 hover:bg-frost"><Copy className="size-4" /></button>
        </p>
        <p className="mt-3 text-sm text-navy/65">Palace Bottles team will contact you to confirm delivery costs.</p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link href={`/track-order`} className="rounded-xl bg-royal px-6 py-3 text-sm font-bold text-white hover:bg-royal-bright">Track This Order</Link>
        <a href={`https://wa.me/${BRAND.phoneRaw}?text=Hello!%20I%20just%20placed%20order%20${id}`} target="_blank" rel="noopener noreferrer"
          className="rounded-xl border border-silver bg-white px-6 py-3 text-sm font-bold text-navy hover:bg-frost">Confirm on WhatsApp</a>
      </div>
    </div>
  );
}

export default function OrderConfirmedPage() {
  return <Suspense><Inner /></Suspense>;
}

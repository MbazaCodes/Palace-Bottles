"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck } from "lucide-react";
import { useCart, cartSubtotal, itemKey } from "@/store/cart";
import { formatTZS, TZ_REGIONS, PAYMENT_METHODS } from "@/lib/constants";
import { createOrder } from "@/lib/orders";
import Bottle3D from "@/components/ui/Bottle3D";

const schema = z.object({
  fullName: z.string().min(3, "Enter your full name"),
  phone: z.string().regex(/^(\+255|0)[67]\d{8}$/, "Enter a valid Tanzanian phone number"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  region: z.string().min(2, "Select your region"),
  district: z.string().min(2, "Enter your district"),
  address: z.string().min(4, "Enter your delivery address"),
  payment: z.enum(PAYMENT_METHODS),
});

type FormData = z.infer<typeof schema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clear } = useCart();
  const subtotal = cartSubtotal(items);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { payment: "M-Pesa" },
  });

  const onSubmit = (data: FormData) => {
    const order = createOrder(data, items, subtotal);
    clear();
    router.push(`/order-confirmed?id=${order.id}`);
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-extrabold text-navy">Your cart is empty</h1>
        <p className="mt-2 text-sm text-navy/60">Add a few bottles before checking out.</p>
        <Link href="/shop" className="mt-6 inline-block rounded-xl bg-royal px-6 py-3 text-sm font-bold text-white hover:bg-royal-bright">Shop now</Link>
      </div>
    );
  }

  const input = "mt-1 w-full rounded-xl border border-silver bg-white px-3.5 py-3 text-sm outline-none focus:border-royal";
  const err = (m?: string) => m && <p className="mt-1 text-xs text-red-600">{m}</p>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="font-display text-3xl font-extrabold text-navy">Checkout</h1>
      <p className="mt-1 text-sm text-navy/60">Guest checkout — no account needed.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-8 lg:grid-cols-[1fr_24rem]">
        <div className="space-y-8">
          <section className="rounded-2xl border border-silver bg-white p-6 shadow-card">
            <h2 className="font-display text-lg font-bold text-navy">Customer Details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-navy">Full Name *
                <input {...register("fullName")} className={input} placeholder="e.g. Juma Mwinyi" />
                {err(errors.fullName?.message)}
              </label>
              <label className="text-sm font-semibold text-navy">Phone Number *
                <input {...register("phone")} className={input} placeholder="+255 7XX XXX XXX" inputMode="tel" />
                {err(errors.phone?.message)}
              </label>
              <label className="text-sm font-semibold text-navy sm:col-span-2">Email (optional)
                <input {...register("email")} className={input} placeholder="you@example.com" inputMode="email" />
                {err(errors.email?.message)}
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-silver bg-white p-6 shadow-card">
            <h2 className="font-display text-lg font-bold text-navy">Delivery Details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-navy">Region *
                <select {...register("region")} className={input} defaultValue="">
                  <option value="" disabled>Select region</option>
                  {TZ_REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
                {err(errors.region?.message)}
              </label>
              <label className="text-sm font-semibold text-navy">District *
                <input {...register("district")} className={input} placeholder="e.g. Kinondoni" />
                {err(errors.district?.message)}
              </label>
              <label className="text-sm font-semibold text-navy sm:col-span-2">Address *
                <input {...register("address")} className={input} placeholder="Street, landmark or building" />
                {err(errors.address?.message)}
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-silver bg-white p-6 shadow-card">
            <h2 className="font-display text-lg font-bold text-navy">Payment Method</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {PAYMENT_METHODS.map((m) => (
                <label key={m} className="flex cursor-pointer items-center gap-3 rounded-xl border border-silver px-4 py-3.5 text-sm font-semibold text-navy has-checked:border-royal has-checked:bg-ice/60">
                  <input type="radio" value={m} {...register("payment")} className="accent-royal" />
                  {m}
                  {m === "Cash on Delivery" && <span className="ml-auto text-[10px] font-normal text-navy/50">where available</span>}
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-2xl border border-silver bg-white p-6 shadow-card lg:sticky lg:top-24">
          <h2 className="font-display text-lg font-bold text-navy">Order Summary</h2>
          <ul className="mt-4 space-y-3">
            {items.map((i) => (
              <li key={itemKey(i)} className="flex items-center gap-3 text-sm">
                <div className="w-10 shrink-0 rounded-lg bg-frost p-1"><Bottle3D {...i.product.visual} label={false} /></div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-navy">{i.product.name}</p>
                  <p className="text-xs text-navy/55">{i.capacity} · {i.color} · Qty {i.qty}</p>
                </div>
                <span className="font-semibold text-navy">{formatTZS(i.product.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-2 border-t border-silver pt-4 text-sm">
            <div className="flex justify-between"><span className="text-navy/60">Subtotal</span><span className="font-semibold">{formatTZS(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-navy/60">Delivery</span><span className="text-navy/60">To be confirmed</span></div>
            <div className="flex justify-between pt-1"><span className="font-bold text-navy">Total</span><span className="font-display text-xl font-bold text-navy">{formatTZS(subtotal)}</span></div>
          </div>
          <button type="submit" disabled={isSubmitting}
            className="mt-5 w-full rounded-xl bg-royal py-3.5 text-sm font-bold text-white hover:bg-royal-bright disabled:opacity-50">
            Place Order
          </button>
          <p className="mt-3 flex items-start gap-1.5 text-xs text-navy/55">
            <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-royal" />
            Palace Bottles team will contact you to confirm delivery costs.
          </p>
        </aside>
      </form>
    </div>
  );
}

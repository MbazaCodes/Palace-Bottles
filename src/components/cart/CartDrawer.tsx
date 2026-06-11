"use client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2, Tag, ShoppingBag } from "lucide-react";
import { useCart, cartSubtotal, itemKey } from "@/store/cart";
import { formatTZS } from "@/lib/constants";
import Bottle3D from "@/components/ui/Bottle3D";

export default function CartDrawer() {
  const { items, open, setOpen, setQty, remove, coupon, setCoupon } = useCart();
  const subtotal = cartSubtotal(items);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-navy-night/60 backdrop-blur-sm"
            aria-hidden
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28 }}
            className="fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col bg-white shadow-float"
            role="dialog" aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-silver px-5 py-4">
              <h2 className="font-display text-lg font-bold text-navy">Your Cart ({items.length})</h2>
              <button onClick={() => setOpen(false)} aria-label="Close cart" className="rounded-full p-2 hover:bg-frost">
                <X className="size-5 text-navy" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <ShoppingBag className="size-12 text-silver" />
                <p className="text-sm text-navy/60">Your cart is empty. Find a bottle worth keeping.</p>
                <Link href="/shop" onClick={() => setOpen(false)} className="rounded-xl bg-royal px-5 py-2.5 text-sm font-semibold text-white hover:bg-royal-bright">
                  Shop now
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
                  {items.map((i) => {
                    const key = itemKey(i);
                    return (
                      <li key={key} className="flex gap-3 rounded-2xl border border-silver p-3">
                        <div className="w-16 shrink-0 rounded-xl bg-frost p-1">
                          <Bottle3D {...i.product.visual} label={false} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-navy">{i.product.name}</p>
                          <p className="text-xs text-navy/55">{i.capacity} · {i.color}</p>
                          <p className="mt-1 text-sm font-bold text-navy">{formatTZS(i.product.price)}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <button onClick={() => setQty(key, i.qty - 1)} aria-label="Decrease quantity" className="rounded-lg border border-silver p-1 hover:bg-frost"><Minus className="size-3.5" /></button>
                            <span className="w-6 text-center text-sm font-semibold">{i.qty}</span>
                            <button onClick={() => setQty(key, i.qty + 1)} aria-label="Increase quantity" className="rounded-lg border border-silver p-1 hover:bg-frost"><Plus className="size-3.5" /></button>
                            <button onClick={() => remove(key)} aria-label="Remove item" className="ml-auto rounded-lg p-1.5 text-red-500 hover:bg-red-50"><Trash2 className="size-4" /></button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="border-t border-silver px-5 py-4">
                  <div className="flex items-center gap-2 rounded-xl border border-silver px-3 py-2">
                    <Tag className="size-4 text-navy/50" />
                    <input
                      value={coupon} onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Coupon code" aria-label="Coupon code"
                      className="w-full text-sm outline-none placeholder:text-navy/40"
                    />
                    <button className="text-sm font-semibold text-royal">Apply</button>
                  </div>
                  <div className="mt-3 flex justify-between text-sm">
                    <span className="text-navy/60">Estimated total</span>
                    <span className="font-display text-lg font-bold text-navy">{formatTZS(subtotal)}</span>
                  </div>
                  <p className="mt-1 text-xs text-navy/50">Delivery charges are confirmed after order placement.</p>
                  <Link href="/checkout" onClick={() => setOpen(false)} className="mt-3 block rounded-xl bg-royal py-3 text-center text-sm font-bold text-white hover:bg-royal-bright">
                    Checkout
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

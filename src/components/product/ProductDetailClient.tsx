"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingCart, Zap, Minus, Plus, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import type { Product, Capacity } from "@/data/products";
import { formatTZS, BRAND } from "@/lib/constants";
import { useCart } from "@/store/cart";
import Bottle3D from "@/components/ui/Bottle3D";
import Stars from "@/components/ui/Stars";
import ProductCard from "@/components/product/ProductCard";

export default function ProductDetailClient({ product, related }: { product: Product; related: Product[] }) {
  const router = useRouter();
  const add = useCart((s) => s.add);
  const [color, setColor] = useState(product.colors[0]);
  const [capacity, setCapacity] = useState<Capacity>(product.capacity);
  const [qty, setQty] = useState(1);
  const [view, setView] = useState(0);

  const lowStock = product.stock <= 15;
  const visual = { ...product.visual, body: color.hex };
  const views = [0, 1, 2]; // angle variations

  const waText = encodeURIComponent(`Hello Palace Bottles! I'm interested in the ${product.name} (${capacity}, ${color.name}). Is it available?`);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <motion.div key={`${color.hex}-${view}`} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}
            className="rounded-3xl bg-gradient-to-b from-ice/60 via-frost to-silver/60 p-10 shadow-card">
            <div className={view === 1 ? "rotate-6" : view === 2 ? "-rotate-6" : ""}>
              <Bottle3D {...visual} className="mx-auto w-1/2 animate-float drop-shadow-[0_28px_36px_rgba(16,42,107,0.25)]" />
            </div>
          </motion.div>
          <div className="mt-4 flex gap-3">
            {views.map((v) => (
              <button key={v} onClick={() => setView(v)} aria-label={`View angle ${v + 1}`}
                className={`w-20 rounded-xl border-2 bg-frost p-2 transition-colors ${view === v ? "border-royal" : "border-silver"}`}>
                <div className={v === 1 ? "rotate-6" : v === 2 ? "-rotate-6" : ""}>
                  <Bottle3D {...visual} label={false} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          {product.badge && <span className="rounded-md bg-amber-500 px-2 py-1 text-[10px] font-bold text-white">{product.badge}</span>}
          <h1 className="mt-2 font-display text-3xl font-extrabold text-navy">{product.name}</h1>
          <div className="mt-2 flex items-center gap-3">
            <Stars rating={product.rating} reviews={product.reviews} />
            <span className={`text-xs font-semibold ${lowStock ? "text-amber-600" : "text-emerald-600"}`}>
              {product.stock === 0 ? "Out of stock" : lowStock ? `Only ${product.stock} left in stock` : "In stock"}
            </span>
          </div>

          <p className="mt-4 font-display text-3xl font-bold text-navy">
            {formatTZS(product.price)}
            {product.oldPrice && <span className="ml-3 text-base font-normal text-navy/40 line-through">{formatTZS(product.oldPrice)}</span>}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-navy/70">{product.description}</p>

          {/* Color */}
          <fieldset className="mt-6">
            <legend className="text-sm font-bold text-navy">Color: <span className="font-normal text-navy/65">{color.name}</span></legend>
            <div className="mt-2 flex gap-2">
              {product.colors.map((c) => (
                <button key={c.name} onClick={() => setColor(c)} aria-label={`Select ${c.name}`} aria-pressed={color.name === c.name}
                  className={`size-9 rounded-full border-2 transition-transform hover:scale-110 ${color.name === c.name ? "border-royal ring-2 ring-royal/30" : "border-silver"}`}
                  style={{ background: c.hex }} />
              ))}
            </div>
          </fieldset>

          {/* Capacity */}
          <fieldset className="mt-5">
            <legend className="text-sm font-bold text-navy">Capacity</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.capacities.map((c) => (
                <button key={c} onClick={() => setCapacity(c)} aria-pressed={capacity === c}
                  className={`rounded-xl border-2 px-4 py-2 text-sm font-semibold transition-colors ${capacity === c ? "border-royal bg-ice text-navy" : "border-silver bg-white text-navy/70 hover:border-navy/30"}`}>
                  {c}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Qty + actions */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-xl border border-silver bg-white">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity" className="p-3 hover:bg-frost"><Minus className="size-4" /></button>
              <span className="w-8 text-center font-bold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} aria-label="Increase quantity" className="p-3 hover:bg-frost"><Plus className="size-4" /></button>
            </div>
            <button
              onClick={() => add({ product, color: color.name, capacity }, qty)}
              disabled={product.stock === 0}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-navy py-3.5 text-sm font-bold text-white transition-colors hover:bg-navy-deep disabled:opacity-40">
              <ShoppingCart className="size-4" /> Add to Cart
            </button>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              onClick={() => { add({ product, color: color.name, capacity }, qty); router.push("/checkout"); }}
              disabled={product.stock === 0}
              className="flex items-center justify-center gap-2 rounded-xl bg-royal py-3.5 text-sm font-bold text-white hover:bg-royal-bright disabled:opacity-40">
              <Zap className="size-4" /> Buy Now
            </button>
            <a href={`https://wa.me/${BRAND.phoneRaw}?text=${waText}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 text-sm font-bold text-white hover:brightness-105">
              WhatsApp Inquiry
            </a>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-navy/65">
            <div className="rounded-xl border border-silver bg-white p-3"><Truck className="mx-auto mb-1 size-4 text-royal" />Nationwide delivery</div>
            <div className="rounded-xl border border-silver bg-white p-3"><ShieldCheck className="mx-auto mb-1 size-4 text-royal" />100% original</div>
            <div className="rounded-xl border border-silver bg-white p-3"><RotateCcw className="mx-auto mb-1 size-4 text-royal" />7-day returns</div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-extrabold text-navy">You May Also Like</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import StatusBadge from "@/components/admin/StatusBadge";
import Bottle3D from "@/components/ui/Bottle3D";
import { getProducts } from "@/lib/productStore";
import type { Product } from "@/data/products";

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => { getProducts().then(setProducts); }, []);

  const total = products.reduce((t, p) => t + (p.stock ?? 0), 0);
  const low = products.filter((p) => p.stock > 0 && p.stock <= 15).length;
  const oos = products.filter((p) => p.stock === 0).length;
  const status = (s: number) => (s === 0 ? "Out of Stock" : s <= 15 ? "Low Stock" : "In Stock");
  const shapeMap: Record<string, Product["visual"]["shape"]> = { "thermal-flasks": "flask", "water-bottles": "bottle", "sports-bottles": "sport", "kids-bottles": "kids", "coffee-tumblers": "tumbler" };

  return (
    <>
      <h1 className="font-display text-2xl font-extrabold text-navy">Inventory Management</h1>
      <p className="text-xs text-navy/50">Dashboard › Inventory</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[["Total Stock", total], ["Products Tracked", products.length], ["Low Stock", low], ["Out of Stock", oos]].map(([l, v]) => (
          <div key={String(l)} className="rounded-2xl border border-silver bg-white p-4 shadow-card"><p className="text-xs text-navy/55">{l}</p><p className="font-display text-xl font-extrabold text-navy">{v}</p></div>
        ))}
      </div>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-silver bg-white shadow-card">
        <table className="w-full min-w-[36rem] text-sm">
          <thead><tr className="border-b border-silver text-left text-xs text-navy/50"><th className="px-4 py-3 font-medium">Product</th><th className="font-medium">SKU</th><th className="font-medium">Category</th><th className="font-medium">Stock</th><th className="px-4 font-medium">Status</th></tr></thead>
          <tbody>
            {products.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-sm text-navy/55">No products in inventory. Add products first.</td></tr>}
            {products.map((p) => (
              <tr key={p.id} className="border-b border-silver/60 last:border-0 hover:bg-frost/60">
                <td className="px-4 py-3"><span className="flex items-center gap-2.5"><span className="w-8 shrink-0 rounded-lg bg-frost p-1"><Bottle3D body={p.visual.body} accent={p.visual.accent} shape={p.visual.shape} label={false} /></span><span className="font-semibold text-navy">{p.name}</span></span></td>
                <td className="text-navy/70">{p.id}</td>
                <td className="text-navy/70">{p.category}</td>
                <td className={`font-bold ${p.stock === 0 ? "text-red-500" : p.stock <= 15 ? "text-amber-600" : "text-emerald-600"}`}>{p.stock}</td>
                <td className="px-4"><StatusBadge status={status(p.stock)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

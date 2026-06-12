"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Download, Upload, Plus, Search, Pencil, Trash2 } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { CategoryDonut } from "@/components/admin/Charts";
import Bottle3D from "@/components/ui/Bottle3D";
import { PRODUCTS as SEED, CATEGORIES as SEED_CATS } from "@/data/products";
import { getProducts, getCategories, deleteProduct } from "@/lib/productStore";
import { TOP_PRODUCTS, INVENTORY_ROWS } from "@/data/admin";
import { formatTZS } from "@/lib/constants";

const STATS = [
  { label: "Total Products", value: "0", delta: "+8.7%", up: true },
  { label: "Active Products", value: "0", delta: "+6.4%", up: true },
  { label: "Out of Stock", value: "0", delta: "-2.1%", up: false },
  { label: "Low Stock Items", value: "0", delta: "-5.3%", up: false },
  { label: "Total Categories", value: "0", delta: "No change", up: true },
  { label: "Views (This Month)", value: "0", delta: "+12.1%", up: true },
];

export default function AdminProductsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All Categories");
  const [PRODUCTS, setProducts] = useState(SEED);
  const [CATEGORIES, setCategories] = useState(SEED_CATS);

  useEffect(() => {
    setProducts(getProducts());
    setCategories(getCategories());
  }, []);

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setProducts(getProducts());
  };

  const rows = useMemo(
    () =>
      PRODUCTS.filter(
        (p) =>
          (cat === "All Categories" || CATEGORIES.find((c) => c.slug === p.category)?.name === cat) &&
          (q === "" || p.name.toLowerCase().includes(q.toLowerCase()) || p.id.toLowerCase().includes(q.toLowerCase()))
      ),
    [q, cat]
  );

  const stockStatus = (s: number) => (s === 0 ? "Out of Stock" : s <= 15 ? "Low Stock" : "Active");

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-navy">Products</h1>
          <p className="text-xs text-navy/50">Dashboard › Products</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-xl border border-silver bg-white px-4 py-2.5 text-sm font-semibold text-navy shadow-card"><Download className="size-4" /> Export</button>
          <button className="flex items-center gap-2 rounded-xl border border-silver bg-white px-4 py-2.5 text-sm font-semibold text-navy shadow-card"><Upload className="size-4" /> Import</button>
          <Link href="/admin/products/new" className="flex items-center gap-2 rounded-xl bg-royal px-4 py-2.5 text-sm font-bold text-white hover:bg-royal-bright"><Plus className="size-4" /> Add Product</Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-2xl border border-silver bg-white p-4 shadow-card">
            <p className="text-xs text-navy/55">{s.label}</p>
            <p className="font-display text-xl font-extrabold text-navy">{s.value}</p>
            <p className={`text-[11px] font-semibold ${s.up ? "text-emerald-600" : "text-red-500"}`}>{s.delta}{s.delta !== "No change" && " vs last month"}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_22rem]">
        <div>
          {/* Filters */}
          <div className="grid gap-3 rounded-2xl border border-silver bg-white p-4 shadow-card sm:grid-cols-3">
            <label className="flex items-center gap-2 rounded-xl border border-silver bg-frost px-3 py-2.5 sm:col-span-2">
              <Search className="size-4 text-navy/45" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, SKU or barcode..." aria-label="Search products"
                className="w-full bg-transparent text-sm outline-none placeholder:text-navy/40" />
            </label>
            <select value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Filter by category"
              className="rounded-xl border border-silver bg-white px-3 py-2.5 text-sm font-semibold text-navy outline-none">
              <option>All Categories</option>
              {CATEGORIES.map((c) => <option key={c.slug}>{c.name}</option>)}
            </select>
          </div>

          {/* Table */}
          <div className="mt-4 overflow-x-auto rounded-2xl border border-silver bg-white shadow-card">
            <table className="w-full min-w-[44rem] text-sm">
              <thead>
                <tr className="border-b border-silver text-left text-xs text-navy/50">
                  <th className="px-4 py-3 font-medium">Product</th><th className="font-medium">SKU</th>
                  <th className="font-medium">Category</th><th className="font-medium">Price</th>
                  <th className="font-medium">Stock</th><th className="font-medium">Status</th><th className="px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => (
                  <tr key={p.id} className="border-b border-silver/60 last:border-0 hover:bg-frost/60">
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-2.5">
                        <span className="w-9 shrink-0 rounded-lg bg-frost p-1"><Bottle3D {...p.visual} label={false} /></span>
                        <span><span className="block font-semibold text-navy">{p.name} {p.capacity}</span><span className="text-xs text-navy/50">{p.colors[0].name}</span></span>
                      </span>
                    </td>
                    <td className="text-navy/70">{p.id}</td>
                    <td><span className="rounded-md bg-ice px-2 py-1 text-[11px] font-semibold text-navy">{CATEGORIES.find((c) => c.slug === p.category)?.name}</span></td>
                    <td className="font-semibold text-navy">{formatTZS(p.price)}{p.oldPrice && <p className="text-xs font-normal text-navy/40 line-through">{formatTZS(p.oldPrice)}</p>}</td>
                    <td className={`font-bold ${p.stock === 0 ? "text-red-500" : p.stock <= 15 ? "text-amber-600" : "text-emerald-600"}`}>{p.stock}</td>
                    <td><StatusBadge status={stockStatus(p.stock)} /></td>
                    <td className="px-4">
                      <span className="flex gap-1">
                        <Link href="/admin/products/new" aria-label={`Edit ${p.name}`} className="rounded-lg border border-silver p-1.5 hover:bg-frost"><Pencil className="size-3.5 text-navy/60" /></Link>
                        <button onClick={() => handleDelete(p.id)} aria-label={`Delete ${p.name}`} className="rounded-lg border border-red-200 p-1.5 text-red-500 hover:bg-red-50"><Trash2 className="size-3.5" /></button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="px-4 py-3 text-xs text-navy/55">Showing 1 to {rows.length} of 342 products</p>
          </div>
        </div>

        {/* Side widgets */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-silver bg-white p-5 shadow-card">
            <div className="flex items-center justify-between"><h2 className="font-display text-base font-bold text-navy">Top Selling Products</h2><span className="text-xs font-bold text-royal">View All</span></div>
            <ul className="mt-3 space-y-3">
              {TOP_PRODUCTS.slice(0, 5).map((p, i) => (
                <li key={p.name} className="flex items-center gap-2.5 text-sm">
                  <span className="w-8 shrink-0 rounded-lg bg-frost p-1"><Bottle3D body={p.body} accent={p.accent} shape={p.shape} label={false} /></span>
                  <span className="min-w-0 flex-1"><span className="block truncate font-semibold text-navy">{i + 1}. {p.name}</span><span className="text-xs text-navy/50">{p.sold} sold</span></span>
                  <span className="text-xs font-bold text-navy">{p.revenue}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-silver bg-white p-5 shadow-card">
            <div className="flex items-center justify-between"><h2 className="font-display text-base font-bold text-navy">Low Stock Alerts</h2><Link href="/admin/inventory" className="text-xs font-bold text-royal">View All</Link></div>
            <ul className="mt-3 space-y-2.5">
              {INVENTORY_ROWS.filter((r) => r.stock > 0 && r.stock <= 15).map((r) => (
                <li key={r.sku} className="flex items-center gap-2.5 text-sm">
                  <span className="w-7 shrink-0 rounded-lg bg-frost p-0.5"><Bottle3D body={r.body} accent={r.accent} shape={r.shape} label={false} /></span>
                  <span className="flex-1 font-semibold text-navy">{r.name}</span>
                  <span className="text-xs font-bold text-amber-600">{r.stock} in stock</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-silver bg-white p-5 shadow-card">
            <h2 className="font-display text-base font-bold text-navy">Products by Category</h2>
            <CategoryDonut />
          </div>
        </div>
      </div>
    </>
  );
}

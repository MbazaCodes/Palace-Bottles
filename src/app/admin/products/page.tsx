"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Download, Upload, Plus, Search, Pencil, Trash2 } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { CategoryDonut } from "@/components/admin/Charts";
import Bottle3D from "@/components/ui/Bottle3D";
import { PRODUCTS as SEED, CATEGORIES as SEED_CATS } from "@/data/products";
import { getProducts, getCategories, deleteProduct, saveProducts, addProduct, slugify, nextProductId } from "@/lib/productStore";
import type { Product, Capacity, CategorySlug } from "@/data/products";
import { TOP_PRODUCTS, INVENTORY_ROWS } from "@/data/admin";
import { formatTZS } from "@/lib/constants";

// Stats computed dynamically below

export default function AdminProductsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All Categories");
  const [PRODUCTS, setProducts] = useState(SEED);
  const [CATEGORIES, setCategories] = useState(SEED_CATS);

  useEffect(() => {
    const load = async () => { setProducts(await getProducts()); setCategories(await getCategories()); };
    load();
  }, []);

  const STATS = [
    { label: "Total Products", value: String(PRODUCTS.length), delta: "—", up: true },
    { label: "Active Products", value: String(PRODUCTS.filter((p) => p.stock > 0).length), delta: "—", up: true },
    { label: "Out of Stock", value: String(PRODUCTS.filter((p) => p.stock === 0).length), delta: "—", up: true },
    { label: "Low Stock Items", value: String(PRODUCTS.filter((p) => p.stock > 0 && p.stock <= 15).length), delta: "—", up: true },
    { label: "Total Categories", value: String(CATEGORIES.length), delta: "—", up: true },
    { label: "Products on Sale", value: String(PRODUCTS.filter((p) => p.oldPrice).length), delta: "—", up: true },
  ];

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    setProducts(await getProducts());
  };

  const handleExport = () => {
    const csv = [
      ["SKU", "Name", "Category", "Price", "Sale Price", "Stock", "Capacities", "Colors", "Description"].join(","),
      ...PRODUCTS.map((p) =>
        [
          p.id,
          `"${p.name}"`,
          p.category,
          p.oldPrice ?? p.price,
          p.oldPrice ? p.price : "",
          p.stock,
          `"${p.capacities.join("; ")}"`,
          `"${p.colors.map((c) => c.name).join("; ")}"`,
          `"${(p.shortDescription ?? "").replace(/"/g, '""')}"`,
        ].join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `palace-bottles-products-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const text = reader.result as string;
      const lines = text.split("\n").slice(1).filter((l) => l.trim());
      const shapeMap: Record<string, Product["visual"]["shape"]> = {
        "thermal-flasks": "flask", "water-bottles": "bottle", "sports-bottles": "sport",
        "kids-bottles": "kids", "coffee-tumblers": "tumbler",
      };
      let added = 0;
      for (const line of lines) {
        // Parse CSV (handles quoted fields)
        const cols = line.match(/(".*?"|[^,]*),?/g)?.map((c) => c.replace(/,?$/, "").replace(/^"|"$/g, "").replace(/""/g, '"')) ?? [];
        if (cols.length < 4) continue;
        const [sku, name, category, priceStr, salePriceStr, stockStr, capsStr, colorsStr, desc] = cols;
        const price = Number(priceStr) || 0;
        const salePrice = Number(salePriceStr) || 0;
        const stock = Number(stockStr) || 0;
        const caps = (capsStr ?? "500ml").split(";").map((c) => c.trim()).filter(Boolean) as Capacity[];
        const colorNames = (colorsStr ?? "Black").split(";").map((c) => c.trim()).filter(Boolean);
        const colorPresets: Record<string, string> = { Black: "#16181d", Navy: "#102a6b", Blue: "#2563eb", White: "#eef0f4", Silver: "#cdd3dd", Green: "#16513a", Red: "#dc2626", Purple: "#a78bfa", Pink: "#f472b6" };
        const colors = colorNames.map((n) => ({ name: n, hex: colorPresets[n] ?? "#666666" }));
        const cat = (category || "water-bottles") as CategorySlug;

        const product: Product = {
          id: sku || nextProductId(),
          slug: slugify(name),
          name,
          category: cat,
          capacity: caps[0] ?? "500ml",
          capacities: caps,
          colors,
          price: salePrice || price,
          oldPrice: salePrice ? price : undefined,
          rating: 0, reviews: 0,
          stock,
          description: desc ?? "",
          shortDescription: desc ?? "",
          visual: { body: colors[0]?.hex ?? "#16181d", accent: colors[1]?.hex ?? "#3a3f4a", shape: shapeMap[cat] ?? "bottle" },
        };
        addProduct(product);
        added++;
      }
      setProducts(await getProducts());
      alert(`Imported ${added} product${added !== 1 ? "s" : ""} successfully.`);
    };
    reader.readAsText(file);
    e.target.value = "";
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
          <button onClick={handleExport} className="flex items-center gap-2 rounded-xl border border-silver bg-white px-4 py-2.5 text-sm font-semibold text-navy shadow-card"><Download className="size-4" /> Export</button>
          <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-silver bg-white px-4 py-2.5 text-sm font-semibold text-navy shadow-card hover:bg-frost"><Upload className="size-4" /> Import<input type="file" accept=".csv" onChange={handleImport} className="hidden" /></label>
          <Link href="/admin/products/new" className="flex items-center gap-2 rounded-xl bg-royal px-4 py-2.5 text-sm font-bold text-white hover:bg-royal-bright"><Plus className="size-4" /> Add Product</Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-2xl border border-silver bg-white p-4 shadow-card">
            <p className="text-xs text-navy/55">{s.label}</p>
            <p className="font-display text-xl font-extrabold text-navy">{s.value}</p>
            <p className={`text-[11px] font-semibold ${s.up ? "text-emerald-600" : "text-red-500"}`}>{s.delta}</p>
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
            <p className="px-4 py-3 text-xs text-navy/55">Showing {rows.length} product{rows.length !== 1 ? "s" : ""}</p>
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

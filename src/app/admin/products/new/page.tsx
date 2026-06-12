"use client";
import { useState, useEffect } from "react";

import Link from "next/link";
import { Save, FileText, X, Plus, UploadCloud, Barcode } from "lucide-react";
import Bottle3D from "@/components/ui/Bottle3D";
import StatusBadge from "@/components/admin/StatusBadge";
import { getCategories, type Category } from "@/lib/productStore";
import { addProduct, nextProductId, slugify } from "@/lib/productStore";
import type { Product, Capacity, CategorySlug } from "@/data/products";

const SHAPE_MAP: Record<string, Product["visual"]["shape"]> = {
  "thermal-flasks": "flask",
  "water-bottles": "bottle",
  "sports-bottles": "sport",
  "kids-bottles": "kids",
  "coffee-tumblers": "tumbler",
};

const COLOR_PRESETS = [
  { name: "Black", hex: "#16181d" },
  { name: "Navy", hex: "#102a6b" },
  { name: "Blue", hex: "#2563eb" },
  { name: "White", hex: "#eef0f4" },
  { name: "Silver", hex: "#cdd3dd" },
  { name: "Green", hex: "#16513a" },
  { name: "Red", hex: "#dc2626" },
  { name: "Purple", hex: "#a78bfa" },
  { name: "Pink", hex: "#f472b6" },
];

export default function AddProductPage() {

  const [categories, setCats] = useState<Category[]>([]);

  useEffect(() => { getCategories().then(setCats); }, []);

  const [name, setName] = useState("");
  const [sku, setSku] = useState(nextProductId());
  const [category, setCategory] = useState<CategorySlug>("water-bottles");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [stockQty, setStockQty] = useState("50");
  const [colors, setColors] = useState<{ name: string; hex: string }[]>([COLOR_PRESETS[0]]);
  const [capacities, setCapacities] = useState<Capacity[]>(["500ml", "750ml", "1L"]);
  const [defaultCapacity, setDefaultCapacity] = useState<Capacity>("750ml");
  const [images, setImages] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const [addColorName, setAddColorName] = useState("");

  const ALL_CAPS: Capacity[] = ["400ml", "500ml", "750ml", "900ml", "1L", "1.5L", "2L"];
  const input = "mt-1 w-full rounded-xl border border-silver bg-white px-3.5 py-2.5 text-sm outline-none focus:border-royal";

  const handleSave = async () => {
    if (!name.trim() || !price.trim()) return;

    const product: Product = {
      id: sku,
      slug: slugify(name),
      name,
      category,
      capacity: defaultCapacity,
      capacities,
      colors,
      price: Number(price),
      oldPrice: salePrice ? Number(price) : undefined,
      rating: 0,
      reviews: 0,
      stock: Number(stockQty) || 0,
      description,
      shortDescription,
      visual: {
        body: colors[0]?.hex ?? "#16181d",
        accent: colors[1]?.hex ?? colors[0]?.hex ?? "#3a3f4a",
        shape: SHAPE_MAP[category] ?? "bottle",
      },
    };

    // If sale price is set, sale price becomes the selling price, regular becomes oldPrice
    if (salePrice) {
      product.price = Number(salePrice);
      product.oldPrice = Number(price);
    }

    await addProduct(product);
    setSaved(true);
    setTimeout(() => { window.location.href = "/admin/products"; }, 1200);
  };

  const addColor = () => {
    const preset = COLOR_PRESETS.find((c) => c.name.toLowerCase() === addColorName.toLowerCase());
    if (preset && !colors.find((c) => c.name === preset.name)) {
      setColors([...colors, preset]);
    } else if (addColorName.trim()) {
      setColors([...colors, { name: addColorName, hex: "#666666" }]);
    }
    setAddColorName("");
  };

  const toggleCap = (c: Capacity) => {
    if (capacities.includes(c)) {
      setCapacities(capacities.filter((x) => x !== c));
    } else {
      setCapacities([...capacities, c]);
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-navy">Add Product</h1>
          <p className="text-xs text-navy/50"><Link href="/admin" className="hover:text-royal">Dashboard</Link> › <Link href="/admin/products" className="hover:text-royal">Products</Link> › Add Product</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/products" className="rounded-xl border border-silver bg-white px-4 py-2.5 text-sm font-semibold text-navy shadow-card">Cancel</Link>
          <button onClick={handleSave} disabled={!name.trim() || !price.trim()}
            className="flex items-center gap-2 rounded-xl bg-royal px-4 py-2.5 text-sm font-bold text-white hover:bg-royal-bright disabled:opacity-40">
            <Save className="size-4" /> Save Product
          </button>
        </div>
      </div>

      {saved && <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">Product saved! Redirecting to products list...</p>}

      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_24rem]">
        <div className="space-y-5">
          {/* Basic Info */}
          <section className="rounded-2xl border border-silver bg-white p-5 shadow-card">
            <h2 className="font-display text-base font-bold text-navy">Basic Information</h2>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-navy">Product Name *
                  <input value={name} onChange={(e) => setName(e.target.value)} className={input} placeholder="e.g. Palace Classic Flask 1L" />
                </label>
                <label className="block text-sm font-semibold text-navy">SKU *
                  <span className="mt-1 flex items-center gap-2 rounded-xl border border-silver bg-white px-3.5 py-2.5">
                    <input value={sku} onChange={(e) => setSku(e.target.value)} className="w-full text-sm outline-none" />
                    <Barcode className="size-4 text-navy/40" />
                  </span>
                </label>
                <label className="block text-sm font-semibold text-navy">Category *
                  <select value={category} onChange={(e) => setCategory(e.target.value as CategorySlug)} className={input}>
                    {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                  </select>
                </label>
                <label className="block text-sm font-semibold text-navy">Short Description
                  <textarea rows={3} value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} className={input}
                    placeholder="Brief summary shown on product cards..." />
                </label>
              </div>
              <label className="block text-sm font-semibold text-navy">Full Description
                <textarea rows={12} value={description} onChange={(e) => setDescription(e.target.value)} className={input}
                  placeholder="Detailed product description..." />
              </label>
            </div>
          </section>

          {/* Variants */}
          <section className="rounded-2xl border border-silver bg-white p-5 shadow-card">
            <h2 className="font-display text-base font-bold text-navy">Variants &amp; Options</h2>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-navy">Colors *</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {colors.map((c) => (
                    <span key={c.name} className="flex items-center gap-1.5 rounded-xl border border-silver bg-frost px-3 py-1.5 text-sm font-semibold text-navy">
                      <span className="size-3 rounded-full" style={{ background: c.hex }} /> {c.name}
                      <button onClick={() => setColors(colors.filter((x) => x.name !== c.name))} aria-label={`Remove ${c.name}`}><X className="size-3.5 text-navy/45" /></button>
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex gap-1.5">
                  <input value={addColorName} onChange={(e) => setAddColorName(e.target.value)} placeholder="Color name" onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addColor())}
                    className="rounded-lg border border-silver px-2.5 py-1.5 text-xs outline-none" />
                  <button onClick={addColor} className="flex items-center gap-1 rounded-lg border border-dashed border-silver px-2.5 py-1.5 text-xs font-semibold text-navy/60 hover:border-royal"><Plus className="size-3.5" /> Add</button>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-navy">Capacities *</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {ALL_CAPS.map((c) => (
                    <button key={c} onClick={() => toggleCap(c)}
                      className={`rounded-xl border-2 px-3 py-1.5 text-sm font-semibold transition-colors ${capacities.includes(c) ? "border-royal bg-ice text-navy" : "border-silver bg-white text-navy/50"}`}>
                      {c}
                    </button>
                  ))}
                </div>
                <label className="mt-3 block text-xs font-semibold text-navy/60">Default capacity
                  <select value={defaultCapacity} onChange={(e) => setDefaultCapacity(e.target.value as Capacity)} className="ml-2 rounded-lg border border-silver px-2 py-1 text-xs outline-none">
                    {capacities.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </label>
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section className="rounded-2xl border border-silver bg-white p-5 shadow-card">
            <h2 className="font-display text-base font-bold text-navy">Pricing &amp; Inventory</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
              <label className="text-sm font-semibold text-navy">Regular Price (TZS) *
                <input value={price} onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))} inputMode="numeric" className={input} placeholder="e.g. 45000" />
              </label>
              <label className="text-sm font-semibold text-navy">Sale Price (TZS)
                <input value={salePrice} onChange={(e) => setSalePrice(e.target.value.replace(/\D/g, ""))} inputMode="numeric" className={input} placeholder="Leave empty if no sale" />
              </label>
              <label className="text-sm font-semibold text-navy">Stock Quantity *
                <input value={stockQty} onChange={(e) => setStockQty(e.target.value.replace(/\D/g, ""))} inputMode="numeric" className={input} />
              </label>
              <label className="text-sm font-semibold text-navy">Discount
                <input value={price && salePrice ? `${Math.round(100 - (Number(salePrice) / Number(price)) * 100)}%` : "—"} readOnly className={`${input} bg-frost`} />
              </label>
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Image upload */}
          <section className="rounded-2xl border border-silver bg-white p-5 shadow-card">
            <h2 className="font-display text-base font-bold text-navy">Product Images</h2>
            <p className="text-xs text-navy/50">Upload up to 6 images (shown on product page)</p>
            <label className="mt-3 flex w-full cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-silver p-6 text-navy/55 transition-colors hover:border-royal">
              <UploadCloud className="size-7" />
              <span className="text-sm font-semibold">Click to upload</span>
              <span className="text-xs">PNG, JPG or WEBP</span>
              <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => {
                const files = Array.from(e.target.files ?? []).slice(0, 6 - images.length);
                files.forEach((f) => {
                  const reader = new FileReader();
                  reader.onload = () => setImages((prev) => prev.length < 6 ? [...prev, reader.result as string] : prev);
                  reader.readAsDataURL(f);
                });
              }} />
            </label>
            {images.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {images.map((src, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-xl">
                    <img src={src} alt={`Upload ${i + 1}`} className="aspect-square w-full object-cover" />
                    {i === 0 && <span className="absolute bottom-1 left-1 rounded bg-navy px-1.5 py-0.5 text-[9px] font-bold text-white">Primary</span>}
                    <button type="button" onClick={() => setImages(images.filter((_, x) => x !== i))}
                      className="absolute right-1 top-1 hidden rounded-full bg-red-500 p-0.5 text-white group-hover:flex"><X className="size-3" /></button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Live preview */}
          <section className="rounded-2xl border border-silver bg-white p-5 shadow-card">
            <h2 className="font-display text-base font-bold text-navy">Live Preview</h2>
            <div className="mt-3 flex gap-3">
              <div className="w-20 shrink-0 rounded-xl bg-frost p-2">
                <Bottle3D
                  body={colors[0]?.hex ?? "#16181d"}
                  accent={colors[1]?.hex ?? colors[0]?.hex ?? "#3a3f4a"}
                  shape={SHAPE_MAP[category] ?? "bottle"}
                  label={false}
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-navy">{name || "Product name"}</p>
                <p className="font-display font-bold text-navy">
                  TZS {Number(salePrice || price || 0).toLocaleString()}
                  {salePrice && price && <span className="ml-1 text-xs font-normal text-navy/40 line-through">TZS {Number(price).toLocaleString()}</span>}
                </p>
                <p className="text-xs text-navy/50">{defaultCapacity} · {colors[0]?.name ?? "—"}</p>
                <StatusBadge status={Number(stockQty) > 0 ? "In Stock" : "Out of Stock"} />
              </div>
            </div>
            <p className="mt-3 text-xs text-navy/50">
              Slug: <code className="rounded bg-frost px-1">/product/{slugify(name || "product-name")}</code>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

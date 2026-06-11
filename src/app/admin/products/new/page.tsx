"use client";
import { useState } from "react";
import Link from "next/link";
import { Save, FileText, X, Plus, UploadCloud, Barcode } from "lucide-react";
import Bottle3D from "@/components/ui/Bottle3D";
import { CATEGORIES } from "@/data/products";
import StatusBadge from "@/components/admin/StatusBadge";

const TABS = ["Basic Information", "Variants & Options", "Pricing & Inventory", "SEO & Meta", "Shipping", "More Settings"];

export default function AddProductPage() {
  const [tab, setTab] = useState(0);
  const [colors, setColors] = useState(["Blue", "Black", "Red"]);
  const [caps, setCaps] = useState(["500ml", "750ml", "1L", "2L"]);
  const [name, setName] = useState("Hydro Active Bottle 750ml");
  const [price, setPrice] = useState("32000");
  const [sale, setSale] = useState("25000");
  const [saved, setSaved] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const input = "mt-1 w-full rounded-xl border border-silver bg-white px-3.5 py-2.5 text-sm outline-none focus:border-royal";
  const chip = "flex items-center gap-1.5 rounded-xl border border-silver bg-frost px-3 py-1.5 text-sm font-semibold text-navy";

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-navy">Add Product</h1>
          <p className="text-xs text-navy/50"><Link href="/admin" className="hover:text-royal">Dashboard</Link> › <Link href="/admin/products" className="hover:text-royal">Products</Link> › Add Product</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/products" className="rounded-xl border border-silver bg-white px-4 py-2.5 text-sm font-semibold text-navy shadow-card">Cancel</Link>
          <button className="flex items-center gap-2 rounded-xl border border-silver bg-white px-4 py-2.5 text-sm font-semibold text-navy shadow-card"><FileText className="size-4" /> Save as Draft</button>
          <button onClick={() => setSaved(true)} className="flex items-center gap-2 rounded-xl bg-royal px-4 py-2.5 text-sm font-bold text-white hover:bg-royal-bright"><Save className="size-4" /> Save Product</button>
        </div>
      </div>

      {saved && <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">Product saved successfully.</p>}

      {/* Tabs */}
      <div className="mt-5 flex gap-1 overflow-x-auto rounded-2xl border border-silver bg-white p-1.5 shadow-card">
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)}
            className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${tab === i ? "bg-royal text-white" : "text-navy/60 hover:bg-frost"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_24rem]">
        <div className="space-y-5">
          {/* Basic info */}
          <section className="rounded-2xl border border-silver bg-white p-5 shadow-card">
            <h2 className="font-display text-base font-bold text-navy">Basic Information</h2>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-navy">Product Name *
                  <input value={name} onChange={(e) => setName(e.target.value)} className={input} />
                </label>
                <label className="block text-sm font-semibold text-navy">SKU *
                  <span className="mt-1 flex items-center gap-2 rounded-xl border border-silver bg-white px-3.5 py-2.5">
                    <input defaultValue="PB-1002" className="w-full text-sm outline-none" />
                    <Barcode className="size-4 text-navy/40" />
                  </span>
                </label>
                <label className="block text-sm font-semibold text-navy">Category *
                  <select className={input} defaultValue="Water Bottles">
                    {CATEGORIES.map((c) => <option key={c.slug}>{c.name}</option>)}
                  </select>
                </label>
                <label className="block text-sm font-semibold text-navy">Brand
                  <input defaultValue="Palace Bottles" className={input} />
                </label>
                <label className="block text-sm font-semibold text-navy">Short Description
                  <textarea rows={3} defaultValue="Premium 750ml water bottle made with high quality stainless steel. Keeps your drinks hot or cold for hours." className={input} />
                </label>
              </div>
              <label className="block text-sm font-semibold text-navy">Product Description *
                <textarea rows={13} defaultValue={"Stay hydrated in style with our Hydro Active 750ml bottle. Built with durable stainless steel and double-wall vacuum insulation, it keeps your drinks cold for up to 24 hours and hot for up to 12 hours.\n\nPerfect for gym, office, travel, and everyday use."} className={input} />
              </label>
            </div>
          </section>

          {/* Variants */}
          <section className="rounded-2xl border border-silver bg-white p-5 shadow-card">
            <h2 className="font-display text-base font-bold text-navy">Variants &amp; Options</h2>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-navy">Color Options *</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {colors.map((c) => (
                    <span key={c} className={chip}>
                      <span className="size-3 rounded-full" style={{ background: c === "Blue" ? "#2563eb" : c === "Black" ? "#16181d" : c === "Red" ? "#dc2626" : "#a78bfa" }} />
                      {c}
                      <button onClick={() => setColors(colors.filter((x) => x !== c))} aria-label={`Remove ${c}`}><X className="size-3.5 text-navy/45" /></button>
                    </span>
                  ))}
                  <button onClick={() => setColors([...colors, "Purple"])} className="flex items-center gap-1 rounded-xl border border-dashed border-silver px-3 py-1.5 text-sm font-semibold text-navy/60 hover:border-royal"><Plus className="size-3.5" /> Add Color</button>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-navy">Capacity Options *</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {caps.map((c) => (
                    <span key={c} className={chip}>{c}<button onClick={() => setCaps(caps.filter((x) => x !== c))} aria-label={`Remove ${c}`}><X className="size-3.5 text-navy/45" /></button></span>
                  ))}
                  <button onClick={() => setCaps([...caps, "1.5L"])} className="flex items-center gap-1 rounded-xl border border-dashed border-silver px-3 py-1.5 text-sm font-semibold text-navy/60 hover:border-royal"><Plus className="size-3.5" /> Add Capacity</button>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section className="rounded-2xl border border-silver bg-white p-5 shadow-card">
            <h2 className="font-display text-base font-bold text-navy">Pricing &amp; Inventory</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
              <label className="text-sm font-semibold text-navy">Regular Price (TZS) *<input value={price} onChange={(e) => setPrice(e.target.value)} inputMode="numeric" className={input} /></label>
              <label className="text-sm font-semibold text-navy">Sale Price (TZS)<input value={sale} onChange={(e) => setSale(e.target.value)} inputMode="numeric" className={input} /></label>
              <label className="text-sm font-semibold text-navy">Cost Price (TZS)<input defaultValue="18000" inputMode="numeric" className={input} /></label>
              <label className="text-sm font-semibold text-navy">Discount (%)<input value={price && sale ? (100 - (Number(sale) / Number(price)) * 100).toFixed(2) : ""} readOnly className={`${input} bg-frost`} /></label>
              <label className="text-sm font-semibold text-navy">Stock Quantity *<input defaultValue="85" inputMode="numeric" className={input} /></label>
              <label className="text-sm font-semibold text-navy">Low Stock Alert<input defaultValue="20" inputMode="numeric" className={input} /></label>
              <label className="text-sm font-semibold text-navy">Stock Status
                <select className={input}><option>In Stock</option><option>Low Stock</option><option>Out of Stock</option></select>
              </label>
              <label className="flex items-end gap-2 pb-2.5 text-sm font-semibold text-navy">
                <input type="checkbox" className="size-4 accent-royal" /> Allow Backorder
              </label>
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          <section className="rounded-2xl border border-silver bg-white p-5 shadow-card">
            <h2 className="font-display text-base font-bold text-navy">Product Images *</h2>
            <p className="text-xs text-navy/50">You can upload up to 6 images</p>
            <label className="mt-3 flex w-full cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-silver p-8 text-navy/55 transition-colors hover:border-royal">
              <UploadCloud className="size-7" />
              <span className="text-sm font-semibold">Click to upload images</span>
              <span className="text-xs">PNG, JPG or WEBP (Max. 5MB each)</span>
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
                      className="absolute right-1 top-1 hidden rounded-full bg-red-500 p-0.5 text-white group-hover:flex">
                      <X className="size-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {images.length === 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rounded-xl bg-gradient-to-b from-ice/50 to-silver/50 p-2 opacity-40">
                    <Bottle3D body="#2563eb" accent="#60a5fa" shape="bottle" label={false} />
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-silver bg-white p-5 shadow-card">
            <h2 className="font-display text-base font-bold text-navy">Product Preview</h2>
            <div className="mt-3 flex gap-3">
              <div className="w-20 shrink-0 rounded-xl bg-frost p-2"><Bottle3D body="#2563eb" accent="#60a5fa" shape="bottle" label={false} /></div>
              <div>
                <p className="text-sm font-bold text-navy">{name || "Product name"}</p>
                <p className="font-display font-bold text-navy">TZS {Number(sale || 0).toLocaleString()} <span className="text-xs font-normal text-navy/40 line-through">TZS {Number(price || 0).toLocaleString()}</span></p>
                <StatusBadge status="In Stock" />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-silver bg-white p-5 shadow-card">
            <h2 className="font-display text-base font-bold text-navy">Product Status</h2>
            <div className="mt-3 space-y-3 text-sm">
              {[["Status", "Active"], ["Visibility", "Published"], ["Featured Product", "Off"], ["New Arrival", "On"]].map(([t, v]) => (
                <div key={t} className="flex items-center justify-between">
                  <span className="font-semibold text-navy">{t}</span>
                  <span className={`rounded-md px-2 py-1 text-xs font-bold ${v === "Off" ? "bg-slate-100 text-slate-500" : "bg-emerald-100 text-emerald-700"}`}>{v}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

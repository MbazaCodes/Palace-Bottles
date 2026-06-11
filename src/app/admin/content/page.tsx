"use client";
import { useState } from "react";
import { Save, Plus, Trash2 } from "lucide-react";

const FAQS_INIT = [
  { q: "How long does delivery take?", a: "1–2 days in Dar es Salaam, 2–5 days for other regions and Zanzibar." },
  { q: "Which payment methods do you accept?", a: "M-Pesa, Airtel Money, Mixx by Yas, HaloPesa and Cash on Delivery (where available)." },
  { q: "Can I return a product?", a: "Yes — eligible items can be returned within 7 days in original condition." },
];

export default function AdminContentPage() {
  const [faqs, setFaqs] = useState(FAQS_INIT);
  const [saved, setSaved] = useState(false);
  const input = "mt-1 w-full rounded-xl border border-silver bg-white px-3.5 py-2.5 text-sm outline-none focus:border-royal";

  return (
    <>
      <div>
        <h1 className="font-display text-2xl font-extrabold text-navy">Content Management</h1>
        <p className="text-xs text-navy/50">Dashboard › Content</p>
      </div>

      {saved && <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">Content saved (demo). Phase 4 persists this to Supabase so the storefront reads it live.</p>}

      <form onSubmit={(e) => { e.preventDefault(); setSaved(true); }} className="mt-5 grid gap-5 xl:grid-cols-2">
        <section className="rounded-2xl border border-silver bg-white p-5 shadow-card">
          <h2 className="font-display text-base font-bold text-navy">Homepage Hero</h2>
          <label className="mt-4 block text-sm font-semibold text-navy">Headline
            <input defaultValue="Keep It Hot. Keep It Cold. Keep It Palace." className={input} />
          </label>
          <label className="mt-4 block text-sm font-semibold text-navy">Subheadline
            <input defaultValue="Premium thermal flasks and hydration products trusted across Tanzania." className={input} />
          </label>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <label className="text-sm font-semibold text-navy">Primary Button<input defaultValue="Shop Now" className={input} /></label>
            <label className="text-sm font-semibold text-navy">Secondary Button<input defaultValue="Explore Collection" className={input} /></label>
          </div>
        </section>

        <section className="rounded-2xl border border-silver bg-white p-5 shadow-card">
          <h2 className="font-display text-base font-bold text-navy">Contact Information</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-navy">Phone<input defaultValue="+255 657 397 719" className={input} /></label>
            <label className="text-sm font-semibold text-navy">Email<input defaultValue="kyalaalikoabel@gmail.com" className={input} /></label>
            <label className="text-sm font-semibold text-navy sm:col-span-2">Address<input defaultValue="Makumbusho, Near Mesuma Hotel, Dar es Salaam, Tanzania" className={input} /></label>
            <label className="text-sm font-semibold text-navy sm:col-span-2">Opening Hours<input defaultValue="Mon - Sat: 8:00 AM - 8:00 PM · Sun: 9:00 AM - 5:00 PM" className={input} /></label>
          </div>
        </section>

        <section className="rounded-2xl border border-silver bg-white p-5 shadow-card">
          <h2 className="font-display text-base font-bold text-navy">About Us</h2>
          <textarea rows={6} defaultValue="Palace Bottles is Tanzania's premium hydration brand. From our home in Makumbusho, Dar es Salaam, we deliver original thermal flasks, water bottles and tumblers across Tanzania Mainland and Zanzibar." className={input} />
          <label className="mt-4 block text-sm font-semibold text-navy">Footer Tagline
            <input defaultValue="Premium bottles and hydration products trusted across Tanzania." className={input} />
          </label>
        </section>

        <section className="rounded-2xl border border-silver bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-navy">FAQs</h2>
            <button type="button" onClick={() => setFaqs([...faqs, { q: "New question", a: "Answer..." }])}
              className="flex items-center gap-1.5 rounded-xl border border-silver px-3 py-2 text-xs font-bold text-navy hover:bg-frost"><Plus className="size-3.5" /> Add FAQ</button>
          </div>
          <ul className="mt-3 space-y-3">
            {faqs.map((f, i) => (
              <li key={i} className="rounded-xl border border-silver p-3.5">
                <div className="flex items-start gap-2">
                  <div className="flex-1 space-y-2">
                    <input defaultValue={f.q} className="w-full rounded-lg border border-silver px-3 py-2 text-sm font-semibold outline-none focus:border-royal" />
                    <textarea defaultValue={f.a} rows={2} className="w-full rounded-lg border border-silver px-3 py-2 text-xs outline-none focus:border-royal" />
                  </div>
                  <button type="button" onClick={() => setFaqs(faqs.filter((_, x) => x !== i))} aria-label="Delete FAQ" className="rounded-lg border border-red-200 p-1.5 text-red-500 hover:bg-red-50"><Trash2 className="size-3.5" /></button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <button className="flex items-center justify-center gap-2 rounded-xl bg-royal py-3 text-sm font-bold text-white hover:bg-royal-bright xl:col-span-2">
          <Save className="size-4" /> Save All Content
        </button>
      </form>
    </>
  );
}

"use client";
import { useState } from "react";
import { Save } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const input = "mt-1 w-full rounded-xl border border-silver bg-white px-3.5 py-2.5 text-sm outline-none focus:border-royal";

  return (
    <>
      <div>
        <h1 className="font-display text-2xl font-extrabold text-navy">Settings</h1>
        <p className="text-xs text-navy/50">Dashboard › Settings</p>
      </div>

      {saved && <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">Settings saved (demo). Phase 4 persists these to Supabase.</p>}

      <form onSubmit={(e) => { e.preventDefault(); setSaved(true); }} className="mt-5 grid gap-5 xl:grid-cols-2">
        <section className="rounded-2xl border border-silver bg-white p-5 shadow-card">
          <h2 className="font-display text-base font-bold text-navy">Company Profile</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-navy">Business Name<input defaultValue="Palace Bottles" className={input} /></label>
            <label className="text-sm font-semibold text-navy">Tagline<input defaultValue="Keep It Hot. Keep It Cold. Keep It Palace." className={input} /></label>
            <label className="text-sm font-semibold text-navy">Phone<input defaultValue="+255 657 397 719" className={input} /></label>
            <label className="text-sm font-semibold text-navy">Email<input defaultValue="kyalaalikoabel@gmail.com" className={input} /></label>
            <label className="text-sm font-semibold text-navy sm:col-span-2">Address<input defaultValue="Makumbusho, Near Mesuma Hotel, Dar es Salaam, Tanzania" className={input} /></label>
          </div>
        </section>

        <section className="rounded-2xl border border-silver bg-white p-5 shadow-card">
          <h2 className="font-display text-base font-bold text-navy">Payment Settings — Mobile Money Numbers</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-navy">M-Pesa (Lipa Namba)<input defaultValue="+255 657 397 719" className={input} /></label>
            <label className="text-sm font-semibold text-navy">Airtel Money<input defaultValue="+255 657 397 719" className={input} /></label>
            <label className="text-sm font-semibold text-navy">Mixx by Yas<input defaultValue="+255 657 397 719" className={input} /></label>
            <label className="text-sm font-semibold text-navy">HaloPesa<input defaultValue="+255 657 397 719" className={input} /></label>
            <label className="flex items-center gap-2 text-sm font-semibold text-navy sm:col-span-2">
              <input type="checkbox" defaultChecked className="size-4 accent-royal" /> Enable Cash on Delivery
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-silver bg-white p-5 shadow-card">
          <h2 className="font-display text-base font-bold text-navy">Tax &amp; Invoicing</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-navy">TIN Number<input placeholder="e.g. 123-456-789" className={input} /></label>
            <label className="text-sm font-semibold text-navy">VAT Rate (%)<input defaultValue="18" inputMode="numeric" className={input} /></label>
            <label className="flex items-center gap-2 text-sm font-semibold text-navy sm:col-span-2">
              <input type="checkbox" className="size-4 accent-royal" /> Prices include VAT
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-silver bg-white p-5 shadow-card">
          <h2 className="font-display text-base font-bold text-navy">Branding &amp; Social Links</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-navy">Primary Color
              <span className="mt-1 flex items-center gap-2 rounded-xl border border-silver px-3.5 py-2"><span className="size-5 rounded-md bg-navy" /><input defaultValue="#102A6B" className="w-full text-sm outline-none" /></span>
            </label>
            <label className="text-sm font-semibold text-navy">Accent Color
              <span className="mt-1 flex items-center gap-2 rounded-xl border border-silver px-3.5 py-2"><span className="size-5 rounded-md bg-ice" /><input defaultValue="#DCEEFF" className="w-full text-sm outline-none" /></span>
            </label>
            <label className="text-sm font-semibold text-navy">
              <span className="flex items-center gap-1.5"><InstagramIcon className="size-3.5" /> Instagram</span>
              <input defaultValue="https://instagram.com/palacebottles" className={input} />
            </label>
            <label className="text-sm font-semibold text-navy">
              <span className="flex items-center gap-1.5"><FacebookIcon className="size-3.5" /> Facebook</span>
              <input defaultValue="https://facebook.com/palacebottles" className={input} />
            </label>
            <label className="text-sm font-semibold text-navy sm:col-span-2">TikTok<input defaultValue="https://tiktok.com/@palacebottles" className={input} /></label>
          </div>
        </section>

        <button className="flex items-center justify-center gap-2 rounded-xl bg-royal py-3 text-sm font-bold text-white hover:bg-royal-bright xl:col-span-2">
          <Save className="size-4" /> Save Settings
        </button>
      </form>
    </>
  );
}

"use client";
import { useState } from "react";
import { Megaphone, Send } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";

const BANNERS_INIT = [
  { id: 1, title: "Keep It Hot. Keep It Cold. Keep It Palace.", placement: "Homepage Hero", active: true },
  { id: 2, title: "Mega Flash Sale — Up to 30% OFF", placement: "Homepage Banner", active: true },
  { id: 3, title: "Free Delivery Across Tanzania", placement: "Top Bar", active: true },
  { id: 4, title: "Eid Special Collection", placement: "Homepage Hero", active: false },
];

const CAMPAIGNS = [
  { name: "June Hydration Month", channel: "WhatsApp + SMS", reach: "6,230", status: "Scheduled", date: "Jun 1 – Jun 30" },
  { name: "Mega Flash Sale Blast", channel: "SMS", reach: "7,890", status: "Live", date: "May 16 – May 20" },
  { name: "Mother's Day Gift Guide", channel: "Email", reach: "5,540", status: "Ended", date: "May 5 – May 11" },
];

export default function AdminMarketingPage() {
  const [banners, setBanners] = useState(BANNERS_INIT);
  const [announced, setAnnounced] = useState(false);

  return (
    <>
      <div>
        <h1 className="font-display text-2xl font-extrabold text-navy">Marketing Center</h1>
        <p className="text-xs text-navy/50">Dashboard › Marketing</p>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_24rem]">
        <div className="space-y-5">
          {/* Banners */}
          <div className="rounded-2xl border border-silver bg-white p-5 shadow-card">
            <h2 className="font-display text-base font-bold text-navy">Homepage Banners</h2>
            <ul className="mt-3 space-y-2.5">
              {banners.map((b) => (
                <li key={b.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-silver p-3.5">
                  <div>
                    <p className="text-sm font-semibold text-navy">{b.title}</p>
                    <p className="text-xs text-navy/50">{b.placement}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={b.active ? "Live" : "Draft"} />
                    <button onClick={() => setBanners(banners.map((x) => x.id === b.id ? { ...x, active: !x.active } : x))}
                      className="rounded-lg border border-silver px-2.5 py-1.5 text-xs font-semibold text-navy hover:bg-frost">
                      {b.active ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Campaigns */}
          <div className="overflow-x-auto rounded-2xl border border-silver bg-white shadow-card">
            <h2 className="px-4 pt-4 font-display text-base font-bold text-navy">Campaigns</h2>
            <table className="mt-2 w-full min-w-[36rem] text-sm">
              <thead><tr className="border-b border-silver text-left text-xs text-navy/50"><th className="px-4 py-3 font-medium">Campaign</th><th className="font-medium">Channel</th><th className="font-medium">Reach</th><th className="font-medium">Period</th><th className="px-4 font-medium">Status</th></tr></thead>
              <tbody>
                {CAMPAIGNS.map((c) => (
                  <tr key={c.name} className="border-b border-silver/60 last:border-0 hover:bg-frost/60">
                    <td className="px-4 py-3 font-semibold text-navy">{c.name}</td>
                    <td className="text-navy/70">{c.channel}</td>
                    <td className="font-semibold text-navy">{c.reach}</td>
                    <td className="text-xs text-navy/55">{c.date}</td>
                    <td className="px-4"><StatusBadge status={c.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Announcement */}
        <form onSubmit={(e) => { e.preventDefault(); setAnnounced(true); }} className="h-fit rounded-2xl border border-silver bg-white p-5 shadow-card">
          <h2 className="flex items-center gap-2 font-display text-base font-bold text-navy"><Megaphone className="size-4" /> New Announcement</h2>
          <label className="mt-4 block text-sm font-semibold text-navy">Title *
            <input required className="mt-1 w-full rounded-xl border border-silver px-3.5 py-2.5 text-sm outline-none focus:border-royal" placeholder="e.g. New Kids Collection is here!" />
          </label>
          <label className="mt-4 block text-sm font-semibold text-navy">Message *
            <textarea required rows={4} className="mt-1 w-full rounded-xl border border-silver px-3.5 py-2.5 text-sm outline-none focus:border-royal" placeholder="Write the announcement..." />
          </label>
          <label className="mt-4 block text-sm font-semibold text-navy">Show on
            <select className="mt-1 w-full rounded-xl border border-silver px-3.5 py-2.5 text-sm outline-none focus:border-royal">
              <option>Top Bar</option><option>Homepage Banner</option><option>Popup</option>
            </select>
          </label>
          <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-royal py-2.5 text-sm font-bold text-white hover:bg-royal-bright"><Send className="size-4" /> Publish</button>
          {announced && <p className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">Announcement published successfully.</p>}
        </form>
      </div>
    </>
  );
}

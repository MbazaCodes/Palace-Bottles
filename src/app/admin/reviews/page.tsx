"use client";
import { useState } from "react";
import { Check, X, Reply } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import Stars from "@/components/ui/Stars";

type ReviewStatus = "Pending" | "Approved" | "Rejected";
const INITIAL: { id: number; product: string; customer: string; rating: number; comment: string; date: string; status: "Pending" | "Approved" | "Rejected" }[] = [];

const TABS = ["All", "Pending", "Approved", "Rejected"] as const;

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState(INITIAL);
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replied, setReplied] = useState<Record<number, string>>({});
  const [replyText, setReplyText] = useState("");

  const setStatus = (id: number, status: ReviewStatus) => setReviews(reviews.map((r) => (r.id === id ? { ...r, status } : r)));
  const rows = reviews.filter((r) => tab === "All" || r.status === tab);
  const count = (s: ReviewStatus) => reviews.filter((r) => r.status === s).length;

  return (
    <>
      <div>
        <h1 className="font-display text-2xl font-extrabold text-navy">Reviews</h1>
        <p className="text-xs text-navy/50">Dashboard › Reviews</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[["Total Reviews", reviews.length], ["Pending", count("Pending")], ["Approved", count("Approved")], ["Rejected", count("Rejected")]].map(([l, v]) => (
          <div key={l} className="rounded-2xl border border-silver bg-white p-4 shadow-card">
            <p className="text-xs text-navy/55">{l}</p>
            <p className="font-display text-xl font-extrabold text-navy">{v}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex gap-1 rounded-2xl border border-silver bg-white p-1.5 shadow-card">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-xl px-4 py-2 text-sm font-semibold ${tab === t ? "bg-royal text-white" : "text-navy/60 hover:bg-frost"}`}>{t}</button>
        ))}
      </div>

      <div className="mt-5 space-y-4">
        {rows.length === 0 && <p className="rounded-2xl border border-silver bg-white p-8 text-center text-sm text-navy/55 shadow-card">No {tab.toLowerCase()} reviews.</p>}
        {rows.map((r) => (
          <article key={r.id} className="rounded-2xl border border-silver bg-white p-5 shadow-card">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-navy">{r.customer} <span className="font-normal text-navy/45">on</span> {r.product}</p>
                <div className="mt-1 flex items-center gap-3"><Stars rating={r.rating} /><span className="text-xs text-navy/50">{r.date}</span><StatusBadge status={r.status} /></div>
              </div>
              <div className="flex gap-2">
                {r.status !== "Approved" && <button onClick={() => setStatus(r.id, "Approved")} className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-600"><Check className="size-3.5" /> Approve</button>}
                {r.status !== "Rejected" && <button onClick={() => setStatus(r.id, "Rejected")} className="flex items-center gap-1.5 rounded-xl border border-red-200 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50"><X className="size-3.5" /> Reject</button>}
                <button onClick={() => setReplyTo(replyTo === r.id ? null : r.id)} className="flex items-center gap-1.5 rounded-xl border border-silver px-3 py-2 text-xs font-bold text-navy hover:bg-frost"><Reply className="size-3.5" /> Reply</button>
              </div>
            </div>
            <p className="mt-3 text-sm text-navy/75">&ldquo;{r.comment}&rdquo;</p>
            {replied[r.id] && <p className="mt-2 rounded-xl bg-ice/60 px-3 py-2 text-xs text-navy/70"><strong>Palace Bottles:</strong> {replied[r.id]}</p>}
            {replyTo === r.id && (
              <form className="mt-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); if (replyText.trim()) { setReplied({ ...replied, [r.id]: replyText }); setReplyText(""); setReplyTo(null); } }}>
                <input autoFocus value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write a public reply..." className="w-full rounded-xl border border-silver px-3.5 py-2.5 text-sm outline-none focus:border-royal" />
                <button className="rounded-xl bg-navy px-4 text-sm font-bold text-white hover:bg-navy-deep">Send</button>
              </form>
            )}
          </article>
        ))}
      </div>
    </>
  );
}

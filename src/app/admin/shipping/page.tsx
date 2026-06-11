"use client";
import { useState } from "react";
import Link from "next/link";
import { Truck, StickyNote } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";

type ShipStatus = "Pending" | "Shipped" | "Delivered";
const INITIAL = [
  { order: "PB785291", customer: "Juma Mwinyi", destination: "Dar es Salaam, Kinondoni", status: "Pending" as ShipStatus, note: "", updated: "May 18, 2026" },
  { order: "PB785290", customer: "Asha Mohamed", destination: "Dodoma, Dodoma Urban", status: "Pending" as ShipStatus, note: "Fragile — gift wrap", updated: "May 18, 2026" },
  { order: "PB785289", customer: "Michael John", destination: "Arusha, Arusha City", status: "Pending" as ShipStatus, note: "", updated: "May 18, 2026" },
  { order: "PB785288", customer: "Neema Paul", destination: "Mwanza, Nyamagana", status: "Shipped" as ShipStatus, note: "Via Sumry bus — receipt 88421", updated: "May 18, 2026" },
  { order: "PB785284", customer: "Rehema Ally", destination: "Morogoro, Morogoro Urban", status: "Shipped" as ShipStatus, note: "Boda dispatch 4:30 PM", updated: "May 17, 2026" },
  { order: "PB785287", customer: "David Patrick", destination: "Mbeya, Mbeya City", status: "Delivered" as ShipStatus, note: "Received by customer", updated: "May 17, 2026" },
];

const TABS: ("All" | ShipStatus)[] = ["All", "Pending", "Shipped", "Delivered"];

export default function AdminShippingPage() {
  const [rows, setRows] = useState(INITIAL);
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const [noteFor, setNoteFor] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");

  const visible = rows.filter((r) => tab === "All" || r.status === tab);
  const advance = (order: string) =>
    setRows(rows.map((r) => (r.order === order ? { ...r, status: r.status === "Pending" ? "Shipped" : "Delivered", updated: "Just now" } : r)));
  const saveNote = (order: string) => {
    setRows(rows.map((r) => (r.order === order ? { ...r, note: noteText } : r)));
    setNoteFor(null); setNoteText("");
  };
  const count = (s: ShipStatus) => rows.filter((r) => r.status === s).length;

  return (
    <>
      <div>
        <h1 className="font-display text-2xl font-extrabold text-navy">Shipping</h1>
        <p className="text-xs text-navy/50">Dashboard › Shipping</p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {[["Pending Deliveries", count("Pending")], ["Shipped Orders", count("Shipped")], ["Delivered Orders", count("Delivered")]].map(([l, v]) => (
          <div key={String(l)} className="rounded-2xl border border-silver bg-white p-4 shadow-card">
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

      <div className="mt-4 overflow-x-auto rounded-2xl border border-silver bg-white shadow-card">
        <table className="w-full min-w-[46rem] text-sm">
          <thead>
            <tr className="border-b border-silver text-left text-xs text-navy/50">
              <th className="px-4 py-3 font-medium">Order</th><th className="font-medium">Customer</th><th className="font-medium">Destination</th>
              <th className="font-medium">Tracking Note</th><th className="font-medium">Status</th><th className="font-medium">Updated</th><th className="px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((r) => (
              <tr key={r.order} className="border-b border-silver/60 last:border-0 hover:bg-frost/60 align-top">
                <td className="px-4 py-3"><Link href={`/admin/orders/${r.order}`} className="font-bold text-navy hover:text-royal">{r.order}</Link></td>
                <td className="text-navy/75">{r.customer}</td>
                <td className="text-navy/70">{r.destination}</td>
                <td className="max-w-[14rem]">
                  {noteFor === r.order ? (
                    <span className="flex gap-1.5">
                      <input autoFocus value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="e.g. Bus receipt no..."
                        className="w-full rounded-lg border border-silver px-2.5 py-1.5 text-xs outline-none focus:border-royal" />
                      <button onClick={() => saveNote(r.order)} className="rounded-lg bg-navy px-2.5 text-xs font-bold text-white">Save</button>
                    </span>
                  ) : (
                    <span className="text-xs text-navy/60">{r.note || "—"}</span>
                  )}
                </td>
                <td><StatusBadge status={r.status} /></td>
                <td className="text-xs text-navy/55">{r.updated}</td>
                <td className="px-4">
                  <span className="flex gap-1.5">
                    {r.status !== "Delivered" && (
                      <button onClick={() => advance(r.order)} className="flex items-center gap-1 rounded-lg bg-royal px-2.5 py-1.5 text-xs font-bold text-white hover:bg-royal-bright">
                        <Truck className="size-3.5" /> {r.status === "Pending" ? "Mark Shipped" : "Mark Delivered"}
                      </button>
                    )}
                    <button onClick={() => { setNoteFor(r.order); setNoteText(r.note); }} aria-label={`Add note to ${r.order}`} className="rounded-lg border border-silver p-1.5 hover:bg-frost"><StickyNote className="size-3.5 text-navy/60" /></button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

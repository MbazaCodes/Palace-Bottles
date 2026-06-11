"use client";
import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import Bottle3D from "@/components/ui/Bottle3D";

const INITIAL = [
  { slug: "thermal-flasks", name: "Thermal Flasks", nameSw: "Chupa za Chai", products: 98, active: true, body: "#16181d", accent: "#3a3f4a", shape: "flask" as const },
  { slug: "water-bottles", name: "Water Bottles", nameSw: "Chupa za Maji", products: 86, active: true, body: "#2563eb", accent: "#60a5fa", shape: "bottle" as const },
  { slug: "sports-bottles", name: "Sports Bottles", nameSw: "Chupa za Michezo", products: 63, active: true, body: "#16181d", accent: "#475569", shape: "sport" as const },
  { slug: "kids-bottles", name: "Kids Bottles", nameSw: "Chupa za Watoto", products: 48, active: true, body: "#a78bfa", accent: "#c4b5fd", shape: "kids" as const },
  { slug: "coffee-tumblers", name: "Coffee Tumblers", nameSw: "Vikombe vya Kahawa", products: 28, active: true, body: "#eef0f4", accent: "#cbd5e1", shape: "tumbler" as const },
];

export default function AdminCategoriesPage() {
  const [cats, setCats] = useState(INITIAL);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const input = "mt-1 w-full rounded-xl border border-silver bg-white px-3.5 py-2.5 text-sm outline-none focus:border-royal";

  const addCat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setCats([...cats, { slug: name.toLowerCase().replace(/\s+/g, "-"), name, nameSw: "", products: 0, active: true, body: "#102a6b", accent: "#2563eb", shape: "bottle" }]);
    setName(""); setShowForm(false);
  };

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-navy">Categories</h1>
          <p className="text-xs text-navy/50">Dashboard › Categories</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 rounded-xl bg-royal px-4 py-2.5 text-sm font-bold text-white hover:bg-royal-bright">
          {showForm ? <X className="size-4" /> : <Plus className="size-4" />} {showForm ? "Close" : "Create Category"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={addCat} className="mt-5 grid gap-4 rounded-2xl border border-silver bg-white p-5 shadow-card sm:grid-cols-3">
          <label className="text-sm font-semibold text-navy">Category Name *
            <input value={name} onChange={(e) => setName(e.target.value)} className={input} placeholder="e.g. Lunch Boxes" required />
          </label>
          <label className="text-sm font-semibold text-navy">Swahili Name
            <input className={input} placeholder="e.g. Vibox vya Chakula" />
          </label>
          <div className="flex items-end"><button className="w-full rounded-xl bg-navy py-2.5 text-sm font-bold text-white hover:bg-navy-deep">Save Category</button></div>
          <p className="text-xs text-navy/45 sm:col-span-3">Demo mode: saved locally. Phase 4 writes to the categories table.</p>
        </form>
      )}

      <div className="mt-5 overflow-x-auto rounded-2xl border border-silver bg-white shadow-card">
        <table className="w-full min-w-[40rem] text-sm">
          <thead>
            <tr className="border-b border-silver text-left text-xs text-navy/50">
              <th className="px-4 py-3 font-medium">Category</th><th className="font-medium">Slug</th>
              <th className="font-medium">Swahili</th><th className="font-medium">Products</th>
              <th className="font-medium">Status</th><th className="px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cats.map((c) => (
              <tr key={c.slug} className="border-b border-silver/60 last:border-0 hover:bg-frost/60">
                <td className="px-4 py-3">
                  <span className="flex items-center gap-2.5">
                    <span className="w-8 shrink-0 rounded-lg bg-frost p-1"><Bottle3D body={c.body} accent={c.accent} shape={c.shape} label={false} /></span>
                    <span className="font-semibold text-navy">{c.name}</span>
                  </span>
                </td>
                <td className="text-navy/60">{c.slug}</td>
                <td className="text-navy/60">{c.nameSw || "—"}</td>
                <td className="font-bold text-navy">{c.products}</td>
                <td><StatusBadge status={c.active ? "Active" : "Inactive"} /></td>
                <td className="px-4">
                  <span className="flex gap-1">
                    <button onClick={() => setCats(cats.map((x) => x.slug === c.slug ? { ...x, active: !x.active } : x))} aria-label={`Toggle ${c.name}`} className="rounded-lg border border-silver p-1.5 hover:bg-frost"><Pencil className="size-3.5 text-navy/60" /></button>
                    <button onClick={() => setCats(cats.filter((x) => x.slug !== c.slug))} aria-label={`Delete ${c.name}`} className="rounded-lg border border-red-200 p-1.5 text-red-500 hover:bg-red-50"><Trash2 className="size-3.5" /></button>
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

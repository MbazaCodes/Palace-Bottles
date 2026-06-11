"use client";
import { useState } from "react";
import Link from "next/link";
import { Plus, Eye, Pencil, ArrowDownToLine, ArrowUpFromLine, Shuffle, AlertTriangle, X, Save } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import Bottle3D from "@/components/ui/Bottle3D";
import { CategoryDonut } from "@/components/admin/Charts";
import { INVENTORY_ROWS as INIT } from "@/data/admin";

type Row = (typeof INIT)[number] & { available: number };

export default function InventoryPage() {
  const [rows, setRows] = useState<Row[]>(INIT.map((r) => ({ ...r, available: Math.max(0, r.stock - r.reserved) })));
  const [adjustFor, setAdjustFor] = useState<string | null>(null);
  const [adjQty, setAdjQty] = useState("");
  const [adjReason, setAdjReason] = useState("Restock");

  const status = (s: number) => (s === 0 ? "Out of Stock" : s <= 15 ? "Low Stock" : "In Stock");
  const total = rows.reduce((t, r) => t + r.stock, 0);
  const lowCount = rows.filter((r) => r.stock > 0 && r.stock <= 15).length;
  const oos = rows.filter((r) => r.stock === 0).length;

  const doAdjust = (sku: string) => {
    const delta = adjReason === "Remove" || adjReason === "Damaged" ? -Math.abs(Number(adjQty)) : Math.abs(Number(adjQty));
    setRows(rows.map((r) => {
      if (r.sku !== sku) return r;
      const newStock = Math.max(0, r.stock + delta);
      return { ...r, stock: newStock, available: Math.max(0, newStock - r.reserved) };
    }));
    setAdjustFor(null);
    setAdjQty("");
    setAdjReason("Restock");
  };

  const MOVEMENT = [
    { label: "Stock In", value: `+${rows.reduce((t, r) => t + r.stock, 0).toLocaleString()}`, icon: ArrowDownToLine, color: "text-emerald-600 bg-emerald-50" },
    { label: "Stock Out", value: `-${rows.reduce((t, r) => t + r.reserved, 0).toLocaleString()}`, icon: ArrowUpFromLine, color: "text-red-500 bg-red-50" },
    { label: "Adjustments", value: "+0", icon: Shuffle, color: "text-blue-600 bg-blue-50" },
    { label: "Damaged", value: "+0", icon: AlertTriangle, color: "text-amber-600 bg-amber-50" },
  ];

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-navy">Inventory Management</h1>
          <p className="text-xs text-navy/50">Dashboard › Inventory</p>
        </div>
        <Link href="/admin/products/new" className="flex items-center gap-2 rounded-xl bg-royal px-4 py-2.5 text-sm font-bold text-white hover:bg-royal-bright">
          <Plus className="size-4" /> Receive New Stock
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        {[["Total Stock Units", total.toLocaleString()], ["Low Stock Items", String(lowCount)], ["Out of Stock Items", String(oos)], ["Products Tracked", String(rows.length)], ["Avg Stock / Product", String(Math.round(total / rows.length))]].map(([l, v]) => (
          <div key={l} className="rounded-2xl border border-silver bg-white p-4 shadow-card">
            <p className="text-xs text-navy/55">{l}</p>
            <p className="font-display text-lg font-extrabold text-navy">{v}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_22rem]">
        <div className="overflow-x-auto rounded-2xl border border-silver bg-white shadow-card">
          <div className="flex items-center justify-between px-4 pt-4">
            <h2 className="font-display text-base font-bold text-navy">Inventory Overview</h2>
            <span className="text-xs text-navy/50">{rows.length} products</span>
          </div>
          <table className="mt-2 w-full min-w-[44rem] text-sm">
            <thead>
              <tr className="border-b border-silver text-left text-xs text-navy/50">
                <th className="px-4 py-3 font-medium">Product</th><th className="font-medium">SKU</th>
                <th className="font-medium">Variant</th><th className="font-medium">Stock</th>
                <th className="font-medium">Reserved</th><th className="font-medium">Available</th>
                <th className="font-medium">Status</th><th className="px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.sku} className="border-b border-silver/60 last:border-0 hover:bg-frost/60 align-top">
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2.5">
                      <span className="w-8 shrink-0 rounded-lg bg-frost p-1"><Bottle3D body={r.body} accent={r.accent} shape={r.shape} label={false} /></span>
                      <span><span className="block font-semibold text-navy">{r.name}</span><span className="text-xs text-navy/50">{r.category}</span></span>
                    </span>
                  </td>
                  <td className="text-navy/70">{r.sku}</td>
                  <td className="text-navy/70">{r.variant}</td>
                  <td className={`font-bold ${r.stock === 0 ? "text-red-500" : r.stock <= 15 ? "text-amber-600" : "text-navy"}`}>{r.stock}</td>
                  <td className="text-navy/70">{r.reserved}</td>
                  <td className="font-semibold text-navy">{r.available}</td>
                  <td><StatusBadge status={status(r.stock)} /></td>
                  <td className="px-4">
                    <span className="flex gap-1">
                      <button onClick={() => { setAdjustFor(r.sku); setAdjQty(""); }} aria-label={`Adjust ${r.name}`}
                        className="rounded-lg border border-silver px-2 py-1.5 text-xs font-semibold text-navy hover:bg-frost">
                        {adjustFor === r.sku ? "Cancel" : "Adjust"}
                      </button>
                    </span>
                    {adjustFor === r.sku && (
                      <div className="mt-2 flex flex-col gap-1.5 rounded-xl border border-royal bg-ice/40 p-2.5">
                        <select value={adjReason} onChange={(e) => setAdjReason(e.target.value)}
                          className="rounded-lg border border-silver px-2 py-1.5 text-xs outline-none">
                          <option>Restock</option><option>Remove</option><option>Damaged</option><option>Correction</option>
                        </select>
                        <input value={adjQty} onChange={(e) => setAdjQty(e.target.value.replace(/\D/g, ""))}
                          placeholder="Qty" inputMode="numeric"
                          className="rounded-lg border border-silver px-2 py-1.5 text-xs outline-none" />
                        <button onClick={() => doAdjust(r.sku)} disabled={!adjQty}
                          className="rounded-lg bg-navy px-2 py-1.5 text-xs font-bold text-white disabled:opacity-40">
                          Apply
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-silver bg-white p-5 shadow-card">
            <h2 className="font-display text-base font-bold text-navy">Stock Movement</h2>
            <ul className="mt-3 space-y-2.5">
              {MOVEMENT.map((m) => (
                <li key={m.label} className="flex items-center gap-3 text-sm">
                  <span className={`flex size-8 items-center justify-center rounded-lg ${m.color}`}><m.icon className="size-4" /></span>
                  <span className="flex-1 font-semibold text-navy">{m.label}</span>
                  <span className="font-display font-bold text-navy">{m.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-silver bg-white p-5 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-base font-bold text-navy">Low Stock Alerts</h2>
              <Link href="/admin/products" className="text-xs font-bold text-royal">View All</Link>
            </div>
            <ul className="mt-3 space-y-2.5">
              {rows.filter((r) => r.stock > 0 && r.stock <= 15).map((r) => (
                <li key={r.sku} className="flex items-center gap-2.5 text-sm">
                  <span className="w-7 shrink-0 rounded-lg bg-frost p-0.5"><Bottle3D body={r.body} accent={r.accent} shape={r.shape} label={false} /></span>
                  <span className="flex-1 font-semibold text-navy">{r.name}</span>
                  <span className="text-xs font-bold text-amber-600">{r.stock} in stock</span>
                </li>
              ))}
              {rows.filter((r) => r.stock > 0 && r.stock <= 15).length === 0 && (
                <p className="text-xs text-navy/55">All items are well stocked.</p>
              )}
            </ul>
          </div>
          <div className="rounded-2xl border border-silver bg-white p-5 shadow-card">
            <h2 className="font-display text-base font-bold text-navy">Inventory by Category</h2>
            <CategoryDonut />
          </div>
        </div>
      </div>
    </>
  );
}

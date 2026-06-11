import Link from "next/link";
import { SlidersHorizontal, Upload, Plus, Eye, Pencil, ArrowDownToLine, ArrowUpFromLine, Shuffle, AlertTriangle } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import Bottle3D from "@/components/ui/Bottle3D";
import { INVENTORY_ROWS } from "@/data/admin";
import { CategoryDonut } from "@/components/admin/Charts";

export const metadata = { title: "Inventory — Palace Bottles Admin" };

const STATS = [
  { label: "Total Stock Units", value: "8,450", delta: "+12.5%", up: true },
  { label: "Inventory Value", value: "TZS 245,680,000", delta: "+15.8%", up: true },
  { label: "Low Stock Items", value: "28", delta: "-6.7%", up: false },
  { label: "Out of Stock Items", value: "12", delta: "-2.1%", up: false },
  { label: "Incoming Stock", value: "320", delta: "View details", up: true },
];

const MOVEMENT = [
  { label: "Stock In", value: "+2,850", icon: ArrowDownToLine, color: "text-emerald-600 bg-emerald-50" },
  { label: "Stock Out", value: "-2,120", icon: ArrowUpFromLine, color: "text-red-500 bg-red-50" },
  { label: "Adjustments", value: "+320", icon: Shuffle, color: "text-blue-600 bg-blue-50" },
  { label: "Damaged", value: "+80", icon: AlertTriangle, color: "text-amber-600 bg-amber-50" },
];

export default function InventoryPage() {
  const status = (s: number) => (s === 0 ? "Out of Stock" : s <= 15 ? "Low Stock" : "In Stock");
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-navy">Inventory Management</h1>
          <p className="text-xs text-navy/50">Dashboard › Inventory</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-xl border border-silver bg-white px-4 py-2.5 text-sm font-semibold text-navy shadow-card"><SlidersHorizontal className="size-4" /> Stock Adjustment</button>
          <button className="flex items-center gap-2 rounded-xl border border-silver bg-white px-4 py-2.5 text-sm font-semibold text-navy shadow-card"><Upload className="size-4" /> Import Stock</button>
          <button className="flex items-center gap-2 rounded-xl bg-royal px-4 py-2.5 text-sm font-bold text-white hover:bg-royal-bright"><Plus className="size-4" /> Receive New Stock</button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-2xl border border-silver bg-white p-4 shadow-card">
            <p className="text-xs text-navy/55">{s.label}</p>
            <p className="font-display text-lg font-extrabold text-navy">{s.value}</p>
            <p className={`text-[11px] font-semibold ${s.up ? "text-emerald-600" : "text-red-500"}`}>{s.delta}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_22rem]">
        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-silver bg-white shadow-card">
          <div className="flex items-center justify-between px-4 pt-4">
            <h2 className="font-display text-base font-bold text-navy">Inventory Overview</h2>
            <span className="text-xs text-navy/50">120 products</span>
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
              {INVENTORY_ROWS.map((r) => (
                <tr key={r.sku} className="border-b border-silver/60 last:border-0 hover:bg-frost/60">
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
                  <td className="font-semibold text-navy">{Math.max(0, r.stock - r.reserved)}</td>
                  <td><StatusBadge status={status(r.stock)} /></td>
                  <td className="px-4">
                    <span className="flex gap-1">
                      <button aria-label={`View ${r.name}`} className="rounded-lg border border-silver p-1.5 hover:bg-frost"><Eye className="size-3.5 text-navy/60" /></button>
                      <button aria-label={`Adjust ${r.name}`} className="rounded-lg border border-silver p-1.5 hover:bg-frost"><Pencil className="size-3.5 text-navy/60" /></button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Side widgets */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-silver bg-white p-5 shadow-card">
            <h2 className="font-display text-base font-bold text-navy">Stock Movement <span className="text-xs font-normal text-navy/50">(This Month)</span></h2>
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
            <h2 className="font-display text-base font-bold text-navy">Inventory by Category</h2>
            <CategoryDonut />
          </div>
        </div>
      </div>
    </>
  );
}

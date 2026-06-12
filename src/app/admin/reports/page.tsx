"use client";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/productStore";
import { getAllOrders, type Order } from "@/lib/orders";
import { formatTZS } from "@/lib/constants";
import type { Product } from "@/data/products";

export default function AdminReportsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => { getProducts().then(setProducts); getAllOrders().then(setOrders); }, []);

  const totalRevenue = orders.reduce((t, o) => t + o.subtotal, 0);
  const avgOrder = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;
  const uniqueCustomers = new Set(orders.map((o) => o.customer.phone)).size;

  return (
    <>
      <h1 className="font-display text-2xl font-extrabold text-navy">Reports &amp; Analytics</h1>
      <p className="text-xs text-navy/50">Dashboard › Reports</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[["Total Revenue", formatTZS(totalRevenue)], ["Total Orders", orders.length], ["Avg Order Value", formatTZS(avgOrder)], ["Unique Customers", uniqueCustomers], ["Total Products", products.length], ["Products on Sale", products.filter((p) => p.oldPrice).length], ["Delivered Orders", orders.filter((o) => o.status === "Delivered").length], ["Pending Orders", orders.filter((o) => o.status === "Pending").length]].map(([l, v]) => (
          <div key={String(l)} className="rounded-2xl border border-silver bg-white p-4 shadow-card"><p className="text-xs text-navy/55">{l}</p><p className="font-display text-xl font-extrabold text-navy">{typeof v === "number" ? v.toLocaleString() : v}</p></div>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-silver bg-white p-5 shadow-card">
          <h2 className="font-display text-base font-bold text-navy">Recent Orders</h2>
          {orders.length === 0 ? <p className="mt-4 text-sm text-navy/55">No orders yet.</p> : (
            <table className="mt-3 w-full text-sm"><thead><tr className="text-left text-xs text-navy/50"><th className="py-2 font-medium">Order</th><th className="font-medium">Customer</th><th className="font-medium">Amount</th><th className="font-medium">Status</th></tr></thead>
              <tbody>{orders.slice(0, 10).map((o) => (
                <tr key={o.id} className="border-t border-silver/60"><td className="py-2 font-bold text-navy">{o.id}</td><td className="text-navy/70">{o.customer.fullName}</td><td className="font-semibold">{formatTZS(o.subtotal)}</td><td className="text-xs"><span className="rounded bg-ice px-1.5 py-0.5 font-bold text-navy">{o.status}</span></td></tr>
              ))}</tbody>
            </table>
          )}
        </div>
        <div className="rounded-2xl border border-silver bg-white p-5 shadow-card">
          <h2 className="font-display text-base font-bold text-navy">Top Products</h2>
          {products.length === 0 ? <p className="mt-4 text-sm text-navy/55">No products yet.</p> : (
            <ul className="mt-3 space-y-3">{products.slice(0, 8).map((p, i) => (
              <li key={p.id} className="flex items-center gap-3 text-sm">
                <span className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${i === 0 ? "bg-amber-500" : i === 1 ? "bg-royal" : "bg-slate-400"}`}>{i + 1}</span>
                <span className="flex-1 font-semibold text-navy">{p.name}</span>
                <span className="text-xs text-navy/55">{formatTZS(p.price)}</span>
              </li>
            ))}</ul>
          )}
        </div>
      </div>
    </>
  );
}

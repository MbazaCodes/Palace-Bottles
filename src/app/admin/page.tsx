import Link from "next/link";
import { Calendar, MoreVertical } from "lucide-react";
import KpiCard from "@/components/admin/KpiCard";
import StatusBadge from "@/components/admin/StatusBadge";
import { RevenueChart } from "@/components/admin/Charts";
import Bottle3D from "@/components/ui/Bottle3D";
import Countdown from "@/components/ui/Countdown";
import { KPIS, TOP_PRODUCTS, ADMIN_ORDERS } from "@/data/admin";

const flashTarget = new Date(Date.now() + 2 * 86400000 + 14 * 3600000);

export default function AdminDashboard() {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-navy">Dashboard</h1>
          <p className="text-sm text-navy/55">Welcome back! Here&apos;s what&apos;s happening with your store today.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-silver bg-white px-4 py-2.5 text-sm font-semibold text-navy shadow-card">
          <Calendar className="size-4" /> May 12 – May 18, 2026
        </button>
      </div>

      {/* KPIs */}
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {KPIS.slice(0, 6).map((k) => <KpiCard key={k.label} {...k} />)}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
        {KPIS.slice(6).map((k) => <KpiCard key={k.label} {...k} />)}
      </div>

      {/* Revenue + Top products */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_24rem]">
        <div className="rounded-2xl border border-silver bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-base font-bold text-navy">Revenue Overview</h2>
              <p className="font-display text-2xl font-extrabold text-navy">TZS 12,450,000 <span className="ml-1 rounded-md bg-emerald-100 px-1.5 py-0.5 text-xs font-bold text-emerald-700">+18.2%</span></p>
            </div>
            <span className="rounded-xl border border-silver px-3 py-1.5 text-xs font-semibold text-navy/65">This Week</span>
          </div>
          <div className="mt-4"><RevenueChart /></div>
        </div>

        <div className="rounded-2xl border border-silver bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-navy">Top Selling Products</h2>
            <Link href="/admin/products" className="text-xs font-bold text-royal">View All</Link>
          </div>
          <ul className="mt-4 space-y-3.5">
            {TOP_PRODUCTS.map((p, i) => (
              <li key={p.name} className="flex items-center gap-3">
                <span className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${i === 0 ? "bg-amber-500" : i === 1 ? "bg-royal" : i === 2 ? "bg-violet-500" : "bg-slate-400"}`}>{i + 1}</span>
                <div className="w-9 shrink-0 rounded-lg bg-frost p-1"><Bottle3D body={p.body} accent={p.accent} shape={p.shape} label={false} /></div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-navy">{p.name}</p>
                  <p className="text-xs text-navy/50">{p.variant} · {p.sold} sold</p>
                </div>
                <span className="text-xs font-bold text-navy">{p.revenue}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent orders + flash sale */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_26rem]">
        <div className="rounded-2xl border border-silver bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-navy">Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs font-bold text-royal">View All</Link>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[32rem] text-sm">
              <thead>
                <tr className="text-left text-xs text-navy/50">
                  <th className="py-2 font-medium">Order ID</th><th className="font-medium">Customer</th>
                  <th className="font-medium">Amount</th><th className="font-medium">Status</th>
                  <th className="font-medium">Date</th><th />
                </tr>
              </thead>
              <tbody>
                {ADMIN_ORDERS.slice(0, 5).map((o) => (
                  <tr key={o.id} className="border-t border-silver/70">
                    <td className="py-3"><Link href={`/admin/orders/${o.id}`} className="font-bold text-navy hover:text-royal">{o.id}</Link></td>
                    <td className="text-navy/75">{o.customer}</td>
                    <td className="font-semibold text-navy">TZS {o.amount.toLocaleString()}</td>
                    <td><StatusBadge status={o.status} /></td>
                    <td className="text-xs text-navy/55">{o.date.replace(", 2026", "")}</td>
                    <td><MoreVertical className="size-4 text-navy/40" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-silver bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-navy">Flash Sale Performance</h2>
            <Link href="/admin/flash-sales" className="text-xs font-bold text-royal">View All</Link>
          </div>
          <div className="mt-4 flex gap-4">
            <div className="glass-navy relative w-28 shrink-0 rounded-2xl p-3">
              <span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-2 py-1 text-[10px] font-bold text-white">30% OFF</span>
              <Bottle3D body="#16181d" accent="#3a3f4a" shape="flask" label={false} />
            </div>
            <div className="flex-1">
              <p className="font-display text-sm font-bold text-navy">Mega Flash Sale</p>
              <p className="text-xs text-navy/55">Ends in</p>
              <div className="mt-2 [&>div>div]:!min-w-[2.6rem] [&>div>div]:!bg-navy [&>div>div]:!px-1 [&>div>div]:!py-1.5">
                <Countdown target={flashTarget} light />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs"><span className="text-navy/55">Sales Progress</span><span className="font-bold text-navy">72%</span></div>
            <div className="mt-1.5 h-2 rounded-full bg-silver"><div className="h-2 w-[72%] rounded-full bg-gradient-to-r from-royal to-royal-bright" /></div>
          </div>
          <dl className="mt-4 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-frost p-3"><dt className="text-[10px] text-navy/55">Total Sales</dt><dd className="font-display text-sm font-bold text-navy">TZS 4.56M</dd></div>
            <div className="rounded-xl bg-frost p-3"><dt className="text-[10px] text-navy/55">Items Sold</dt><dd className="font-display text-sm font-bold text-navy">228</dd></div>
            <div className="rounded-xl bg-frost p-3"><dt className="text-[10px] text-navy/55">Orders</dt><dd className="font-display text-sm font-bold text-navy">156</dd></div>
          </dl>
          <div className="mt-4 rounded-xl border border-silver p-3">
            <p className="text-[10px] text-navy/55">Conversion Rate</p>
            <p className="font-display text-lg font-extrabold text-navy">8.42% <span className="text-xs font-semibold text-emerald-600">↑ 12.5% vs last sale</span></p>
          </div>
        </div>
      </div>
    </>
  );
}

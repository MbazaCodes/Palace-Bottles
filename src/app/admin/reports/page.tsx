import { MonthlyRevenueBar, CustomerGrowthLine, CategoryDonut, RevenueChart } from "@/components/admin/Charts";
import Bottle3D from "@/components/ui/Bottle3D";
import { TOP_PRODUCTS } from "@/data/admin";

export const metadata = { title: "Reports & Analytics — Palace Bottles Admin" };

const CATEGORY_PERF = [
  { name: "Water Bottles", revenue: "TZS 14.4M", orders: 412, growth: "+18%" },
  { name: "Thermal Flasks", revenue: "TZS 12.8M", orders: 356, growth: "+22%" },
  { name: "Sports Bottles", revenue: "TZS 8.2M", orders: 264, growth: "+9%" },
  { name: "Kids Bottles", revenue: "TZS 6.9M", orders: 231, growth: "+31%" },
  { name: "Coffee Tumblers", revenue: "TZS 4.5M", orders: 158, growth: "+12%" },
];

export default function AdminReportsPage() {
  return (
    <>
      <div>
        <h1 className="font-display text-2xl font-extrabold text-navy">Reports &amp; Analytics</h1>
        <p className="text-xs text-navy/50">Dashboard › Reports</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[["Revenue (This Month)", "TZS 46.8M"], ["Revenue (This Year)", "TZS 216.8M"], ["Avg Order Value", "TZS 68,400"], ["Repeat Purchase Rate", "47%"]].map(([l, v]) => (
          <div key={l} className="rounded-2xl border border-silver bg-white p-4 shadow-card">
            <p className="text-xs text-navy/55">{l}</p>
            <p className="font-display text-lg font-extrabold text-navy">{v}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-silver bg-white p-5 shadow-card">
          <h2 className="font-display text-base font-bold text-navy">Daily Revenue <span className="text-xs font-normal text-navy/50">(this week)</span></h2>
          <div className="mt-3"><RevenueChart /></div>
        </div>
        <div className="rounded-2xl border border-silver bg-white p-5 shadow-card">
          <h2 className="font-display text-base font-bold text-navy">Monthly Revenue <span className="text-xs font-normal text-navy/50">(last 6 months)</span></h2>
          <div className="mt-3"><MonthlyRevenueBar /></div>
        </div>
        <div className="rounded-2xl border border-silver bg-white p-5 shadow-card">
          <h2 className="font-display text-base font-bold text-navy">Customer Growth</h2>
          <div className="mt-3"><CustomerGrowthLine /></div>
        </div>
        <div className="rounded-2xl border border-silver bg-white p-5 shadow-card">
          <h2 className="font-display text-base font-bold text-navy">Sales by Category</h2>
          <CategoryDonut />
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-silver bg-white p-5 shadow-card">
          <h2 className="font-display text-base font-bold text-navy">Best Sellers</h2>
          <ul className="mt-3 space-y-3">
            {TOP_PRODUCTS.map((p, i) => (
              <li key={p.name} className="flex items-center gap-2.5 text-sm">
                <span className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${i === 0 ? "bg-amber-500" : i === 1 ? "bg-royal" : i === 2 ? "bg-violet-500" : "bg-slate-400"}`}>{i + 1}</span>
                <span className="w-8 shrink-0 rounded-lg bg-frost p-1"><Bottle3D body={p.body} accent={p.accent} shape={p.shape} label={false} /></span>
                <span className="min-w-0 flex-1 truncate font-semibold text-navy">{p.name}</span>
                <span className="text-xs text-navy/55">{p.sold} sold</span>
                <span className="text-xs font-bold text-navy">{p.revenue}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-silver bg-white shadow-card">
          <h2 className="px-4 pt-4 font-display text-base font-bold text-navy">Category Performance</h2>
          <table className="mt-2 w-full min-w-[24rem] text-sm">
            <thead><tr className="border-b border-silver text-left text-xs text-navy/50"><th className="px-4 py-3 font-medium">Category</th><th className="font-medium">Revenue</th><th className="font-medium">Orders</th><th className="px-4 font-medium">Growth</th></tr></thead>
            <tbody>
              {CATEGORY_PERF.map((c) => (
                <tr key={c.name} className="border-b border-silver/60 last:border-0 hover:bg-frost/60">
                  <td className="px-4 py-3 font-semibold text-navy">{c.name}</td>
                  <td className="font-semibold text-navy">{c.revenue}</td>
                  <td className="text-navy/70">{c.orders}</td>
                  <td className="px-4 font-bold text-emerald-600">{c.growth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

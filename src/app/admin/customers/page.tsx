"use client";
import { useEffect, useState } from "react";
import { Search, Phone } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";

interface Customer {
  id: string; full_name: string; phone: string; email?: string; region?: string;
  created_at: string; orders?: { id: string; subtotal: number; status: string }[];
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [q, setQ] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/customers").then((r) => r.json()).then((d) => { setCustomers(Array.isArray(d) ? d : []); setLoaded(true); }).catch(() => setLoaded(true));
  }, []);

  const rows = customers.filter((c) => !q || `${c.full_name} ${c.phone} ${c.email ?? ""}`.toLowerCase().includes(q.toLowerCase()));
  const initials = (n: string) => n.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const colors = ["bg-blue-100 text-blue-700", "bg-rose-100 text-rose-700", "bg-emerald-100 text-emerald-700", "bg-violet-100 text-violet-700", "bg-amber-100 text-amber-700"];

  const totalSpent = (c: Customer) => (c.orders ?? []).reduce((t, o) => t + Number(o.subtotal), 0);

  return (
    <>
      <h1 className="font-display text-2xl font-extrabold text-navy">Customers</h1>
      <p className="text-xs text-navy/50">Dashboard › Customers</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        {[["Total Customers", customers.length], ["With Orders", customers.filter((c) => (c.orders?.length ?? 0) > 0).length], ["Total Orders", customers.reduce((t, c) => t + (c.orders?.length ?? 0), 0)], ["Total Revenue", `TZS ${customers.reduce((t, c) => t + totalSpent(c), 0).toLocaleString()}`]].map(([l, v]) => (
          <div key={String(l)} className="rounded-2xl border border-silver bg-white p-4 shadow-card">
            <p className="text-xs text-navy/55">{l}</p>
            <p className="font-display text-xl font-extrabold text-navy">{v}</p>
          </div>
        ))}
      </div>

      <label className="mt-5 flex items-center gap-2 rounded-2xl border border-silver bg-white px-4 py-3 shadow-card">
        <Search className="size-4 text-navy/45" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, phone or email..." className="w-full bg-transparent text-sm outline-none placeholder:text-navy/40" />
      </label>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-silver bg-white shadow-card">
        <table className="w-full min-w-[40rem] text-sm">
          <thead><tr className="border-b border-silver text-left text-xs text-navy/50">
            <th className="px-4 py-3 font-medium">Customer</th><th className="font-medium">Phone</th><th className="font-medium">Email</th>
            <th className="font-medium">Region</th><th className="font-medium">Orders</th><th className="font-medium">Total Spent</th><th className="font-medium">Joined</th><th className="px-4 font-medium">Contact</th>
          </tr></thead>
          <tbody>
            {rows.length === 0 && loaded && <tr><td colSpan={8} className="px-4 py-8 text-center text-sm text-navy/55">{customers.length === 0 ? "No customers yet. Customers appear here after their first order." : "No results."}</td></tr>}
            {rows.map((c) => (
              <tr key={c.id} className="border-b border-silver/60 last:border-0 hover:bg-frost/60">
                <td className="px-4 py-3"><span className="flex items-center gap-2.5"><span className={`flex size-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${colors[c.full_name.length % 5]}`}>{initials(c.full_name)}</span><span className="font-semibold text-navy">{c.full_name}</span></span></td>
                <td className="text-navy/75">{c.phone}</td>
                <td className="text-navy/75">{c.email ?? "—"}</td>
                <td className="text-navy/75">{c.region ?? "—"}</td>
                <td className="font-bold text-navy">{c.orders?.length ?? 0}</td>
                <td className="font-semibold text-navy">TZS {totalSpent(c).toLocaleString()}</td>
                <td className="text-xs text-navy/55">{new Date(c.created_at).toLocaleDateString()}</td>
                <td className="px-4"><a href={`https://wa.me/${c.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-bold text-emerald-600 hover:bg-emerald-100">WhatsApp</a></td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="px-4 py-3 text-xs text-navy/55">{loaded ? `${rows.length} customer${rows.length !== 1 ? "s" : ""}` : "Loading..."}</p>
      </div>
    </>
  );
}

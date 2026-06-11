"use client";
import { useMemo, useState } from "react";
import { Search, Phone } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { ADMIN_CUSTOMERS } from "@/data/admin";

const STATS = [
  { label: "Total Customers", value: "8,450", delta: "+12.4%", up: true },
  { label: "Active Customers", value: "6,230", delta: "+8.7%", up: true },
  { label: "New This Month", value: "620", delta: "+15.3%", up: true },
  { label: "Returning Customers", value: "3,980", delta: "+9.1%", up: true },
  { label: "Total Spent (All Time)", value: "TZS 1.28B", delta: "+18.6%", up: true },
];

function Wa({ phone, name }: { phone: string; name: string }) {
  return (
    <a href={`https://wa.me/${phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${name}`}
      className="flex size-8 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100">
      <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden><path d="M12.05 2a9.9 9.9 0 0 0-8.57 14.86L2 22l5.27-1.38A9.9 9.9 0 1 0 12.05 2zm5.42 12.38c-.25.7-1.43 1.33-2 1.42-.51.07-1.16.1-1.87-.12a16 16 0 0 1-1.7-.63c-2.98-1.29-4.93-4.29-5.08-4.49-.15-.2-1.22-1.62-1.22-3.09 0-1.48.77-2.2 1.04-2.5.28-.3.6-.37.8-.37l.57.01c.18.01.43-.07.67.51.25.6.84 2.07.92 2.22.07.15.12.32.02.52-.1.2-.15.33-.3.5-.15.17-.32.39-.45.52-.15.15-.3.31-.13.61.17.3.77 1.27 1.65 2.06 1.14 1.02 2.1 1.33 2.4 1.48.29.15.47.13.64-.07.17-.2.74-.87.94-1.17.2-.3.4-.25.67-.15.27.1 1.73.82 2.03.97.3.15.49.23.57.35.07.13.07.72-.18 1.42z"/></svg>
    </a>
  );
}

export default function AdminCustomersPage() {
  const [q, setQ] = useState("");
  const rows = useMemo(
    () => ADMIN_CUSTOMERS.filter((c) => q === "" || c.name.toLowerCase().includes(q.toLowerCase()) || c.phone.includes(q) || c.email.toLowerCase().includes(q.toLowerCase())),
    [q]
  );
  const initials = (n: string) => n.split(" ").map((w) => w[0]).join("").slice(0, 2);
  const avatarColor = (n: string) => ["bg-blue-100 text-blue-700", "bg-rose-100 text-rose-700", "bg-emerald-100 text-emerald-700", "bg-violet-100 text-violet-700", "bg-amber-100 text-amber-700"][n.length % 5];

  return (
    <>
      <div>
        <h1 className="font-display text-2xl font-extrabold text-navy">Customers</h1>
        <p className="text-xs text-navy/50">Dashboard › Customers</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-2xl border border-silver bg-white p-4 shadow-card">
            <p className="text-xs text-navy/55">{s.label}</p>
            <p className="font-display text-lg font-extrabold text-navy">{s.value}</p>
            <p className="text-[11px] font-semibold text-emerald-600">{s.delta} vs last month</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_19rem]">
        <div>
          <label className="flex items-center gap-2 rounded-2xl border border-silver bg-white px-4 py-3 shadow-card">
            <Search className="size-4 text-navy/45" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, phone or email..." aria-label="Search customers"
              className="w-full bg-transparent text-sm outline-none placeholder:text-navy/40" />
          </label>

          <div className="mt-4 overflow-x-auto rounded-2xl border border-silver bg-white shadow-card">
            <table className="w-full min-w-[50rem] text-sm">
              <thead>
                <tr className="border-b border-silver text-left text-xs text-navy/50">
                  <th className="px-4 py-3 font-medium">Customer</th><th className="font-medium">Phone</th>
                  <th className="font-medium">Email</th><th className="font-medium">Location</th>
                  <th className="font-medium">Orders</th><th className="font-medium">Total Spent</th>
                  <th className="font-medium">Last Order</th><th className="font-medium">Status</th><th className="px-4 font-medium">Contact</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((c) => (
                  <tr key={c.phone} className="border-b border-silver/60 last:border-0 hover:bg-frost/60">
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-2.5">
                        <span className={`flex size-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${avatarColor(c.name)}`}>{initials(c.name)}</span>
                        <span><span className="block font-semibold text-navy">{c.name}</span><span className="text-xs text-navy/50">Joined {c.joined}</span></span>
                      </span>
                    </td>
                    <td className="text-navy/75">{c.phone}</td>
                    <td className="text-navy/75">{c.email}</td>
                    <td className="text-navy/75">{c.location}</td>
                    <td className="font-bold text-navy">{c.orders}</td>
                    <td className="font-semibold text-navy">{c.spent}</td>
                    <td className="text-xs text-navy/55">{c.lastOrder}</td>
                    <td><StatusBadge status={c.active ? "Active" : "Inactive"} /></td>
                    <td className="px-4">
                      <span className="flex gap-1.5">
                        <Wa phone={c.phone} name={c.name} />
                        <a href={`tel:${c.phone.replace(/\s/g, "")}`} aria-label={`Call ${c.name}`} className="flex size-8 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100"><Phone className="size-3.5" /></a>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="px-4 py-3 text-xs text-navy/55">Showing 1 to {rows.length} of 8,450 customers</p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-silver bg-white p-5 shadow-card">
            <h2 className="font-display text-base font-bold text-navy">Quick Contact</h2>
            <p className="text-xs text-navy/50">Contact your customers directly</p>
            <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-emerald-50 p-3"><dd className="font-display text-sm font-bold text-navy">6,230</dd><dt className="text-[10px] text-navy/55">WhatsApp</dt></div>
              <div className="rounded-xl bg-blue-50 p-3"><dd className="font-display text-sm font-bold text-navy">7,890</dd><dt className="text-[10px] text-navy/55">Phone Numbers</dt></div>
              <div className="rounded-xl bg-red-50 p-3"><dd className="font-display text-sm font-bold text-navy">5,540</dd><dt className="text-[10px] text-navy/55">Email Addresses</dt></div>
            </dl>
          </div>
          <div className="rounded-2xl border border-silver bg-white p-5 shadow-card">
            <h2 className="font-display text-base font-bold text-navy">Recently Added Customers</h2>
            <ul className="mt-3 space-y-3">
              {[["Salim Rajab", "+255 713 222 111", "May 18, 2026"], ["Nadia Hussein", "+255 715 888 222", "May 18, 2026"], ["Hamisi Said", "+255 762 333 444", "May 17, 2026"], ["Mariam Jafari", "+255 657 999 555", "May 17, 2026"], ["Yusuf Rashid", "+255 688 111 333", "May 16, 2026"]].map(([n, p, d]) => (
                <li key={p} className="flex items-center justify-between gap-2 text-sm">
                  <span><span className="block font-semibold text-navy">{n}</span><span className="text-xs text-navy/50">{p} · {d}</span></span>
                  <Wa phone={p} name={n} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

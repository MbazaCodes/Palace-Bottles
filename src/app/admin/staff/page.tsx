"use client";
import { useState } from "react";
import { Plus, X, ShieldCheck } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";

const ROLES = [
  { name: "Super Admin", access: "Full Access", color: "bg-navy text-white" },
  { name: "Inventory Manager", access: "Stock Only", color: "bg-emerald-100 text-emerald-700" },
  { name: "Order Manager", access: "Orders Only", color: "bg-blue-100 text-blue-700" },
  { name: "Customer Support", access: "Customers & Reviews", color: "bg-violet-100 text-violet-700" },
  { name: "Marketing Manager", access: "Promotions Only", color: "bg-amber-100 text-amber-700" },
];

const STAFF_INIT = [
  { name: "Palace Admin", email: "admin@palacebottles.com", role: "Super Admin", lastActive: "Online now", active: true },
  { name: "Abel Kyalaaliko", email: "kyalaalikoabel@gmail.com", role: "Super Admin", lastActive: "2 hours ago", active: true },
  { name: "Zawadi Komba", email: "zawadi@palacebottles.com", role: "Order Manager", lastActive: "Yesterday", active: true },
  { name: "Frank Mallya", email: "frank@palacebottles.com", role: "Inventory Manager", lastActive: "3 days ago", active: true },
  { name: "Grace Mhando", email: "grace@palacebottles.com", role: "Customer Support", lastActive: "May 10, 2026", active: false },
];

export default function AdminStaffPage() {
  const [staff, setStaff] = useState(STAFF_INIT);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "Order Manager" });
  const input = "mt-1 w-full rounded-xl border border-silver bg-white px-3.5 py-2.5 text-sm outline-none focus:border-royal";

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setStaff([...staff, { ...form, lastActive: "Invited", active: true }]);
    setForm({ name: "", email: "", role: "Order Manager" }); setShowForm(false);
  };

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-navy">Staff &amp; Roles</h1>
          <p className="text-xs text-navy/50">Dashboard › Staff &amp; Roles</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 rounded-xl bg-royal px-4 py-2.5 text-sm font-bold text-white hover:bg-royal-bright">
          {showForm ? <X className="size-4" /> : <Plus className="size-4" />} {showForm ? "Close" : "Add Staff"}
        </button>
      </div>

      {/* Roles */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        {ROLES.map((r) => (
          <div key={r.name} className="rounded-2xl border border-silver bg-white p-4 shadow-card">
            <ShieldCheck className="size-5 text-royal" />
            <p className="mt-2 font-display text-sm font-bold text-navy">{r.name}</p>
            <span className={`mt-1.5 inline-block rounded-md px-2 py-1 text-[10px] font-bold ${r.color}`}>{r.access}</span>
          </div>
        ))}
      </div>

      {showForm && (
        <form onSubmit={add} className="mt-5 grid gap-4 rounded-2xl border border-silver bg-white p-5 shadow-card sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-sm font-semibold text-navy">Full Name *<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} required /></label>
          <label className="text-sm font-semibold text-navy">Email *<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={input} required /></label>
          <label className="text-sm font-semibold text-navy">Role
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={input}>
              {ROLES.map((r) => <option key={r.name}>{r.name}</option>)}
            </select>
          </label>
          <div className="flex items-end"><button className="w-full rounded-xl bg-navy py-2.5 text-sm font-bold text-white hover:bg-navy-deep">Send Invite</button></div>
          <p className="text-xs text-navy/45 lg:col-span-4">Demo mode: Phase 4 creates the auth user + admin_users row with the selected role.</p>
        </form>
      )}

      <div className="mt-5 overflow-x-auto rounded-2xl border border-silver bg-white shadow-card">
        <table className="w-full min-w-[40rem] text-sm">
          <thead>
            <tr className="border-b border-silver text-left text-xs text-navy/50">
              <th className="px-4 py-3 font-medium">Staff</th><th className="font-medium">Email</th>
              <th className="font-medium">Role</th><th className="font-medium">Last Active</th>
              <th className="font-medium">Status</th><th className="px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((s) => (
              <tr key={s.email} className="border-b border-silver/60 last:border-0 hover:bg-frost/60">
                <td className="px-4 py-3 font-semibold text-navy">{s.name}</td>
                <td className="text-navy/70">{s.email}</td>
                <td><span className="rounded-md bg-ice px-2 py-1 text-[11px] font-semibold text-navy">{s.role}</span></td>
                <td className="text-xs text-navy/55">{s.lastActive}</td>
                <td><StatusBadge status={s.active ? "Active" : "Inactive"} /></td>
                <td className="px-4">
                  <button onClick={() => setStaff(staff.map((x) => x.email === s.email ? { ...x, active: !x.active } : x))}
                    className="rounded-lg border border-silver px-2.5 py-1.5 text-xs font-semibold text-navy hover:bg-frost">
                    {s.active ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

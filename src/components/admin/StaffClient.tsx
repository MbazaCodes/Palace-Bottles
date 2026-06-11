"use client";
import { useEffect, useState } from "react";
import { Plus, X, ShieldCheck, Trash2, Power, Eye, EyeOff, KeyRound } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { getStaff, saveStaff, ROLE_INFO, currentAdmin, type Staff, type StaffRole } from "@/lib/adminAuth";

const EMPTY = { name: "", email: "", phone: "", role: "Order Manager" as StaffRole, password: "" };

export default function StaffClient() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [me, setMe] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [revealPw, setRevealPw] = useState<string | null>(null);

  useEffect(() => {
    setStaff(getStaff());
    setMe(currentAdmin()?.email ?? null);
  }, []);

  const persist = (next: Staff[]) => { setStaff(next); saveStaff(next); };

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const email = form.email.trim().toLowerCase();
    if (!form.name.trim() || !email || !form.password.trim()) { setError("Name, email and password are required."); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (staff.some((s) => s.email.toLowerCase() === email)) { setError("A staff member with this email already exists."); return; }
    const member: Staff = {
      id: `ST-${String(staff.length + 1).padStart(3, "0")}-${Date.now().toString().slice(-4)}`,
      name: form.name.trim(), email, phone: form.phone.trim() || "—",
      role: form.role, password: form.password,
      active: true,
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    persist([member, ...staff]);
    setForm(EMPTY);
    setShowForm(false);
    setNotice(`${member.name} added as ${member.role}. They can now sign in at /admin/login with their email and password.`);
  };

  const toggle = (id: string) => persist(staff.map((s) => (s.id === id ? { ...s, active: !s.active } : s)));
  const remove = (id: string) => persist(staff.filter((s) => s.id !== id));

  const initials = (n: string) => n.split(" ").map((w) => w[0]).join("").slice(0, 2);
  const roleColor = (r: StaffRole) => ROLE_INFO.find((x) => x.role === r)?.color ?? "bg-slate-100 text-slate-600";
  const input = "mt-1 w-full rounded-xl border border-silver bg-white px-3.5 py-2.5 text-sm outline-none focus:border-royal";

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-navy">Staff &amp; Roles</h1>
          <p className="text-xs text-navy/50">Dashboard › Staff &amp; Roles</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setNotice(""); }}
          className="flex items-center gap-2 rounded-xl bg-royal px-4 py-2.5 text-sm font-bold text-white hover:bg-royal-bright">
          {showForm ? <X className="size-4" /> : <Plus className="size-4" />} {showForm ? "Close" : "Add Staff"}
        </button>
      </div>

      {notice && <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{notice}</p>}

      {/* Add staff form */}
      {showForm && (
        <form onSubmit={add} className="mt-5 rounded-2xl border border-silver bg-white p-5 shadow-card">
          <h2 className="font-display text-base font-bold text-navy">Create Staff Account</h2>
          <p className="text-xs text-navy/55">The new staff member signs in at <span className="font-semibold">/admin/login</span> and only sees the modules their role allows.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <label className="text-sm font-semibold text-navy">Full Name *
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} placeholder="e.g. Neema Joseph" />
            </label>
            <label className="text-sm font-semibold text-navy">Email *
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={input} placeholder="name@palacebottles.com" />
            </label>
            <label className="text-sm font-semibold text-navy">Phone
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={input} placeholder="+255 7XX XXX XXX" inputMode="tel" />
            </label>
            <label className="text-sm font-semibold text-navy">Role *
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as StaffRole })} className={input}>
                {ROLE_INFO.map((r) => <option key={r.role}>{r.role}</option>)}
              </select>
              <span className="mt-1 block text-xs font-normal text-navy/55">{ROLE_INFO.find((r) => r.role === form.role)?.access}</span>
            </label>
            <label className="text-sm font-semibold text-navy">Password *
              <span className="mt-1 flex items-center gap-2 rounded-xl border border-silver bg-white px-3.5 py-2.5 focus-within:border-royal">
                <input type={showPw ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full text-sm outline-none" placeholder="Min. 6 characters" autoComplete="new-password" />
                <button type="button" onClick={() => setShowPw(!showPw)} aria-label={showPw ? "Hide password" : "Show password"}>
                  {showPw ? <EyeOff className="size-4 text-navy/45" /> : <Eye className="size-4 text-navy/45" />}
                </button>
              </span>
            </label>
            <div className="flex items-end">
              <button type="submit" className="w-full rounded-xl bg-navy py-2.5 text-sm font-bold text-white hover:bg-navy-deep">Create Account</button>
            </div>
          </div>
          {error && <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>}
        </form>
      )}

      {/* Role permission cards */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {ROLE_INFO.map((r) => (
          <div key={r.role} className="rounded-2xl border border-silver bg-white p-4 shadow-card">
            <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-bold ${r.color}`}>
              <ShieldCheck className="size-3" /> {r.role}
            </span>
            <p className="mt-2 text-xs text-navy/60">{r.access}</p>
            <p className="mt-2 text-[11px] font-semibold text-navy/45">{staff.filter((s) => s.role === r.role).length} member(s)</p>
          </div>
        ))}
      </div>

      {/* Staff table */}
      <div className="mt-5 overflow-x-auto rounded-2xl border border-silver bg-white shadow-card">
        <table className="w-full min-w-[52rem] text-sm">
          <thead>
            <tr className="border-b border-silver text-left text-xs text-navy/50">
              <th className="px-4 py-3 font-medium">Staff Member</th><th className="font-medium">Phone</th>
              <th className="font-medium">Role</th><th className="font-medium">Login Password</th>
              <th className="font-medium">Added</th><th className="font-medium">Status</th><th className="px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((s) => {
              const isMe = me !== null && s.email.toLowerCase() === me.toLowerCase();
              const isRoot = s.id === "ST-001";
              return (
                <tr key={s.id} className="border-b border-silver/60 last:border-0 hover:bg-frost/60">
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2.5">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ice text-[11px] font-bold text-navy">{initials(s.name)}</span>
                      <span>
                        <span className="block font-semibold text-navy">{s.name} {isMe && <span className="rounded bg-royal px-1.5 py-0.5 text-[9px] font-bold text-white">You</span>}</span>
                        <span className="text-xs text-navy/50">{s.email}</span>
                      </span>
                    </span>
                  </td>
                  <td className="text-navy/70">{s.phone}</td>
                  <td><span className={`rounded-md px-2 py-1 text-[11px] font-bold ${roleColor(s.role)}`}>{s.role}</span></td>
                  <td>
                    <button onClick={() => setRevealPw(revealPw === s.id ? null : s.id)}
                      className="flex items-center gap-1.5 rounded-lg border border-silver px-2 py-1 text-xs font-semibold text-navy/65 hover:bg-frost">
                      <KeyRound className="size-3" /> {revealPw === s.id ? s.password : "••••••"}
                    </button>
                  </td>
                  <td className="text-xs text-navy/55">{s.createdAt}</td>
                  <td><StatusBadge status={s.active ? "Active" : "Inactive"} /></td>
                  <td className="px-4">
                    <span className="flex gap-1.5">
                      <button onClick={() => toggle(s.id)} disabled={isRoot} aria-label={s.active ? `Deactivate ${s.name}` : `Activate ${s.name}`}
                        className="rounded-lg border border-silver p-1.5 hover:bg-frost disabled:opacity-30">
                        <Power className={`size-3.5 ${s.active ? "text-emerald-600" : "text-navy/40"}`} />
                      </button>
                      <button onClick={() => remove(s.id)} disabled={isRoot} aria-label={`Remove ${s.name}`}
                        className="rounded-lg border border-red-200 p-1.5 text-red-500 hover:bg-red-50 disabled:opacity-30">
                        <Trash2 className="size-3.5" />
                      </button>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="px-4 py-3 text-xs text-navy/55">
          {staff.length} staff member(s). Deactivated staff cannot sign in. Demo mode: accounts live in this browser — Phase 4 moves them to the <code className="rounded bg-frost px-1">admin_users</code> table with Supabase Auth.
        </p>
      </div>
    </>
  );
}

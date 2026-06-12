"use client";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

interface Log { id: string; action: string; entity: string; entity_id?: string; created_at: string; admin?: { full_name: string } }

export default function AdminActivityLogsPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => { fetch("/api/activity-logs").then((r) => r.json()).then((d) => setLogs(Array.isArray(d) ? d : [])).catch(() => {}); }, []);

  const rows = logs.filter((l) => !q || `${l.action} ${l.entity} ${l.admin?.full_name ?? ""}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <h1 className="font-display text-2xl font-extrabold text-navy">Activity Logs</h1>
      <p className="text-xs text-navy/50">Dashboard › Activity Logs</p>

      <label className="mt-6 flex items-center gap-2 rounded-2xl border border-silver bg-white px-4 py-3 shadow-card">
        <Search className="size-4 text-navy/45" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by action or entity..." className="w-full bg-transparent text-sm outline-none placeholder:text-navy/40" />
      </label>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-silver bg-white shadow-card">
        <table className="w-full min-w-[36rem] text-sm">
          <thead><tr className="border-b border-silver text-left text-xs text-navy/50"><th className="px-4 py-3 font-medium">User</th><th className="font-medium">Action</th><th className="font-medium">Entity</th><th className="px-4 font-medium">Date</th></tr></thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={4} className="px-4 py-8 text-center text-sm text-navy/55">No activity logs yet. Actions will appear here as you use the admin panel.</td></tr>}
            {rows.map((l) => (
              <tr key={l.id} className="border-b border-silver/60 last:border-0 hover:bg-frost/60">
                <td className="px-4 py-3 font-semibold text-navy">{l.admin?.full_name ?? "System"}</td>
                <td><span className="rounded-md bg-blue-100 px-2 py-1 text-[11px] font-bold text-blue-700">{l.action}</span></td>
                <td className="text-navy/70">{l.entity}{l.entity_id ? ` #${l.entity_id}` : ""}</td>
                <td className="px-4 text-xs text-navy/55">{new Date(l.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

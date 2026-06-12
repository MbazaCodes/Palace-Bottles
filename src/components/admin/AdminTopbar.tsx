"use client";
import { useEffect, useState } from "react";
import { Search, Bell, ChevronDown, LogOut } from "lucide-react";
import { currentAdmin, logoutAdmin, type AdminSession } from "@/lib/adminAuth";

export default function AdminTopbar() {
  const [admin, setAdmin] = useState<AdminSession | null>(null);
  useEffect(() => { setAdmin(currentAdmin()); }, []);

  const initials = admin?.name
    ? admin.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "—";

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-silver bg-white/90 px-4 py-3 backdrop-blur-md lg:px-8">
      <label className="ml-12 flex w-full max-w-md items-center gap-2 rounded-xl border border-silver bg-frost px-3.5 py-2.5 lg:ml-0">
        <Search className="size-4 text-navy/45" />
        <input placeholder="Search orders, customers, products..." aria-label="Search admin"
          className="w-full bg-transparent text-sm outline-none placeholder:text-navy/40" />
      </label>
      <div className="flex items-center gap-2">
        <button aria-label="Notifications" className="relative rounded-full p-2 hover:bg-frost">
          <Bell className="size-5 text-navy/70" />
        </button>
        <div className="flex items-center gap-2 rounded-xl px-2 py-1.5">
          <span className="flex size-9 items-center justify-center rounded-full bg-ice font-display text-xs font-bold text-navy">
            {initials}
          </span>
          {admin && (
            <span className="hidden text-left md:block">
              <span className="block text-sm font-bold text-navy">{admin.name}</span>
              <span className="block text-xs text-navy/55">{admin.role}</span>
            </span>
          )}
        </div>
      </div>
    </header>
  );
}

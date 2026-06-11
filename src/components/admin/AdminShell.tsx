"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import AdminTopbar from "./AdminTopbar";
import { isAdminLoggedIn, currentAdmin, canAccess } from "@/lib/adminAuth";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/admin/login";
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    const ok = isAdminLoggedIn();
    setAuthed(ok);
    if (!ok && !isLogin) { router.replace("/admin/login"); return; }
    // Role gate: staff can only open the modules their role allows
    if (ok && !isLogin) {
      const session = currentAdmin();
      if (session && pathname && !canAccess(session.role, pathname)) router.replace("/admin");
    }
  }, [pathname, isLogin, router]);

  if (isLogin) return <>{children}</>;

  if (!authed) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-navy-night">
        <div className="flex flex-col items-center gap-3 text-white/70">
          <img src="/logo-mark.png" alt="" className="size-12 animate-pulse rounded-2xl" />
          <p className="text-sm">Checking admin session…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-frost">
      <Sidebar />
      <div className="lg:pl-60">
        <AdminTopbar />
        <div className="px-4 py-6 lg:px-8">{children}</div>
        <p className="px-4 pb-6 text-xs text-navy/45 lg:px-8">© 2026 Palace Bottles. All rights reserved.</p>
      </div>
    </div>
  );
}

"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logoutAdmin, currentAdmin, canAccess, type AdminSession } from "@/lib/adminAuth";
import {
  LayoutDashboard, ShoppingCart, Package, LayoutGrid, Boxes, Users, Star, Ticket, Zap,
  Gift, Share2, CreditCard, Truck, Megaphone, Bell, BarChart3, FileText, UserCog,
  History, Settings, ChevronLeft, Menu, X, LogOut,
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: LayoutGrid },
  { href: "/admin/inventory", label: "Inventory", icon: Boxes },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/coupons", label: "Coupons", icon: Ticket },
  { href: "/admin/flash-sales", label: "Flash Sales", icon: Zap },
  { href: "/admin/loyalty", label: "Loyalty Program", icon: Gift },
  { href: "/admin/referrals", label: "Referrals", icon: Share2 },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/shipping", label: "Shipping", icon: Truck },
  { href: "/admin/marketing", label: "Marketing", icon: Megaphone },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/staff", label: "Staff & Roles", icon: UserCog },
  { href: "/admin/activity-logs", label: "Activity Logs", icon: History },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<AdminSession | null>(null);
  useEffect(() => { setSession(currentAdmin()); }, [pathname]);
  const visibleNav = session ? NAV.filter((n) => canAccess(session.role, n.href)) : NAV;

  const nav = (
    <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4" aria-label="Admin">
      {visibleNav.map((n) => {
        const active = n.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(n.href);
        return (
          <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${active ? "bg-royal text-white" : "text-white/70 hover:bg-white/8 hover:text-white"}`}>
            <n.icon className="size-4.5 shrink-0" />
            {n.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button onClick={() => setOpen(true)} aria-label="Open admin menu"
        className="fixed left-4 top-4 z-40 rounded-xl bg-navy-night p-2.5 text-white shadow-glass lg:hidden">
        <Menu className="size-5" />
      </button>
      {open && <div className="fixed inset-0 z-40 bg-navy-night/60 lg:hidden" onClick={() => setOpen(false)} aria-hidden />}

      <aside className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col bg-navy-night text-white transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between gap-2 px-5 py-5">
          <Link href="/admin" className="flex items-center gap-2">
            <img src="/logo-full.png" alt="Palace Bottles" className="h-9 w-auto" />
          </Link>
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="rounded-lg p-1.5 hover:bg-white/10 lg:hidden"><X className="size-5" /></button>
        </div>
        {nav}
        <div className="mx-3 mb-4 grid grid-cols-2 gap-2">
          <Link href="/" className="flex items-center justify-center gap-1.5 rounded-xl bg-white/5 px-2 py-2.5 text-xs font-semibold text-white/70 hover:text-white">
            <ChevronLeft className="size-4" /> Store
          </Link>
          <button onClick={() => { logoutAdmin(); router.replace("/admin/login"); }}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-red-500/15 px-2 py-2.5 text-xs font-semibold text-red-300 hover:bg-red-500/25 hover:text-red-200">
            <LogOut className="size-4" /> Log Out
          </button>
        </div>
      </aside>
    </>
  );
}

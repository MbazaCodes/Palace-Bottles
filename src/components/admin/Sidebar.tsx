"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, ShoppingCart, Package, LayoutGrid, Boxes, Users, Star, Ticket, Zap,
  Gift, Share2, CreditCard, Truck, Megaphone, Bell, BarChart3, FileText, UserCog,
  History, Settings, Headset, ChevronLeft, Menu, X,
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
  const [open, setOpen] = useState(false);

  const nav = (
    <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4" aria-label="Admin">
      {NAV.map((n) => {
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
            <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-royal to-navy font-display text-lg font-extrabold">B</span>
            <span className="font-display text-base font-bold leading-tight">Palace<br />Bottles</span>
          </Link>
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="rounded-lg p-1.5 hover:bg-white/10 lg:hidden"><X className="size-5" /></button>
        </div>
        {nav}
        <div className="m-3 rounded-2xl bg-white/5 p-4">
          <p className="flex items-center gap-2 text-sm font-bold"><Headset className="size-4" /> Need Help?</p>
          <p className="mt-1 text-xs text-white/60">Our support team is ready to help you.</p>
          <Link href="/contact" className="mt-3 block rounded-xl bg-royal py-2 text-center text-xs font-bold hover:bg-royal-bright">Contact Support</Link>
        </div>
        <Link href="/" className="mx-3 mb-4 flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2.5 text-xs font-semibold text-white/70 hover:text-white">
          <ChevronLeft className="size-4" /> Back to Store
        </Link>
      </aside>
    </>
  );
}

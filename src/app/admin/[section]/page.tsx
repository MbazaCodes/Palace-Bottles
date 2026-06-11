import Link from "next/link";
import { Hammer } from "lucide-react";

const TITLES: Record<string, string> = {
  categories: "Categories", reviews: "Reviews", coupons: "Coupons", "flash-sales": "Flash Sales",
  loyalty: "Loyalty Program", referrals: "Referrals", payments: "Payments", shipping: "Shipping",
  marketing: "Marketing Center", notifications: "Notification Center", reports: "Reports & Analytics",
  content: "Content Management", staff: "Staff & Roles", "activity-logs": "Activity Logs", settings: "Settings",
};

export function generateStaticParams() {
  return Object.keys(TITLES).map((section) => ({ section }));
}

export default async function AdminSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const title = TITLES[section] ?? "Module";
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-ice text-navy"><Hammer className="size-7" /></span>
      <h1 className="mt-4 font-display text-2xl font-extrabold text-navy">{title}</h1>
      <p className="mt-2 max-w-sm text-sm text-navy/60">
        This module is scaffolded and ships in the next iteration, wired to the <code className="rounded bg-frost px-1">{section.replace(/-/g, "_")}</code> tables already defined in <code className="rounded bg-frost px-1">supabase/schema.sql</code>.
      </p>
      <Link href="/admin" className="mt-6 rounded-xl bg-royal px-5 py-2.5 text-sm font-bold text-white hover:bg-royal-bright">Back to Dashboard</Link>
    </div>
  );
}

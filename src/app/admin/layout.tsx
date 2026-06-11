import type { Metadata } from "next";
import Sidebar from "@/components/admin/Sidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export const metadata: Metadata = {
  title: "Admin — Palace Bottles",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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

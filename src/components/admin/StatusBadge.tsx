const STYLES: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700",
  Confirmed: "bg-emerald-100 text-emerald-700",
  Processing: "bg-blue-100 text-blue-700",
  Packed: "bg-violet-100 text-violet-700",
  Shipped: "bg-cyan-100 text-cyan-700",
  Delivered: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-red-100 text-red-600",
  Paid: "bg-emerald-100 text-emerald-700",
  Unpaid: "bg-red-100 text-red-600",
  Active: "bg-emerald-100 text-emerald-700",
  Inactive: "bg-slate-100 text-slate-500",
  "In Stock": "bg-emerald-100 text-emerald-700",
  "Low Stock": "bg-amber-100 text-amber-700",
  "Out of Stock": "bg-red-100 text-red-600",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-block rounded-md px-2 py-1 text-[11px] font-bold ${STYLES[status] ?? "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}

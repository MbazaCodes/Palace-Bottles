export const KPIS = [
  { label: "Total Revenue", value: "TZS 0", delta: "—", up: true, vs: "" },
  { label: "Today's Sales", value: "TZS 0", delta: "—", up: true, vs: "" },
  { label: "Orders Today", value: "0", delta: "—", up: true, vs: "" },
  { label: "Pending Orders", value: "0", delta: "—", up: true, vs: "" },
  { label: "Processing Orders", value: "0", delta: "—", up: true, vs: "" },
  { label: "Delivered Orders", value: "0", delta: "—", up: true, vs: "" },
  { label: "Active Customers", value: "0", delta: "—", up: true, vs: "" },
  { label: "Products in Stock", value: "0", delta: "—", up: true, vs: "" },
  { label: "Low Stock Alerts", value: "0", delta: "—", up: true, vs: "" },
];

export const REVENUE_SERIES: { day: string; revenue: number }[] = [];

export const TOP_PRODUCTS: { name: string; variant: string; sold: number; revenue: string; body: string; accent: string; shape: "flask" | "bottle" | "kids" | "tumbler" | "sport" }[] = [];

export type AdminOrderStatus = "Pending" | "Confirmed" | "Processing" | "Packed" | "Shipped" | "Delivered" | "Cancelled";

export interface AdminOrder {
  id: string; seq: string; customer: string; phone: string; email?: string;
  amount: number; payment: string; paid: boolean; status: AdminOrderStatus; date: string;
  region: string; district: string; address: string;
  items: { name: string; variant: string; price: number; qty: number; body: string; accent: string; shape: "flask" | "bottle" | "kids" | "tumbler" | "sport" }[];
  note?: string;
}

export const ADMIN_ORDERS: AdminOrder[] = [];

export const ORDER_STATUS_SUMMARY = [
  { label: "All Orders", value: 0, delta: "—", up: true },
  { label: "Pending", value: 0, delta: "—", up: true },
  { label: "Processing", value: 0, delta: "—", up: true },
  { label: "Packed", value: 0, delta: "—", up: true },
  { label: "Shipped", value: 0, delta: "—", up: true },
  { label: "Delivered", value: 0, delta: "—", up: true },
  { label: "Cancelled", value: 0, delta: "—", up: true },
];

export const ADMIN_CUSTOMERS: {
  name: string; joined: string; phone: string; email: string; location: string;
  orders: number; spent: string; lastOrder: string; active: boolean;
}[] = [];

export const INVENTORY_ROWS: {
  name: string; sku: string; category: string; variant: string; stock: number; reserved: number;
  body: string; accent: string; shape: "flask" | "bottle" | "kids" | "tumbler" | "sport";
}[] = [];

export const CATEGORY_SPLIT: { name: string; value: number; color: string }[] = [];

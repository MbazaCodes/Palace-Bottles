export const KPIS = [
  { label: "Total Revenue", value: "TZS 12,450,000", delta: "+18.2%", up: true, vs: "vs last week" },
  { label: "Today's Sales", value: "TZS 1,245,000", delta: "+12.5%", up: true, vs: "vs yesterday" },
  { label: "Orders Today", value: "56", delta: "+16.7%", up: true, vs: "vs yesterday" },
  { label: "Pending Orders", value: "23", delta: "-4.2%", up: false, vs: "vs yesterday" },
  { label: "Processing Orders", value: "18", delta: "+5.6%", up: true, vs: "vs yesterday" },
  { label: "Delivered Orders", value: "96", delta: "+22.4%", up: true, vs: "vs last week" },
  { label: "Active Customers", value: "1,248", delta: "+14.3%", up: true, vs: "vs last week" },
  { label: "Products in Stock", value: "342", delta: "+8.7%", up: true, vs: "vs last week" },
  { label: "Low Stock Alerts", value: "14", delta: "-12.5%", up: false, vs: "vs last week", warn: true },
];

export const REVENUE_SERIES = [
  { day: "May 12", revenue: 1450000 },
  { day: "May 13", revenue: 1720000 },
  { day: "May 14", revenue: 1980000 },
  { day: "May 15", revenue: 1690000 },
  { day: "May 16", revenue: 2410000 },
  { day: "May 17", revenue: 2150000 },
  { day: "May 18", revenue: 2870000 },
];

export const TOP_PRODUCTS = [
  { name: "Palace Classic Flask 1L", variant: "Black", sold: 512, revenue: "TZS 23,040,000", body: "#16181d", accent: "#3a3f4a", shape: "flask" as const },
  { name: "Hydro Active Bottle 750ml", variant: "Blue", sold: 438, revenue: "TZS 14,016,000", body: "#2563eb", accent: "#60a5fa", shape: "bottle" as const },
  { name: "Kids Fun Bottle 500ml", variant: "Purple", sold: 312, revenue: "TZS 7,800,000", body: "#a78bfa", accent: "#c4b5fd", shape: "kids" as const },
  { name: "Coffee Tumbler 500ml", variant: "White", sold: 245, revenue: "TZS 6,125,000", body: "#eef0f4", accent: "#cbd5e1", shape: "tumbler" as const },
  { name: "Sport Pro Bottle 1L", variant: "Black", sold: 198, revenue: "TZS 5,346,000", body: "#16181d", accent: "#475569", shape: "sport" as const },
];

export type AdminOrderStatus = "Pending" | "Confirmed" | "Processing" | "Packed" | "Shipped" | "Delivered" | "Cancelled";

export interface AdminOrder {
  id: string;
  seq: string;
  customer: string;
  phone: string;
  email?: string;
  amount: number;
  payment: string;
  paid: boolean;
  status: AdminOrderStatus;
  date: string;
  region: string;
  district: string;
  address: string;
  items: { name: string; variant: string; price: number; qty: number; body: string; accent: string; shape: "flask" | "bottle" | "kids" | "tumbler" | "sport" }[];
  note?: string;
}

export const ADMIN_ORDERS: AdminOrder[] = [
  {
    id: "PB100001", seq: "#1021", customer: "Juma Mwinyi", phone: "+255 712 345 678", email: "juma.mwinyi@gmail.com",
    amount: 102000, payment: "M-Pesa", paid: true, status: "Pending", date: "May 18, 2026 10:30 AM",
    region: "Dar es Salaam", district: "Kinondoni", address: "Makumbusho, Near Mesuma Hotel",
    items: [
      { name: "Palace Classic Flask 1L", variant: "1L / Black", price: 45000, qty: 1, body: "#16181d", accent: "#3a3f4a", shape: "flask" },
      { name: "Hydro Active Bottle 750ml", variant: "750ml / Blue", price: 32000, qty: 1, body: "#2563eb", accent: "#60a5fa", shape: "bottle" },
      { name: "Kids Fun Bottle 500ml", variant: "500ml / Purple", price: 25000, qty: 1, body: "#a78bfa", accent: "#c4b5fd", shape: "kids" },
    ],
    note: "Please deliver in the morning. Thanks!",
  },
  { id: "PB785290", seq: "#1020", customer: "Asha Mohamed", phone: "+255 684 123 456", amount: 75000, payment: "Airtel Money", paid: true, status: "Processing", date: "May 18, 2026 09:45 AM", region: "Dodoma", district: "Dodoma Urban", address: "Area C", items: [{ name: "Adventure Flask 2L", variant: "2L / Green", price: 55000, qty: 1, body: "#27452f", accent: "#3f6249", shape: "sport" }, { name: "Aqua Flow Bottle", variant: "500ml / White", price: 28000, qty: 1, body: "#eef0f4", accent: "#dceeff", shape: "bottle" }] },
  { id: "PB785289", seq: "#1019", customer: "Michael John", phone: "+255 753 987 654", amount: 50000, payment: "Mixx by Yas", paid: true, status: "Packed", date: "May 18, 2026 09:20 AM", region: "Arusha", district: "Arusha City", address: "Njiro Road", items: [{ name: "Coffee Tumbler 500ml", variant: "500ml / White", price: 30000, qty: 1, body: "#eef0f4", accent: "#cbd5e1", shape: "tumbler" }] },
  { id: "PB785288", seq: "#1018", customer: "Neema Paul", phone: "+255 677 234 567", amount: 125000, payment: "M-Pesa", paid: true, status: "Shipped", date: "May 18, 2026 08:55 AM", region: "Mwanza", district: "Nyamagana", address: "Rock City Mall area", items: [{ name: "Palace Elite Flask 1.5L", variant: "1.5L / Silver", price: 60000, qty: 2, body: "#cdd3dd", accent: "#e8eaf0", shape: "flask" }] },
  { id: "PB785287", seq: "#1017", customer: "David Patrick", phone: "+255 712 654 321", amount: 60000, payment: "HaloPesa", paid: true, status: "Delivered", date: "May 17, 2026 07:40 PM", region: "Mbeya", district: "Mbeya City", address: "Uyole", items: [{ name: "Sport Pro Bottle 1L", variant: "1L / Black", price: 35000, qty: 1, body: "#16181d", accent: "#475569", shape: "sport" }, { name: "Kids Unicorn Bottle", variant: "400ml / Pink", price: 22000, qty: 1, body: "#f472b6", accent: "#f9a8d4", shape: "kids" }] },
  { id: "PB785286", seq: "#1016", customer: "Fatma Salum", phone: "+255 715 111 222", amount: 45000, payment: "Cash on Delivery", paid: false, status: "Pending", date: "May 17, 2026 06:15 PM", region: "Tanga", district: "Tanga City", address: "Ngamiani", items: [{ name: "Palace Classic Flask 1L", variant: "1L / Black", price: 45000, qty: 1, body: "#16181d", accent: "#3a3f4a", shape: "flask" }] },
  { id: "PB785285", seq: "#1015", customer: "Hassan Khamis", phone: "+255 624 333 444", amount: 90000, payment: "Airtel Money", paid: true, status: "Cancelled", date: "May 17, 2026 05:30 PM", region: "Zanzibar Urban/West", district: "Mjini", address: "Stone Town", items: [{ name: "Mega Tumbler 900ml", variant: "900ml / Blue", price: 40000, qty: 2, body: "#7c9bd6", accent: "#a8c0e8", shape: "tumbler" }] },
  { id: "PB785284", seq: "#1014", customer: "Rehema Ally", phone: "+255 655 789 123", amount: 80000, payment: "M-Pesa", paid: true, status: "Shipped", date: "May 17, 2026 04:20 PM", region: "Morogoro", district: "Morogoro Urban", address: "Kihonda", items: [{ name: "Hydro Active Bottle", variant: "750ml / Blue", price: 32000, qty: 2, body: "#2563eb", accent: "#60a5fa", shape: "bottle" }] },
];

export const ORDER_STATUS_SUMMARY = [
  { label: "All Orders", value: 356, delta: "+16.7%", up: true },
  { label: "Pending", value: 23, delta: "-4.2%", up: false },
  { label: "Processing", value: 18, delta: "+5.6%", up: true },
  { label: "Packed", value: 27, delta: "+11.3%", up: true },
  { label: "Shipped", value: 120, delta: "+18.9%", up: true },
  { label: "Delivered", value: 155, delta: "+22.4%", up: true },
  { label: "Cancelled", value: 13, delta: "-10.1%", up: false },
];

export const ADMIN_CUSTOMERS = [
  { name: "Juma Mwinyi", joined: "Apr 12, 2025", phone: "+255 712 345 678", email: "juma.mwinyi@gmail.com", location: "Dar es Salaam", orders: 18, spent: "TZS 245,000", lastOrder: "May 18, 2026", active: true },
  { name: "Asha Mohamed", joined: "May 4, 2025", phone: "+255 684 123 456", email: "asha.mohamed@mail.com", location: "Dodoma", orders: 12, spent: "TZS 186,500", lastOrder: "May 17, 2026", active: true },
  { name: "Michael John", joined: "Feb 18, 2025", phone: "+255 753 987 654", email: "michael.john@gmail.com", location: "Arusha", orders: 9, spent: "TZS 142,000", lastOrder: "May 16, 2026", active: true },
  { name: "Neema Paul", joined: "Mar 3, 2025", phone: "+255 677 234 567", email: "neema.paul@gmail.com", location: "Mwanza", orders: 7, spent: "TZS 98,000", lastOrder: "May 15, 2026", active: true },
  { name: "David Patrick", joined: "Jan 22, 2025", phone: "+255 712 654 321", email: "david.patrick@mail.com", location: "Mbeya", orders: 14, spent: "TZS 210,000", lastOrder: "May 14, 2026", active: true },
  { name: "Fatma Salum", joined: "Apr 9, 2025", phone: "+255 715 111 222", email: "fatma.salum@gmail.com", location: "Tanga", orders: 6, spent: "TZS 74,500", lastOrder: "May 14, 2026", active: true },
  { name: "Hassan Khamis", joined: "Mar 27, 2025", phone: "+255 624 333 444", email: "hassan.khamis@gmail.com", location: "Zanzibar", orders: 11, spent: "TZS 158,000", lastOrder: "May 12, 2026", active: true },
  { name: "Rehema Ally", joined: "Feb 5, 2025", phone: "+255 655 789 123", email: "rehema.ally@gmail.com", location: "Morogoro", orders: 8, spent: "TZS 101,000", lastOrder: "May 11, 2026", active: false },
];

export const INVENTORY_ROWS = [
  { name: "Palace Classic Flask 1L", sku: "PB-1001", category: "Thermal Flasks", variant: "1L / Black", stock: 120, reserved: 10, body: "#16181d", accent: "#3a3f4a", shape: "flask" as const },
  { name: "Hydro Active Bottle 750ml", sku: "PB-1002", category: "Water Bottles", variant: "750ml / Blue", stock: 85, reserved: 5, body: "#2563eb", accent: "#60a5fa", shape: "bottle" as const },
  { name: "Kids Fun Bottle 500ml", sku: "PB-1003", category: "Kids Bottles", variant: "500ml / Purple", stock: 10, reserved: 2, body: "#a78bfa", accent: "#c4b5fd", shape: "kids" as const },
  { name: "Coffee Tumbler 500ml", sku: "PB-1004", category: "Coffee Tumblers", variant: "500ml / White", stock: 0, reserved: 0, body: "#eef0f4", accent: "#cbd5e1", shape: "tumbler" as const },
  { name: "Sport Pro Bottle 1L", sku: "PB-1005", category: "Sports Bottles", variant: "1L / Black", stock: 43, reserved: 7, body: "#16181d", accent: "#475569", shape: "sport" as const },
  { name: "Hydro Daily Bottle 1L", sku: "PB-1006", category: "Water Bottles", variant: "1L / Green", stock: 15, reserved: 1, body: "#16513a", accent: "#2c7a58", shape: "bottle" as const },
  { name: "Kids Unicorn Bottle 400ml", sku: "PB-1007", category: "Kids Bottles", variant: "400ml / Pink", stock: 25, reserved: 3, body: "#f472b6", accent: "#f9a8d4", shape: "kids" as const },
  { name: "Palace Elite Flask 1.5L", sku: "PB-1008", category: "Thermal Flasks", variant: "1.5L / Silver", stock: 5, reserved: 1, body: "#cdd3dd", accent: "#e8eaf0", shape: "flask" as const },
];

export const CATEGORY_SPLIT = [
  { name: "Water Bottles", value: 2450, color: "#2563eb" },
  { name: "Thermal Flasks", value: 2150, color: "#10b981" },
  { name: "Sports Bottles", value: 1850, color: "#f59e0b" },
  { name: "Kids Bottles", value: 1250, color: "#a78bfa" },
  { name: "Tumblers & Mugs", value: 750, color: "#f43f5e" },
];

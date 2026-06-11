import type { CartItem } from "@/store/cart";
import type { OrderStatus } from "./constants";

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  customer: { fullName: string; phone: string; email?: string };
  delivery: { region: string; district: string; address: string };
  payment: string;
  items: { name: string; capacity: string; color: string; qty: number; price: number; visual: CartItem["product"]["visual"] }[];
  subtotal: number;
}

const KEY = "pb_orders";

// Local-storage order layer for the demo build.
// Phase 4 swaps these for Supabase inserts/selects with RLS.
export function createOrder(
  data: { fullName: string; phone: string; email?: string; region: string; district: string; address: string; payment: string },
  items: CartItem[],
  subtotal: number
): Order {
  const id = `PB${Math.floor(100000 + Math.random() * 900000)}`;
  const order: Order = {
    id,
    createdAt: new Date().toISOString(),
    status: "Pending",
    customer: { fullName: data.fullName, phone: data.phone, email: data.email || undefined },
    delivery: { region: data.region, district: data.district, address: data.address },
    payment: data.payment,
    items: items.map((i) => ({
      name: i.product.name, capacity: i.capacity, color: i.color, qty: i.qty, price: i.product.price, visual: i.product.visual,
    })),
    subtotal,
  };
  if (typeof window !== "undefined") {
    const all = JSON.parse(localStorage.getItem(KEY) ?? "[]") as Order[];
    localStorage.setItem(KEY, JSON.stringify([order, ...all]));
  }
  return order;
}

export function getOrder(id: string): Order | undefined {
  if (typeof window === "undefined") return undefined;
  const all = JSON.parse(localStorage.getItem(KEY) ?? "[]") as Order[];
  return all.find((o) => o.id.toLowerCase() === id.toLowerCase());
}

/** Demo order so Track Order always has something to show */
export const DEMO_ORDER: Order = {
  id: "PB785291",
  createdAt: "2026-05-12T10:30:00Z",
  status: "Processing",
  customer: { fullName: "Juma Mwinyi", phone: "+255 712 345 678" },
  delivery: { region: "Dar es Salaam", district: "Kinondoni", address: "Makumbusho, Near Mesuma Hotel" },
  payment: "M-Pesa",
  items: [
    { name: "Palace Classic Flask", capacity: "1L", color: "Black", qty: 1, price: 45000, visual: { body: "#16181d", accent: "#3a3f4a", shape: "flask" } },
    { name: "Hydro Active Bottle", capacity: "750ml", color: "Blue", qty: 1, price: 32000, visual: { body: "#2563eb", accent: "#60a5fa", shape: "bottle" } },
    { name: "Kids Fun Bottle", capacity: "500ml", color: "Purple", qty: 1, price: 25000, visual: { body: "#a78bfa", accent: "#c4b5fd", shape: "kids" } },
  ],
  subtotal: 102000,
};

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

/** Create an order from checkout and persist to localStorage. */
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

/** Retrieve an order by ID from localStorage. */
export function getOrder(id: string): Order | undefined {
  if (typeof window === "undefined") return undefined;
  const all = JSON.parse(localStorage.getItem(KEY) ?? "[]") as Order[];
  return all.find((o) => o.id.toLowerCase() === id.toLowerCase());
}

/** Get all orders from localStorage. */
export function getAllOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) ?? "[]") as Order[]; } catch { return []; }
}

/** Update an order's status in localStorage. */
export function updateOrderStatus(id: string, status: OrderStatus): void {
  if (typeof window === "undefined") return;
  const all = getAllOrders();
  const updated = all.map((o) => (o.id.toLowerCase() === id.toLowerCase() ? { ...o, status } : o));
  localStorage.setItem(KEY, JSON.stringify(updated));
}

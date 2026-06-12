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
// No version clearing — orders persist

// ── Local fallback ─────────────────────────────────────────────

function getLocal(): Order[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) ?? "[]") as Order[]; } catch { return []; }
}

function saveLocal(orders: Order[]) {
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(orders));
}

// ── Create order (API + local) ─────────────────────────────────

export async function createOrder(
  data: { fullName: string; phone: string; email?: string; region: string; district: string; address: string; payment: string },
  items: CartItem[],
  subtotal: number
): Promise<Order> {
  // Build order locally first
  const localId = `PB${Math.floor(100000 + Math.random() * 900000)}`;
  const order: Order = {
    id: localId,
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

  // Try Supabase API
  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        region: data.region,
        district: data.district,
        address: data.address,
        payment: data.payment,
        subtotal,
        items: items.map((i) => ({
          name: i.product.name,
          variant: `${i.capacity} / ${i.color}`,
          price: i.product.price,
          qty: i.qty,
        })),
      }),
    });
    if (res.ok) {
      const result = await res.json();
      order.id = result.order_number ?? localId;
    }
  } catch { /* API unavailable — local ID is fine */ }

  // Always save locally too
  const all = getLocal();
  saveLocal([order, ...all]);
  return order;
}

// ── Read orders ────────────────────────────────────────────────

export function getOrder(id: string): Order | undefined {
  return getLocal().find((o) => o.id.toLowerCase() === id.toLowerCase());
}

/** Try Supabase API for tracking, fall back to local */
export async function trackOrder(id: string): Promise<Order | undefined> {
  // Try API first
  try {
    const res = await fetch(`/api/orders/track?id=${encodeURIComponent(id)}`);
    if (res.ok) {
      const d = await res.json();
      return {
        id: d.order_number,
        createdAt: d.created_at,
        status: d.status?.charAt(0).toUpperCase() + d.status?.slice(1),
        customer: { fullName: d.customer?.full_name, phone: d.customer?.phone, email: d.customer?.email },
        delivery: { region: d.region, district: d.district, address: d.address },
        payment: d.payment_method?.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
        items: (d.items ?? []).map((i: Record<string, unknown>) => ({
          name: i.product_name, capacity: "", color: "", qty: i.qty, price: i.unit_price,
          visual: { body: "#16181d", accent: "#3a3f4a", shape: "bottle" as const },
        })),
        subtotal: d.subtotal,
      };
    }
  } catch { /* fall back */ }

  // Fall back to local
  return getLocal().find((o) => o.id.toLowerCase() === id.toLowerCase());
}

export function getAllOrders(): Order[] {
  return getLocal();
}

export function updateOrderStatus(id: string, status: OrderStatus): void {
  // Update local
  const all = getLocal();
  saveLocal(all.map((o) => (o.id.toLowerCase() === id.toLowerCase() ? { ...o, status } : o)));

  // Also try API
  fetch("/api/orders", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ order_number: id, status: status.toLowerCase() }),
  }).catch(() => { /* ok */ });
}

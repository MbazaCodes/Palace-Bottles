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

/**
 * Orders — all reads/writes go through Supabase API routes.
 * No localStorage.
 */

export async function createOrder(
  data: { fullName: string; phone: string; email?: string; region: string; district: string; address: string; payment: string },
  items: CartItem[],
  subtotal: number
): Promise<Order> {
  const order: Order = {
    id: `PB${Math.floor(100000 + Math.random() * 900000)}`,
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

  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: data.fullName, phone: data.phone, email: data.email,
        region: data.region, district: data.district, address: data.address,
        payment: data.payment, subtotal,
        items: items.map((i) => ({
          name: i.product.name, variant: `${i.capacity} / ${i.color}`, price: i.product.price, qty: i.qty,
        })),
      }),
    });
    if (res.ok) {
      const result = await res.json();
      order.id = result.order_number ?? order.id;
    }
  } catch { /* order ID stays as local fallback */ }

  return order;
}

export async function trackOrder(id: string): Promise<Order | undefined> {
  try {
    const res = await fetch(`/api/orders/track?id=${encodeURIComponent(id)}`, { cache: "no-store" });
    if (!res.ok) return undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const d: any = await res.json();
    const pmMap: Record<string, string> = {
      mpesa: "M-Pesa", airtel_money: "Airtel Money", mixx_by_yas: "Mixx by Yas",
      halopesa: "HaloPesa", cash_on_delivery: "Cash on Delivery",
    };
    const statusMap = (s: string) => s?.charAt(0).toUpperCase() + s?.slice(1);
    return {
      id: d.order_number,
      createdAt: d.created_at,
      status: statusMap(d.status) as OrderStatus,
      customer: { fullName: d.customer?.full_name ?? "—", phone: d.customer?.phone ?? "—", email: d.customer?.email },
      delivery: { region: d.region ?? "—", district: d.district ?? "—", address: d.address ?? "—" },
      payment: pmMap[d.payment_method] ?? d.payment_method ?? "—",
      items: (d.items ?? []).map((i: { product_name: string; variant?: string; unit_price: number; qty: number }) => ({
        name: i.product_name, capacity: i.variant?.split("/")[0]?.trim() ?? "", color: i.variant?.split("/")[1]?.trim() ?? "",
        qty: i.qty, price: i.unit_price,
        visual: { body: "#16181d", accent: "#3a3f4a", shape: "bottle" as const },
      })),
      subtotal: Number(d.subtotal ?? 0),
    };
  } catch { return undefined; }
}

export async function getAllOrders(): Promise<Order[]> {
  try {
    const res = await fetch("/api/orders", { cache: "no-store" });
    if (!res.ok) return [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any[] = await res.json();
    if (!Array.isArray(data)) return [];
    const pmMap: Record<string, string> = { mpesa: "M-Pesa", airtel_money: "Airtel Money", mixx_by_yas: "Mixx by Yas", halopesa: "HaloPesa", cash_on_delivery: "Cash on Delivery" };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((d: any) => ({
      id: d.order_number ?? d.id,
      createdAt: d.created_at,
      status: (d.status?.charAt(0).toUpperCase() + d.status?.slice(1)) as OrderStatus,
      customer: { fullName: d.customer?.full_name ?? "—", phone: d.customer?.phone ?? "—", email: d.customer?.email },
      delivery: { region: d.region ?? "—", district: d.district ?? "—", address: d.address ?? "—" },
      payment: pmMap[d.payment_method] ?? d.payment_method ?? "—",
      items: (d.items ?? []).map((i: { product_name: string; variant?: string; unit_price: number; qty: number }) => ({
        name: i.product_name, capacity: "", color: "", qty: i.qty, price: i.unit_price,
        visual: { body: "#16181d", accent: "#3a3f4a", shape: "bottle" as const },
      })),
      subtotal: Number(d.subtotal ?? 0),
    }));
  } catch { return []; }
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
  try {
    await fetch("/api/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order_number: id, status: status.toLowerCase() }),
    });
  } catch { /* silent */ }
}

// Legacy sync stubs for components that still call these
export function getOrder(): undefined { return undefined; }

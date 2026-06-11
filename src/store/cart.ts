"use client";
import { create } from "zustand";
import type { Product, Capacity } from "@/data/products";

export interface CartItem {
  product: Product;
  color: string;
  capacity: Capacity;
  qty: number;
}

interface CartState {
  items: CartItem[];
  open: boolean;
  coupon: string;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  setOpen: (open: boolean) => void;
  setCoupon: (c: string) => void;
  clear: () => void;
}

export const itemKey = (i: { product: Product; color: string; capacity: Capacity }) =>
  `${i.product.id}-${i.color}-${i.capacity}`;

export const useCart = create<CartState>((set) => ({
  items: [],
  open: false,
  coupon: "",
  add: (item, qty = 1) =>
    set((s) => {
      const key = itemKey(item);
      const existing = s.items.find((i) => itemKey(i) === key);
      const items = existing
        ? s.items.map((i) => (itemKey(i) === key ? { ...i, qty: i.qty + qty } : i))
        : [...s.items, { ...item, qty }];
      return { items, open: true };
    }),
  remove: (key) => set((s) => ({ items: s.items.filter((i) => itemKey(i) !== key) })),
  setQty: (key, qty) =>
    set((s) => ({
      items: qty <= 0 ? s.items.filter((i) => itemKey(i) !== key) : s.items.map((i) => (itemKey(i) === key ? { ...i, qty } : i)),
    })),
  setOpen: (open) => set({ open }),
  setCoupon: (coupon) => set({ coupon }),
  clear: () => set({ items: [], coupon: "" }),
}));

export const cartSubtotal = (items: CartItem[]) => items.reduce((t, i) => t + i.product.price * i.qty, 0);
export const cartCount = (items: CartItem[]) => items.reduce((t, i) => t + i.qty, 0);

import { PRODUCTS as SEED_PRODUCTS, CATEGORIES as SEED_CATEGORIES, type Product, type CategorySlug } from "@/data/products";

/**
 * Shared product store backed by localStorage.
 * Seeds with the static catalog on first load.
 * Admin can add/edit/delete; customer pages read the same data.
 */

const PRODUCTS_KEY = "pb_products";
const CATEGORIES_KEY = "pb_categories";

// ── Products ───────────────────────────────────────────────────

export function getProducts(): Product[] {
  if (typeof window === "undefined") return SEED_PRODUCTS;
  const raw = localStorage.getItem(PRODUCTS_KEY);
  if (!raw) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(SEED_PRODUCTS));
    return SEED_PRODUCTS;
  }
  try { return JSON.parse(raw) as Product[]; } catch { return SEED_PRODUCTS; }
}

export function saveProducts(list: Product[]) {
  if (typeof window !== "undefined") localStorage.setItem(PRODUCTS_KEY, JSON.stringify(list));
}

export function addProduct(p: Product) {
  const all = getProducts();
  saveProducts([p, ...all]);
}

export function updateProduct(id: string, updates: Partial<Product>) {
  const all = getProducts();
  saveProducts(all.map((p) => (p.id === id ? { ...p, ...updates } : p)));
}

export function deleteProduct(id: string) {
  saveProducts(getProducts().filter((p) => p.id !== id));
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}

export function getProductsByCategory(cat: CategorySlug): Product[] {
  return getProducts().filter((p) => p.category === cat);
}

export function getBestSellers(): Product[] {
  return [...getProducts()].sort((a, b) => b.reviews - a.reviews).slice(0, 8);
}

export function getFlashSaleProducts(): Product[] {
  return getProducts().filter((p) => p.oldPrice).slice(0, 4);
}

// ── Categories ─────────────────────────────────────────────────

export type Category = { slug: CategorySlug; name: string; count: string; tint: string };

export function getCategories(): Category[] {
  if (typeof window === "undefined") return SEED_CATEGORIES;
  const raw = localStorage.getItem(CATEGORIES_KEY);
  if (!raw) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(SEED_CATEGORIES));
    return SEED_CATEGORIES;
  }
  try { return JSON.parse(raw) as Category[]; } catch { return SEED_CATEGORIES; }
}

export function saveCategories(list: Category[]) {
  if (typeof window !== "undefined") localStorage.setItem(CATEGORIES_KEY, JSON.stringify(list));
}

/** Generate a product ID like PB-2001 */
export function nextProductId(): string {
  const all = getProducts();
  const maxNum = all.reduce((mx, p) => {
    const n = parseInt(p.id.replace("PB-", ""), 10);
    return isNaN(n) ? mx : Math.max(mx, n);
  }, 1000);
  return `PB-${maxNum + 1}`;
}

/** Generate slug from name */
export function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

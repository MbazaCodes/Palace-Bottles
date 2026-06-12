export type Capacity = "400ml" | "500ml" | "750ml" | "900ml" | "1L" | "1.5L" | "2L";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  capacity: Capacity;
  capacities: Capacity[];
  colors: { name: string; hex: string }[];
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  badge?: string;
  description: string;
  shortDescription: string;
  visual: { body: string; accent: string; shape: "flask" | "sport" | "kids" | "tumbler" | "bottle" };
}

export type CategorySlug = "thermal-flasks" | "water-bottles" | "sports-bottles" | "kids-bottles" | "coffee-tumblers";

export const CATEGORIES: { slug: CategorySlug; name: string; count: string; tint: string }[] = [];

export const PRODUCTS: Product[] = [];

export const bySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const byCategory = (c: CategorySlug) => PRODUCTS.filter((p) => p.category === c);
export const bestSellers = () => [...PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, 8);
export const flashSaleProducts = () => PRODUCTS.filter((p) => p.oldPrice).slice(0, 4);

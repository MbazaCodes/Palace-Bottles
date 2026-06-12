import { PRODUCTS, bySlug, byCategory } from "@/data/products";
import ProductDetailClient from "@/components/product/ProductDetailClient";
import DynamicProductLoader from "@/components/product/DynamicProductLoader";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = bySlug(slug);
  return { title: product ? `${product.name} — Palace Bottles` : "Product — Palace Bottles" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = bySlug(slug);

  // Seed product found — render server-side
  if (product) {
    const related = byCategory(product.category).filter((p) => p.id !== product.id).slice(0, 4);
    return <ProductDetailClient product={product} related={related} />;
  }

  // Product not in seed data — try localStorage (admin-added products)
  return <DynamicProductLoader slug={slug} />;
}

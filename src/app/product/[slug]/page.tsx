import { notFound } from "next/navigation";
import { PRODUCTS, bySlug, byCategory } from "@/data/products";
import ProductDetailClient from "@/components/product/ProductDetailClient";

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
  if (!product) notFound();
  const related = byCategory(product.category).filter((p) => p.id !== product.id).slice(0, 4);
  return <ProductDetailClient product={product} related={related} />;
}

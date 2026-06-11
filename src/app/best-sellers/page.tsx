import PageHero from "@/components/ui/PageHero";
import ProductCard from "@/components/product/ProductCard";
import TrustBar from "@/components/home/TrustBar";
import { bestSellers } from "@/data/products";

export const metadata = { title: "Best Sellers — Palace Bottles" };

export default function BestSellersPage() {
  return (
    <>
      <PageHero
        title="Best Sellers"
        subtitle="Our most loved products, trusted by thousands of happy customers across Tanzania."
        crumbs={[["Home", "/"], ["Best Sellers", "/best-sellers"]]}
      />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {bestSellers().map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
      <TrustBar dark={false} />
    </>
  );
}

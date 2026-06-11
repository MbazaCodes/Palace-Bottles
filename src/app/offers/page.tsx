import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Countdown from "@/components/ui/Countdown";
import ProductCard from "@/components/product/ProductCard";
import { flashSaleProducts } from "@/data/products";

export const metadata = { title: "Special Offers — Palace Bottles" };

const target = new Date(Date.now() + 2 * 86400000 + 14 * 3600000);

export default function OffersPage() {
  return (
    <>
      <PageHero
        title="Special Offers"
        subtitle="Enjoy amazing deals on premium bottles and hydration products."
        crumbs={[["Home", "/"], ["Offers", "/offers"]]}
      />

      <div className="mx-auto max-w-7xl space-y-12 px-4 py-10">
        {/* Mega flash sale banner */}
        <div className="glass-navy flex flex-col items-center justify-between gap-5 rounded-2xl px-6 py-7 text-white sm:flex-row">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-amber-400">Limited Time Only</p>
            <h2 className="font-display text-2xl font-extrabold">Mega Flash Sale</h2>
            <p className="text-sm text-white/70">Up to 30% off on selected items</p>
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Countdown target={target} />
            <Link href="/shop" className="flex items-center gap-2 rounded-xl bg-royal px-5 py-3 text-sm font-bold hover:bg-royal-bright">
              Shop Now <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* Flash sale products */}
        <section>
          <h2 className="flex items-center gap-2 font-display text-2xl font-extrabold text-navy">
            <Zap className="size-6 fill-amber-400 text-amber-400" /> Flash Sales
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {flashSaleProducts().map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>

        {/* Best deals */}
        <section className="grid gap-5 md:grid-cols-2">
          <div className="glass-navy relative overflow-hidden rounded-2xl p-8 text-white">
            <div aria-hidden className="absolute -right-6 -top-6 size-32 rounded-full bg-royal/40 blur-2xl" />
            <h3 className="font-display text-xl font-extrabold">Bundle &amp; Save</h3>
            <p className="mt-1 text-sm text-white/70">Buy more, save more!</p>
            <p className="mt-4 font-display text-lg font-bold">Get up to <span className="text-ice">20% OFF</span> on bundle deals</p>
            <Link href="/shop" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-royal px-5 py-2.5 text-sm font-bold hover:bg-royal-bright">
              Shop Bundles <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="glass-navy relative overflow-hidden rounded-2xl p-8 text-white">
            <div aria-hidden className="absolute -left-6 -bottom-6 size-32 rounded-full bg-red-500/30 blur-2xl" />
            <h3 className="font-display text-xl font-extrabold">Clearance Sale</h3>
            <p className="mt-1 text-sm text-white/70">Limited stock available</p>
            <p className="mt-4 font-display text-lg font-bold">Up to <span className="text-ice">40% OFF</span> on selected items</p>
            <Link href="/shop" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-royal px-5 py-2.5 text-sm font-bold hover:bg-royal-bright">
              Shop Clearance <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

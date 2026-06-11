import { Suspense } from "react";
import ShopClient from "@/components/shop/ShopClient";
import PageHero from "@/components/ui/PageHero";

export const metadata = { title: "Shop All Products — Palace Bottles" };

export default function ShopPage() {
  return (
    <>
      <PageHero
        title="Shop All Products"
        subtitle="Discover our premium collection of thermal flasks, water bottles, tumblers and more."
        crumbs={[["Home", "/"], ["Shop", "/shop"]]}
      />
      <Suspense>
        <ShopClient />
      </Suspense>
    </>
  );
}

import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import Categories from "@/components/home/Categories";
import FlashSaleBanner from "@/components/home/FlashSaleBanner";
import BestSellers from "@/components/home/BestSellers";
import SocialProof from "@/components/home/SocialProof";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Categories />
      <FlashSaleBanner />
      <BestSellers />
      <SocialProof />
    </>
  );
}

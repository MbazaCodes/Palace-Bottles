"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, ArrowRight, Lock } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import { BRAND } from "@/lib/constants";
import Logo from "./Logo";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-navy-night text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <h3 className="font-display text-base font-bold">Stay Updated</h3>
          <p className="mt-2 text-sm text-white/65">Subscribe to get special offers, new arrivals and hydration tips.</p>
          <form className="mt-4 flex" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="Enter your email"
              aria-label="Email address"
              className="w-full rounded-l-xl border border-white/15 bg-white/5 px-3 py-2.5 text-sm outline-none placeholder:text-white/40 focus:border-ice"
            />
            <button aria-label="Subscribe" className="rounded-r-xl bg-royal px-3 hover:bg-royal-bright">
              <ArrowRight className="size-4" />
            </button>
          </form>
        </div>

        <div>
          <h3 className="font-display text-base font-bold">Quick Links</h3>
          <ul className="mt-3 space-y-2.5 text-sm text-white/70">
            {[["Shop", "/shop"], ["Best Sellers", "/best-sellers"], ["Offers", "/offers"], ["Track Order", "/track-order"], ["Contact Us", "/contact"]].map(([t, h]) => (
              <li key={t}><Link href={h} className="hover:text-ice">{t}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base font-bold">Customer Service</h3>
          <ul className="mt-3 space-y-2.5 text-sm text-white/70">
            {[["Shipping & Delivery", "/shipping-delivery"], ["Returns & Refunds", "/returns-refunds"], ["Payment Methods", "/payment-methods"], ["FAQs", "/faqs"], ["Privacy Policy", "/privacy-policy"]].map(([t, h]) => (
              <li key={t}><Link href={h} className="hover:text-ice">{t}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base font-bold">Contact Us</h3>
          <ul className="mt-3 space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2"><Phone className="mt-0.5 size-4 shrink-0 text-ice" /><a href={`tel:${BRAND.phoneRaw}`} className="hover:text-ice">{BRAND.phone}</a></li>
            <li className="flex items-start gap-2"><Mail className="mt-0.5 size-4 shrink-0 text-ice" /><a href={`mailto:${BRAND.email}`} className="break-all hover:text-ice">{BRAND.email}</a></li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-ice" />{BRAND.address}</li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a href="https://instagram.com/palacebottles" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full bg-white/10 p-2 hover:bg-white/20"><InstagramIcon /></a>
            <a href="https://facebook.com/palacebottles" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-full bg-white/10 p-2 hover:bg-white/20"><FacebookIcon /></a>
            <a href={`https://wa.me/${BRAND.phoneRaw}`} aria-label="WhatsApp" className="rounded-full bg-white/10 p-2 hover:bg-white/20">
              <svg viewBox="0 0 24 24" className="size-4 fill-white"><path d="M12.05 2a9.9 9.9 0 0 0-8.57 14.86L2 22l5.27-1.38A9.9 9.9 0 1 0 12.05 2z" /></svg>
            </a>
          </div>
        </div>

        <div>
          <Logo />
          <p className="mt-3 text-sm text-white/65">{BRAND.tagline}</p>
          <p className="mt-2 text-xs text-white/45">Premium bottles and hydration products trusted across Tanzania.</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 text-xs text-white/50 lg:flex-row">
          <p>© {new Date().getFullYear()} Palace Bottles. All rights reserved.</p>
          <p className="flex flex-wrap items-center justify-center gap-3 font-medium text-white/65">
            <span>m-pesa</span><span>airtel money</span><span>mixx by yas</span><span>HaloPesa</span><span>Cash on Delivery</span>
          </p>
          <Link href="/admin/login"
            className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-bold text-white/80 transition-colors hover:border-royal hover:bg-royal hover:text-white">
            <Lock className="size-3.5" /> Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}

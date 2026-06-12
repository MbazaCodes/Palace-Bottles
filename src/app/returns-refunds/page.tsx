import { RotateCcw, ShieldCheck, AlertCircle, CheckCircle2, Phone } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { BRAND } from "@/lib/constants";

export const metadata = { title: "Returns & Refunds — Palace Bottles" };

export default function ReturnsRefundsPage() {
  return (
    <>
      <PageHero
        title="Returns & Refunds"
        subtitle="Your satisfaction matters. Here's our returns policy for all Palace Bottles products."
        crumbs={[["Home", "/"], ["Returns & Refunds", "/returns-refunds"]]}
      />
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-12">
        <section className="rounded-2xl border border-silver bg-white p-6 shadow-card">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-navy"><RotateCcw className="size-5 text-royal" /> 7-Day Return Policy</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-navy/75">
            <p>We accept returns within <strong>7 days</strong> of delivery for eligible items. To qualify, the product must be unused, in its original packaging, and in the same condition you received it.</p>
            <p>To start a return, contact us on WhatsApp or call us with your Order ID. Our team will guide you through the process.</p>
          </div>
        </section>

        <section className="rounded-2xl border border-silver bg-white p-6 shadow-card">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-navy"><CheckCircle2 className="size-5 text-emerald-500" /> Eligible for Return</h2>
          <ul className="mt-4 space-y-2 text-sm text-navy/75">
            {["Product received is damaged or defective", "Wrong product or variant was delivered", "Product is unused and in original packaging within 7 days", "Product does not match the description on the website"].map((t) => (
              <li key={t} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" /> {t}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-silver bg-white p-6 shadow-card">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-navy"><AlertCircle className="size-5 text-amber-500" /> Not Eligible for Return</h2>
          <ul className="mt-4 space-y-2 text-sm text-navy/75">
            {["Product has been used or shows signs of wear", "Product is returned after 7 days of delivery", "Original packaging is missing or damaged by the customer", "Products marked as 'Final Sale' or 'Clearance'"].map((t) => (
              <li key={t} className="flex items-start gap-2"><AlertCircle className="mt-0.5 size-4 shrink-0 text-amber-500" /> {t}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-silver bg-white p-6 shadow-card">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-navy"><ShieldCheck className="size-5 text-royal" /> Refund Process</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-navy/75">
            <p>Once we receive and inspect the returned item, we will process your refund. Refunds are issued to the same payment method used for the original purchase.</p>
            <p><strong>Mobile Money refunds</strong> (M-Pesa, Airtel Money, Mixx by Yas, HaloPesa) are typically processed within 1–3 business days.</p>
            <p><strong>Cash on Delivery refunds</strong> are processed via Mobile Money to the phone number on your order, within 3–5 business days.</p>
            <p>Return shipping costs are covered by Palace Bottles if the return is due to a defect or our error. For change-of-mind returns, the customer covers return shipping.</p>
          </div>
        </section>

        <div className="glass-navy rounded-2xl p-6 text-center text-white">
          <Phone className="mx-auto size-6 text-ice" />
          <p className="mt-2 font-display text-lg font-bold">Need to return a product?</p>
          <p className="mt-1 text-sm text-white/70">Contact us with your Order ID and we&apos;ll sort it out quickly.</p>
          <div className="mt-4 flex justify-center gap-3">
            <a href={`https://wa.me/${BRAND.phoneRaw}?text=Hello!%20I%20need%20help%20with%20a%20return.`} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-bold hover:brightness-105">Start a Return on WhatsApp</a>
          </div>
        </div>
      </div>
    </>
  );
}

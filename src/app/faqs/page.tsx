"use client";
import { useState } from "react";
import { ChevronDown, Phone } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { BRAND } from "@/lib/constants";

const FAQS = [
  { q: "How do I place an order?", a: "Browse our shop, add products to your cart, and proceed to checkout. Fill in your details (no account needed), choose your payment method, and submit. Our team will contact you to confirm delivery details and the final amount." },
  { q: "How long does delivery take?", a: "Same day to 1 day in Dar es Salaam. 2–3 days for major cities (Arusha, Mwanza, Dodoma, Mbeya, Morogoro). 3–5 days for other mainland regions and Zanzibar." },
  { q: "How much does delivery cost?", a: "Delivery costs depend on your location, ranging from TZS 3,000 in Dar es Salaam to TZS 15,000 for remote areas. The exact cost is confirmed by our team before dispatch — it is not charged at checkout." },
  { q: "What payment methods do you accept?", a: "We accept M-Pesa, Airtel Money, Mixx by Yas, HaloPesa, and Cash on Delivery (in selected areas). Payment details are shared after you place your order." },
  { q: "Can I pay on delivery?", a: "Yes, Cash on Delivery is available in Dar es Salaam and selected regions. Please have the exact amount ready when the delivery arrives." },
  { q: "How do I track my order?", a: "After placing your order, you receive an Order ID (e.g. PB123456). Go to our Track Order page, enter the ID, and you'll see the current status of your order in real time." },
  { q: "Are your products original?", a: "Yes, all Palace Bottles products are 100% original and sourced directly. We do not sell counterfeit or imitation products. Every product comes with our quality guarantee." },
  { q: "What is your return policy?", a: "We accept returns within 7 days of delivery for eligible items. The product must be unused and in its original packaging. Contact us via WhatsApp with your Order ID to start a return." },
  { q: "Do you deliver to Zanzibar?", a: "Yes, we deliver to both Unguja and Pemba islands. Delivery typically takes 3–5 days and costs between TZS 10,000 – 15,000 depending on the exact destination." },
  { q: "Can I buy in bulk or wholesale?", a: "Yes! We offer bulk pricing for businesses, schools, and organizations. Contact us on WhatsApp or email at " + "kyalaalikoabel@gmail.com for a custom quote." },
  { q: "How do I contact customer support?", a: "You can reach us via WhatsApp at " + "+255 657 397 719 (fastest response), phone at the same number, or email at kyalaalikoabel@gmail.com. We reply to WhatsApp within minutes and email within 24 hours." },
  { q: "Do your bottles keep drinks cold/hot?", a: "Yes. Our thermal flasks use double-wall vacuum insulation. Depending on the model, drinks stay cold for up to 24–36 hours and hot for up to 12–18 hours." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-silver bg-white shadow-card">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
        <span className="font-semibold text-navy">{q}</span>
        <ChevronDown className={`size-5 shrink-0 text-navy/50 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="border-t border-silver px-5 py-4 text-sm leading-relaxed text-navy/70">{a}</p>}
    </div>
  );
}

export default function FaqsPage() {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about ordering, delivery, payments, and returns."
        crumbs={[["Home", "/"], ["FAQs", "/faqs"]]}
      />
      <div className="mx-auto max-w-3xl space-y-3 px-4 py-12">
        {FAQS.map((f) => <FaqItem key={f.q} {...f} />)}

        <div className="!mt-10 glass-navy rounded-2xl p-6 text-center text-white">
          <Phone className="mx-auto size-6 text-ice" />
          <p className="mt-2 font-display text-lg font-bold">Still have questions?</p>
          <p className="mt-1 text-sm text-white/70">We&apos;re happy to help — reach out anytime.</p>
          <div className="mt-4 flex justify-center gap-3">
            <a href={`https://wa.me/${BRAND.phoneRaw}`} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-bold hover:brightness-105">WhatsApp Us</a>
            <a href="/contact" className="glass rounded-xl px-5 py-2.5 text-sm font-bold hover:bg-white/15">Contact Page</a>
          </div>
        </div>
      </div>
    </>
  );
}

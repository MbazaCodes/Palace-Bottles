import { CreditCard, Smartphone, Banknote, ShieldCheck, Phone } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { BRAND } from "@/lib/constants";

export const metadata = { title: "Payment Methods — Palace Bottles" };

const METHODS = [
  { name: "M-Pesa", provider: "Vodacom", how: "Lipa Namba or direct transfer to our M-Pesa number. You'll receive the number and instructions after placing your order.", popular: true },
  { name: "Airtel Money", provider: "Airtel", how: "Transfer to our Airtel Money number. Instructions are sent via WhatsApp after checkout." },
  { name: "Mixx by Yas", provider: "Yas / CRDB", how: "Send payment via Mixx wallet. Our team will share the payment details after order placement." },
  { name: "HaloPesa", provider: "Halotel", how: "Transfer via HaloPesa to the number provided after checkout." },
  { name: "Cash on Delivery", provider: "Pay on arrival", how: "Pay in cash when your order is delivered. Available in Dar es Salaam and selected regions. Please have the exact amount ready." },
];

export default function PaymentMethodsPage() {
  return (
    <>
      <PageHero
        title="Payment Methods"
        subtitle="We offer multiple secure payment options to make your shopping easy."
        crumbs={[["Home", "/"], ["Payment Methods", "/payment-methods"]]}
      />
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-12">
        <section className="rounded-2xl border border-silver bg-white p-6 shadow-card">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-navy"><Smartphone className="size-5 text-royal" /> How Payment Works</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-navy/75">
            <p>Palace Bottles uses a <strong>confirm-then-pay</strong> model. When you place an order, our team contacts you to confirm your delivery address and the final amount (including delivery fee). You then pay via your chosen method.</p>
            <p>This ensures you know the exact total before any money leaves your account — no surprises.</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-xl font-bold text-navy">Accepted Payment Methods</h2>
          {METHODS.map((m) => (
            <div key={m.name} className="rounded-2xl border border-silver bg-white p-5 shadow-card">
              <div className="flex items-center gap-3">
                {m.name === "Cash on Delivery" ? <Banknote className="size-5 text-emerald-600" /> : <CreditCard className="size-5 text-royal" />}
                <div>
                  <p className="font-display text-base font-bold text-navy">{m.name} {m.popular && <span className="ml-2 rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">Most Popular</span>}</p>
                  <p className="text-xs text-navy/50">{m.provider}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-navy/70">{m.how}</p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-silver bg-white p-6 shadow-card">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-navy"><ShieldCheck className="size-5 text-royal" /> Payment Safety</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-navy/75">
            <p>Only send payments to numbers confirmed by Palace Bottles via our official WhatsApp ({BRAND.phone}). We will <strong>never</strong> ask you to pay to a personal number or through an unverified channel.</p>
            <p>If you have any doubts about a payment request, contact us immediately before sending money.</p>
          </div>
        </section>

        <div className="glass-navy rounded-2xl p-6 text-center text-white">
          <Phone className="mx-auto size-6 text-ice" />
          <p className="mt-2 font-display text-lg font-bold">Payment questions?</p>
          <p className="mt-1 text-sm text-white/70">Our team is here to help with payment instructions or verification.</p>
          <a href={`https://wa.me/${BRAND.phoneRaw}?text=Hello!%20I%20have%20a%20question%20about%20payment.`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-bold hover:brightness-105">Ask on WhatsApp</a>
        </div>
      </div>
    </>
  );
}

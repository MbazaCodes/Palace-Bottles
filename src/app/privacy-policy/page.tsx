import { Shield, Eye, Lock, Trash2, Phone } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { BRAND } from "@/lib/constants";

export const metadata = { title: "Privacy Policy — Palace Bottles" };

const SECTIONS = [
  {
    icon: Eye,
    title: "Information We Collect",
    content: "When you place an order, we collect your name, phone number, email address (if provided), and delivery address. This information is necessary to process and deliver your order. We do not collect data beyond what is needed to fulfil your purchase and provide customer support.",
  },
  {
    icon: Lock,
    title: "How We Use Your Information",
    content: "Your information is used to process orders, arrange delivery, send order updates via WhatsApp or SMS, and provide customer support. We may also use your email to send promotional offers and new product announcements — you can opt out at any time by replying STOP or contacting us.",
  },
  {
    icon: Shield,
    title: "Data Protection",
    content: "We store your data securely and do not share it with third parties for marketing purposes. Your payment details are handled directly by Mobile Money providers (M-Pesa, Airtel Money, Mixx by Yas, HaloPesa) — we do not store your mobile money PINs or financial credentials.",
  },
  {
    icon: Trash2,
    title: "Data Deletion",
    content: "You can request deletion of your personal data at any time by contacting us via WhatsApp or email. We will remove your information from our records within 30 days, except where we are required by law to retain it (e.g. financial transaction records).",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your personal information."
        crumbs={[["Home", "/"], ["Privacy Policy", "/privacy-policy"]]}
      />
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-12">
        <p className="text-sm text-navy/60">Last updated: June 2026</p>

        <section className="rounded-2xl border border-silver bg-white p-6 shadow-card">
          <p className="text-sm leading-relaxed text-navy/75">
            Palace Bottles (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your privacy. This policy explains what data we collect, how we use it, and your rights as a customer. By using our website and services, you agree to the terms described here.
          </p>
        </section>

        {SECTIONS.map((s) => (
          <section key={s.title} className="rounded-2xl border border-silver bg-white p-6 shadow-card">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-navy"><s.icon className="size-5 text-royal" /> {s.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-navy/75">{s.content}</p>
          </section>
        ))}

        <section className="rounded-2xl border border-silver bg-white p-6 shadow-card">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-navy"><Phone className="size-5 text-royal" /> Contact Us About Privacy</h2>
          <p className="mt-3 text-sm leading-relaxed text-navy/75">
            If you have questions about this privacy policy or want to exercise your data rights, contact us at:
          </p>
          <div className="mt-3 text-sm text-navy/75">
            <p>Email: <a href={`mailto:${BRAND.email}`} className="font-semibold text-royal hover:underline">{BRAND.email}</a></p>
            <p>WhatsApp: <a href={`https://wa.me/${BRAND.phoneRaw}`} className="font-semibold text-royal hover:underline">{BRAND.phone}</a></p>
            <p>Address: {BRAND.address}</p>
          </div>
        </section>
      </div>
    </>
  );
}

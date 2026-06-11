"use client";
import { useState } from "react";
import { Send, Lock } from "lucide-react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const input = "mt-1 w-full rounded-xl border border-silver bg-white px-3.5 py-3 text-sm outline-none focus:border-royal";

  return (
    <div className="rounded-2xl border border-silver bg-white p-6 shadow-card">
      <h2 className="font-display text-xl font-bold text-navy">Send Us a Message</h2>
      <p className="mt-1 text-sm text-navy/60">Fill out the form below and we&apos;ll get back to you.</p>
      {sent ? (
        <p className="mt-6 rounded-xl bg-emerald-50 px-4 py-4 text-sm font-semibold text-emerald-700">
          Message sent. We&apos;ll reply within 24 hours — asante!
        </p>
      ) : (
        <form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <label className="text-sm font-semibold text-navy">Full Name *<input required className={input} placeholder="Enter your full name" /></label>
          <label className="text-sm font-semibold text-navy">Phone Number *<input required inputMode="tel" className={input} placeholder="+255 7XX XXX XXX" /></label>
          <label className="text-sm font-semibold text-navy sm:col-span-2">Email Address<input type="email" className={input} placeholder="Enter your email address" /></label>
          <label className="text-sm font-semibold text-navy sm:col-span-2">Subject *
            <select required className={input} defaultValue="">
              <option value="" disabled>Select a subject</option>
              <option>Product Question</option><option>Order Support</option><option>Delivery Assistance</option><option>Wholesale / Bulk Order</option><option>Other</option>
            </select>
          </label>
          <label className="text-sm font-semibold text-navy sm:col-span-2">Message *<textarea required rows={4} className={input} placeholder="Type your message here..." /></label>
          <button className="flex items-center justify-center gap-2 rounded-xl bg-royal py-3.5 text-sm font-bold text-white hover:bg-royal-bright sm:col-span-2">
            <Send className="size-4" /> Send Message
          </button>
          <p className="flex items-center justify-center gap-1.5 text-xs text-navy/50 sm:col-span-2">
            <Lock className="size-3" /> Your information is safe with us. We respect your privacy.
          </p>
        </form>
      )}
    </div>
  );
}

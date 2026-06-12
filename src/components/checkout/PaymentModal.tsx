"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, ShieldCheck, CheckCircle2, Loader2, Smartphone } from "lucide-react";
import { formatTZS } from "@/lib/constants";

/** Lipa Namba / payment numbers for each mobile money operator */
const LIPA_NAMBA: Record<string, { number: string; name: string; instructions: string }> = {
  "M-Pesa": {
    number: "5657397719",
    name: "PALACE BOTTLES",
    instructions: "Dial *150*00# → Lipa kwa Simu → Enter Business No → Enter Amount → Confirm with PIN",
  },
  "Airtel Money": {
    number: "0657397719",
    name: "PALACE BOTTLES",
    instructions: "Dial *150*60# → Pay Bill → Enter Business No → Enter Amount → Confirm with PIN",
  },
  "Mixx by Yas": {
    number: "0657397719",
    name: "PALACE BOTTLES",
    instructions: "Open Mixx App → Pay → Enter Number → Enter Amount → Confirm",
  },
  "HaloPesa": {
    number: "0657397719",
    name: "PALACE BOTTLES",
    instructions: "Dial *150*88# → Lipa → Enter Business No → Enter Amount → Confirm with PIN",
  },
};

type Step = "enter" | "processing" | "confirming" | "success";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  method: string;
  amount: number;
}

export default function PaymentModal({ open, onClose, onSuccess, method, amount }: PaymentModalProps) {
  const [step, setStep] = useState<Step>("enter");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const lipa = LIPA_NAMBA[method];

  // Reset on open
  useEffect(() => {
    if (open) { setStep("enter"); setPhone(""); setError(""); }
  }, [open]);

  // Auto-advance through processing steps
  useEffect(() => {
    if (step === "processing") {
      const t = setTimeout(() => setStep("confirming"), 2000);
      return () => clearTimeout(t);
    }
    if (step === "confirming") {
      const t = setTimeout(() => setStep("success"), 3500);
      return () => clearTimeout(t);
    }
    if (step === "success") {
      const t = setTimeout(() => onSuccess(), 2500);
      return () => clearTimeout(t);
    }
  }, [step, onSuccess]);

  const handlePay = () => {
    const cleaned = phone.replace(/\s/g, "");
    if (!/^(\+255|0)[67]\d{8}$/.test(cleaned)) {
      setError("Enter a valid Tanzanian phone number");
      return;
    }
    setError("");
    setStep("processing");
  };

  if (!open || !lipa) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-night/70 px-4 backdrop-blur-sm"
        onClick={(e) => { if (e.target === e.currentTarget && step === "enter") onClose(); }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-float"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-navy px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <Smartphone className="size-5 text-ice" />
              <div>
                <p className="font-display text-sm font-bold">{method} Payment</p>
                <p className="text-xs text-white/60">Secure mobile money</p>
              </div>
            </div>
            {step === "enter" && (
              <button onClick={onClose} className="rounded-full p-1.5 hover:bg-white/10"><X className="size-5" /></button>
            )}
          </div>

          <div className="p-6">
            {/* Step 1: Enter phone */}
            {step === "enter" && (
              <>
                {/* Lipa Namba card */}
                <div className="rounded-2xl border border-ice bg-ice/30 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy/60">Lipa Namba / Business Number</p>
                  <p className="mt-1 font-display text-2xl font-extrabold tracking-wider text-navy">{lipa.number}</p>
                  <p className="mt-0.5 text-sm font-semibold text-navy/70">{lipa.name}</p>
                </div>

                <div className="mt-4 rounded-xl bg-frost p-3">
                  <p className="text-xs text-navy/60">{lipa.instructions}</p>
                </div>

                <div className="mt-5">
                  <label className="text-sm font-semibold text-navy">Your {method} Number *</label>
                  <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-silver px-3.5 py-3">
                    <Phone className="size-4 text-navy/40" />
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+255 6XX XXX XXX"
                      inputMode="tel"
                      className="w-full text-sm outline-none placeholder:text-navy/40"
                    />
                  </div>
                  {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
                </div>

                <div className="mt-4 flex items-center justify-between rounded-xl border border-silver px-4 py-3">
                  <span className="text-sm text-navy/60">Amount to pay</span>
                  <span className="font-display text-xl font-extrabold text-navy">{formatTZS(amount)}</span>
                </div>

                <button
                  onClick={handlePay}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-royal py-3.5 text-sm font-bold text-white hover:bg-royal-bright"
                >
                  Pay {formatTZS(amount)} via {method}
                </button>

                <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-navy/50">
                  <ShieldCheck className="size-3.5 text-emerald-500" /> Secured by {method}. You will confirm with your PIN.
                </p>
              </>
            )}

            {/* Step 2: Processing */}
            {step === "processing" && (
              <div className="flex flex-col items-center py-8 text-center">
                <Loader2 className="size-12 animate-spin text-royal" />
                <p className="mt-4 font-display text-lg font-bold text-navy">Sending Payment Request...</p>
                <p className="mt-2 text-sm text-navy/60">
                  A payment prompt is being sent to<br />
                  <strong className="text-navy">{phone}</strong>
                </p>
              </div>
            )}

            {/* Step 3: Waiting for PIN */}
            {step === "confirming" && (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="relative">
                  <Smartphone className="size-14 text-navy" />
                  <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-white">!</span>
                </div>
                <p className="mt-4 font-display text-lg font-bold text-navy">Confirm on Your Phone</p>
                <p className="mt-2 text-sm text-navy/60">
                  Check your phone for the {method} prompt.<br />
                  Enter your <strong className="text-navy">PIN</strong> to complete the payment of {formatTZS(amount)}.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-amber-600">
                  <Loader2 className="size-4 animate-spin" /> Waiting for confirmation...
                </div>
              </div>
            )}

            {/* Step 4: Success */}
            {step === "success" && (
              <div className="flex flex-col items-center py-8 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}>
                  <CheckCircle2 className="size-16 text-emerald-500" />
                </motion.div>
                <p className="mt-4 font-display text-lg font-bold text-navy">Payment Successful!</p>
                <p className="mt-2 text-sm text-navy/60">
                  {formatTZS(amount)} received via {method}.<br />
                  Redirecting to your order confirmation...
                </p>
                <div className="mt-4 rounded-xl bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
                  Transaction confirmed ✓
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

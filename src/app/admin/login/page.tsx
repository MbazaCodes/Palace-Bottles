"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { loginAdmin, DEMO_ADMIN } from "@/lib/adminAuth";
import Bottle3D from "@/components/ui/Bottle3D";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(email, password)) {
      router.replace("/admin");
    } else {
      setError("Email or password is incorrect. Check the demo credentials below.");
    }
  };

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-navy-night px-4 py-10">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(37,99,235,0.35),transparent_55%)]" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_85%,rgba(16,42,107,0.6),transparent_60%)]" />
      <div aria-hidden className="absolute -left-6 top-16 w-24 opacity-30 animate-float" style={{ "--tilt": "-10deg" } as React.CSSProperties}>
        <Bottle3D body="#2563eb" accent="#60a5fa" shape="bottle" label={false} />
      </div>
      <div aria-hidden className="absolute -right-4 bottom-12 w-28 opacity-30 animate-float-slow" style={{ "--tilt": "8deg" } as React.CSSProperties}>
        <Bottle3D body="#cdd3dd" accent="#e8eaf0" shape="flask" label={false} />
      </div>

      <div className="glass relative w-full max-w-md rounded-3xl p-8 text-white shadow-float">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo-full.png" alt="Palace Bottles" className="h-10 w-auto" />
          <p className="text-xs text-white/60">Admin Panel</p>
        </div>

        <h1 className="mt-7 font-display text-2xl font-extrabold">Welcome back</h1>
        <p className="mt-1 text-sm text-white/65">Sign in to manage your store.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block text-sm font-semibold">Email
            <span className="mt-1.5 flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3.5 py-3 focus-within:border-ice">
              <Mail className="size-4 text-white/45" />
              <input type="email" required value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="admin@palacebottles.com" autoComplete="username"
                className="w-full bg-transparent text-sm outline-none placeholder:text-white/35" />
            </span>
          </label>
          <label className="block text-sm font-semibold">Password
            <span className="mt-1.5 flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3.5 py-3 focus-within:border-ice">
              <Lock className="size-4 text-white/45" />
              <input type={show ? "text" : "password"} required value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="••••••••" autoComplete="current-password"
                className="w-full bg-transparent text-sm outline-none placeholder:text-white/35" />
              <button type="button" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"}>
                {show ? <EyeOff className="size-4 text-white/45" /> : <Eye className="size-4 text-white/45" />}
              </button>
            </span>
          </label>

          {error && <p className="rounded-xl bg-red-500/15 px-3.5 py-2.5 text-xs font-semibold text-red-300">{error}</p>}

          <button className="w-full rounded-xl bg-royal py-3.5 text-sm font-bold transition-colors hover:bg-royal-bright">Sign In</button>
        </form>

        <div className="mt-5 rounded-xl border border-ice/20 bg-ice/10 p-3.5 text-xs text-ice">
          <p className="font-bold">Demo credentials (until Supabase Auth is connected):</p>
          <p className="mt-1">Email: {DEMO_ADMIN.email}</p>
          <p>Password: {DEMO_ADMIN.password}</p>
          <p className="mt-2 border-t border-ice/15 pt-2 text-ice/80">Staff accounts created in <span className="font-semibold">Admin › Staff &amp; Roles</span> sign in here with the email &amp; password the admin set — and only see their role&apos;s modules.</p>
        </div>

        <Link href="/" className="mt-5 flex items-center justify-center gap-1.5 text-xs font-semibold text-white/55 hover:text-white">
          <ArrowLeft className="size-3.5" /> Back to store
        </Link>
      </div>
    </div>
  );
}

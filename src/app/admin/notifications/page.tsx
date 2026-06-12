"use client";
import { useState } from "react";
import { Send, MessageSquare, Mail, Smartphone } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";

const HISTORY_INIT: { channel: string; audience: string; message: string; date: string; status: string }[] = [];

const CHANNELS = [
  { name: "SMS", icon: Smartphone },
  { name: "WhatsApp", icon: MessageSquare },
  { name: "Email", icon: Mail },
];

export default function AdminNotificationsPage() {
  const [history, setHistory] = useState(HISTORY_INIT);
  const [channel, setChannel] = useState("WhatsApp");
  const [audience, setAudience] = useState("All Customers");
  const [message, setMessage] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setHistory([{ channel, audience, message, date: "Just now", status: "Sent" }, ...history]);
    setMessage("");
  };

  return (
    <>
      <div>
        <h1 className="font-display text-2xl font-extrabold text-navy">Notification Center</h1>
        <p className="text-xs text-navy/50">Dashboard › Notifications</p>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[24rem_1fr]">
        {/* Composer */}
        <form onSubmit={send} className="h-fit rounded-2xl border border-silver bg-white p-5 shadow-card">
          <h2 className="font-display text-base font-bold text-navy">Send Notification</h2>
          <p className="mt-3 text-sm font-semibold text-navy">Channel</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {CHANNELS.map((c) => (
              <button type="button" key={c.name} onClick={() => setChannel(c.name)}
                className={`flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 text-xs font-bold transition-colors ${channel === c.name ? "border-royal bg-ice/60 text-navy" : "border-silver text-navy/60 hover:border-navy/30"}`}>
                <c.icon className="size-4.5" /> {c.name}
              </button>
            ))}
          </div>
          <label className="mt-4 block text-sm font-semibold text-navy">Audience
            <select value={audience} onChange={(e) => setAudience(e.target.value)} className="mt-1 w-full rounded-xl border border-silver px-3.5 py-2.5 text-sm outline-none focus:border-royal">
              <option>All Customers</option><option>One Customer</option><option>Loyalty Members</option>
              <option>Dar es Salaam Customers</option><option>Customers with Pending Orders</option>
            </select>
          </label>
          {audience === "One Customer" && (
            <label className="mt-3 block text-sm font-semibold text-navy">Phone Number
              <input inputMode="tel" placeholder="+255 7XX XXX XXX" className="mt-1 w-full rounded-xl border border-silver px-3.5 py-2.5 text-sm outline-none focus:border-royal" />
            </label>
          )}
          <label className="mt-4 block text-sm font-semibold text-navy">Message *
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={4} maxLength={320}
              className="mt-1 w-full rounded-xl border border-silver px-3.5 py-2.5 text-sm outline-none focus:border-royal" placeholder="Write your message..." />
            <span className="text-xs font-normal text-navy/45">{message.length}/320</span>
          </label>
          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-royal py-2.5 text-sm font-bold text-white hover:bg-royal-bright"><Send className="size-4" /> Send via {channel}</button>
          <p className="mt-3 text-xs text-navy/45">Messages are queued for delivery. Connect your SMS/WhatsApp gateway in Settings.</p>
        </form>

        {/* History */}
        <div className="overflow-x-auto rounded-2xl border border-silver bg-white shadow-card">
          <h2 className="px-4 pt-4 font-display text-base font-bold text-navy">Sent Notifications</h2>
          <table className="mt-2 w-full min-w-[36rem] text-sm">
            <thead><tr className="border-b border-silver text-left text-xs text-navy/50"><th className="px-4 py-3 font-medium">Channel</th><th className="font-medium">Audience</th><th className="font-medium">Message</th><th className="font-medium">Date</th><th className="px-4 font-medium">Status</th></tr></thead>
            <tbody>
              {history.map((h, i) => (
                <tr key={i} className="border-b border-silver/60 last:border-0 align-top hover:bg-frost/60">
                  <td className="px-4 py-3 font-semibold text-navy">{h.channel}</td>
                  <td className="text-navy/70">{h.audience}</td>
                  <td className="max-w-[18rem] text-xs text-navy/65">{h.message}</td>
                  <td className="whitespace-nowrap text-xs text-navy/55">{h.date}</td>
                  <td className="px-4"><StatusBadge status={h.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

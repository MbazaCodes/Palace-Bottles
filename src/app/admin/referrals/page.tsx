import StatusBadge from "@/components/admin/StatusBadge";

export const metadata = { title: "Referrals — Palace Bottles Admin" };

const REFERRALS: { referrer: string; referred: string; date: string; converted: boolean; reward: string; status: string }[] = [];

export default function AdminReferralsPage() {
  return (
    <>
      <div>
        <h1 className="font-display text-2xl font-extrabold text-navy">Referrals</h1>
        <p className="text-xs text-navy/50">Dashboard › Referrals</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[["Total Referrals", "0"], ["Converted", "0"], ["Conversion Rate", "0%"], ["Rewards Issued", "0 pts"]].map(([l, v]) => (
          <div key={l} className="rounded-2xl border border-silver bg-white p-4 shadow-card">
            <p className="text-xs text-navy/55">{l}</p>
            <p className="font-display text-xl font-extrabold text-navy">{v}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-silver bg-white shadow-card">
        <table className="w-full min-w-[40rem] text-sm">
          <thead>
            <tr className="border-b border-silver text-left text-xs text-navy/50">
              <th className="px-4 py-3 font-medium">Referrer</th><th className="font-medium">Referred Phone</th>
              <th className="font-medium">Date</th><th className="font-medium">First Order</th>
              <th className="font-medium">Reward</th><th className="px-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {REFERRALS.map((r, i) => (
              <tr key={i} className="border-b border-silver/60 last:border-0 hover:bg-frost/60">
                <td className="px-4 py-3 font-semibold text-navy">{r.referrer}</td>
                <td className="text-navy/70">{r.referred}</td>
                <td className="text-xs text-navy/55">{r.date}</td>
                <td className={`font-semibold ${r.converted ? "text-emerald-600" : "text-navy/45"}`}>{r.converted ? "Placed" : "Not yet"}</td>
                <td className="text-navy/70">{r.reward}</td>
                <td className="px-4"><StatusBadge status={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  );
}

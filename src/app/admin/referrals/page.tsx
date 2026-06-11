import StatusBadge from "@/components/admin/StatusBadge";

export const metadata = { title: "Referrals — Palace Bottles Admin" };

const REFERRALS = [
  { referrer: "Juma Mwinyi", referred: "+255 713 222 111", date: "May 18, 2026", converted: true, reward: "500 points", status: "Rewarded" },
  { referrer: "Asha Mohamed", referred: "+255 715 888 222", date: "May 17, 2026", converted: true, reward: "500 points", status: "Rewarded" },
  { referrer: "Hassan Khamis", referred: "+255 762 333 444", date: "May 17, 2026", converted: false, reward: "—", status: "Pending" },
  { referrer: "Neema Paul", referred: "+255 657 999 555", date: "May 16, 2026", converted: true, reward: "500 points", status: "Rewarded" },
  { referrer: "Michael John", referred: "+255 688 111 333", date: "May 15, 2026", converted: false, reward: "—", status: "Pending" },
  { referrer: "Rehema Ally", referred: "+255 745 654 987", date: "May 14, 2026", converted: false, reward: "—", status: "Expired" },
];

export default function AdminReferralsPage() {
  return (
    <>
      <div>
        <h1 className="font-display text-2xl font-extrabold text-navy">Referrals</h1>
        <p className="text-xs text-navy/50">Dashboard › Referrals</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[["Total Referrals", "428"], ["Converted", "186"], ["Conversion Rate", "43.5%"], ["Rewards Issued", "93,000 pts"]].map(([l, v]) => (
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

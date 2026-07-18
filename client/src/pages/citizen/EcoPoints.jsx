import { useState } from "react";
import {
  FaAward,
  FaCertificate,
  FaGift,
  FaLeaf,
  FaMedal,
  FaSeedling,
  FaTrophy,
} from "react-icons/fa";

const rewards = [
  ["Reusable Kit Coupon", "500 pts", "Available"],
  ["Tree Plantation Certificate", "900 pts", "Available"],
  ["Community Champion Hoodie", "1,600 pts", "Locked"],
  ["Metro Green Pass", "2,200 pts", "Locked"],
];

const history = [
  ["CP-1021 verified", "+120", "Today"],
  ["Daily challenge completed", "+45", "Yesterday"],
  ["Feedback submitted", "+30", "16 Jul"],
  ["Leaderboard bonus", "+200", "15 Jul"],
];

export default function EcoPoints() {
  const [notice, setNotice] = useState("");

  return (
    <div className="space-y-7">
      {notice && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-800">
          {notice}
        </div>
      )}
      <section className="rounded-[2rem] bg-gradient-to-br from-emerald-700 via-teal-700 to-slate-950 p-8 text-white shadow-xl">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-200">
              Green Wallet
            </p>
            <h1 className="mt-4 text-5xl font-black">2,840 Green Points</h1>
            <p className="mt-4 max-w-2xl text-emerald-50">
              Redeem rewards, track certificates, unlock badges, and follow
              your EcoPulse AI contribution history.
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-white/10 p-5">
            <FaLeaf className="text-5xl text-lime-300" />
          </div>
        </div>
        <div className="mt-8 h-3 overflow-hidden rounded-full bg-white/15">
          <div className="h-full w-[76%] rounded-full bg-lime-300" />
        </div>
        <p className="mt-3 text-sm font-bold text-emerald-100">
          660 points to Level 6 Eco Champion
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-4">
        {[
          ["Badges", "12", FaAward],
          ["Certificates", "3", FaCertificate],
          ["Current Streak", "8 days", FaSeedling],
          ["Leaderboard", "#7", FaTrophy],
        ].map(([label, value, Icon]) => (
          <div key={label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <Icon className="text-2xl text-emerald-600" />
            <p className="mt-4 text-sm font-bold text-slate-500">{label}</p>
            <p className="mt-1 text-3xl font-black text-slate-950">{value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-950">Redeem Rewards</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {rewards.map(([title, points, status]) => (
              <div key={title} className="rounded-3xl border border-slate-100 p-5">
                <FaGift className="text-2xl text-emerald-600" />
                <h3 className="mt-4 font-black text-slate-900">{title}</h3>
                <p className="mt-1 text-sm font-bold text-slate-500">{points}</p>
                <button
                  type="button"
                  onClick={() => setNotice(`${title} selected. Redemption request is ready for confirmation.`)}
                  disabled={status === "Locked"}
                  className="mt-5 rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white disabled:bg-slate-100 disabled:text-slate-400"
                >
                  {status}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-950">Eco Points History</h2>
          <div className="mt-6 space-y-4">
            {history.map(([label, points, date]) => (
              <div key={label} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <FaMedal className="text-emerald-600" />
                  <div>
                    <p className="font-bold text-slate-900">{label}</p>
                    <p className="text-sm text-slate-500">{date}</p>
                  </div>
                </div>
                <span className="font-black text-emerald-600">{points}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

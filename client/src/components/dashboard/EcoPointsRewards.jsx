import {
  FaCalendarCheck,
  FaGift,
  FaLeaf,
  FaMedal,
  FaRecycle,
  FaSeedling,
} from "react-icons/fa";
import { useState } from "react";

const rewards = [
  {
    title: "Reusable Kit Coupon",
    points: 500,
    status: "Available",
  },
  {
    title: "Tree Plantation Certificate",
    points: 900,
    status: "Locked",
  },
  {
    title: "Community Champion Badge",
    points: 1200,
    status: "Locked",
  },
];

const earningRules = [
  { action: "Verified complaint", points: "+120", icon: FaRecycle },
  { action: "Resolved report feedback", points: "+40", icon: FaMedal },
  { action: "Daily eco streak", points: "+25", icon: FaCalendarCheck },
];

export default function EcoPointsRewards() {
  const [notice, setNotice] = useState("");

  return (
    <section id="eco-points" className="mt-10">
      {notice && (
        <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">
          {notice}
        </div>
      )}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Eco Points & Rewards
          </h2>
          <p className="mt-1 text-gray-600">
            Turn verified cleanliness actions into points, badges, and civic
            rewards.
          </p>
        </div>
        <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">
          Development preview
        </span>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-500 p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100">Current Balance</p>
              <h3 className="mt-2 text-5xl font-extrabold">2,450</h3>
              <p className="mt-2 text-emerald-50">Green Points</p>
            </div>
            <div className="rounded-2xl bg-white/15 p-5">
              <FaLeaf className="text-4xl" />
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-white/15 p-5">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>Level 4 Citizen</span>
              <span>550 pts to Level 5</span>
            </div>
            <div className="mt-3 h-3 rounded-full bg-white/20">
              <div className="h-3 w-[78%] rounded-full bg-white" />
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/15 p-4">
              <FaSeedling className="text-2xl" />
              <p className="mt-3 text-sm text-emerald-50">Daily Streak</p>
              <p className="text-2xl font-bold">6 days</p>
            </div>
            <div className="rounded-2xl bg-white/15 p-4">
              <FaGift className="text-2xl" />
              <p className="mt-3 text-sm text-emerald-50">Redeemable</p>
              <p className="text-2xl font-bold">1 reward</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h3 className="text-xl font-bold text-gray-800">
              Rewards Marketplace
            </h3>
            <div className="mt-5 space-y-4">
              {rewards.map((reward) => (
                <div
                  key={reward.title}
                  className="rounded-xl border border-gray-100 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-bold text-gray-800">{reward.title}</p>
                      <p className="mt-1 text-sm text-gray-500">
                        {reward.points} points required
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setNotice(`${reward.title} selected. Redemption request is ready.`)
                      }
                      disabled={reward.status === "Locked"}
                      className={`rounded-full px-4 py-2 text-sm font-bold ${
                        reward.status === "Available"
                          ? "bg-emerald-600 text-white hover:bg-emerald-700"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {reward.status}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h3 className="text-xl font-bold text-gray-800">
              How to Earn More
            </h3>
            <div className="mt-5 space-y-4">
              {earningRules.map((rule) => {
                const Icon = rule.icon;

                return (
                  <div
                    key={rule.action}
                    className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
                        <Icon />
                      </div>
                      <span className="font-semibold text-gray-700">
                        {rule.action}
                      </span>
                    </div>
                    <span className="font-bold text-emerald-700">
                      {rule.points}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaAward,
  FaBell,
  FaCertificate,
  FaChartLine,
  FaCheckCircle,
  FaCloud,
  FaCrown,
  FaLeaf,
  FaMedal,
  FaRoute,
  FaSeedling,
  FaShieldAlt,
  FaTrophy,
  FaUserCircle,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { getComplaintDashboard } from "../../services/complaintService";

const buildStats = (analytics) => [
  { label: "Eco Score", value: analytics?.ecoScore ?? "92", suffix: "/100", icon: FaShieldAlt, tone: "from-emerald-500 to-teal-500" },
  { label: "Green Points", value: analytics?.greenPoints ?? "2,840", suffix: "pts", icon: FaLeaf, tone: "from-lime-500 to-emerald-500" },
  { label: "Current Rank", value: analytics?.currentRank ?? "#7", suffix: "city", icon: FaTrophy, tone: "from-amber-400 to-orange-500" },
  { label: "Carbon Saved", value: analytics?.carbonSaved ?? "146 kg", suffix: "impact", icon: FaCloud, tone: "from-sky-500 to-cyan-500" },
  { label: "Reports Submitted", value: analytics?.total ?? "24", suffix: "total", icon: FaRoute, tone: "from-blue-500 to-indigo-500" },
  { label: "Resolved Complaints", value: analytics?.resolved ?? "19", suffix: "closed", icon: FaCheckCircle, tone: "from-green-500 to-emerald-600" },
];

const progress = [
  ["Mon", 42],
  ["Tue", 64],
  ["Wed", 58],
  ["Thu", 78],
  ["Fri", 72],
  ["Sat", 88],
  ["Sun", 94],
];

const timeline = [
  ["Submitted", "CP-1024 logged with image, GPS and timestamp", "10:12 AM"],
  ["AI Verification", "Mixed waste detected with 94% confidence", "10:13 AM"],
  ["Assigned", "Worker Team B notified for Kukatpally zone", "10:18 AM"],
  ["Cleaning", "Before/after verification pending", "Expected 2:30 PM"],
];

const activities = [
  "You earned 120 green points for CP-1019.",
  "Your area cleanliness score improved by 8% this week.",
  "AI recommends separating plastic waste before pickup tomorrow.",
];

const badges = [
  ["Clean Street", FaLeaf],
  ["Fast Reporter", FaMedal],
  ["Eco Champion", FaCrown],
  ["Tree Saver", FaSeedling],
];

const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

function MetricCard({ item }) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/70 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-bold text-slate-500">{item.label}</p>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-3xl font-black text-slate-950">{item.value}</span>
            <span className="pb-1 text-sm font-bold text-slate-400">{item.suffix}</span>
          </div>
        </div>
        <div className={`rounded-2xl bg-gradient-to-br ${item.tone} p-3 text-white shadow-lg`}>
          <Icon />
        </div>
      </div>
    </motion.div>
  );
}

export default function CitizenDashboard() {
  const { user } = useAuth();
  const [panel, setPanel] = useState("");
  const [dashboardData, setDashboardData] = useState(null);
  const firstName = user?.name?.split(" ")[0] || "Citizen";
  const stats = buildStats(dashboardData?.analytics);

  useEffect(() => {
    getComplaintDashboard()
      .then(setDashboardData)
      .catch(() => setDashboardData(null));
  }, []);

  return (
    <div className="space-y-7">
      <section className="overflow-hidden rounded-[2rem] border border-white/70 bg-slate-950 text-white shadow-xl">
        <div className="grid gap-8 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-emerald-400/15 px-4 py-2 text-sm font-bold text-emerald-200">
                Citizen Impact Hub
              </span>
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-slate-200">
                Leaderboard position #7
              </span>
            </div>
            <h1 className="mt-8 text-4xl font-black tracking-normal md:text-6xl">
              {"\u{1F44B}"} {greeting()}, {firstName}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              Welcome back to EcoPulse AI. Your reports are moving through AI
              verification, worker assignment, rewards, and city analytics in
              one connected workspace.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Today's Eco Tip", "Today's Challenge", "Weekly Progress"].map((label, index) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">{label}</p>
                  <p className="mt-2 font-semibold text-white">
                    {index === 0 && "Carry a reusable bottle today."}
                    {index === 1 && "Report one overflowing bin nearby."}
                    {index === 2 && "94% of weekly goal complete."}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] bg-white p-5 text-slate-950">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500">Area Cleanliness</p>
                <h2 className="mt-2 text-5xl font-black">86%</h2>
              </div>
              <div
                className="relative grid h-28 w-28 place-items-center rounded-full"
                style={{ background: "conic-gradient(#22c55e 0 86%, #e2e8f0 86% 100%)" }}
              >
                <div className="grid h-20 w-20 place-items-center rounded-full bg-white text-center text-sm font-black text-emerald-700">
                  Good
                </div>
              </div>
            </div>
            <div className="mt-6 rounded-2xl bg-emerald-50 p-4">
              <p className="text-sm font-bold text-emerald-700">AI Assistant Widget</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Mixed waste complaints peak near your area on weekends. Reporting
                before noon improves pickup response by 22%.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setPanel("Notification center opened: 3 updates need your attention.")}
              className="mt-5 flex w-full items-center justify-between rounded-2xl border border-slate-100 p-4 text-left transition hover:border-emerald-200 hover:bg-emerald-50"
            >
              <div className="flex items-center gap-3">
                <FaBell className="text-emerald-600" />
                <span className="font-bold">3 notifications</span>
              </div>
              <FaUserCircle className="text-3xl text-slate-400" />
            </button>
          </div>
        </div>
      </section>

      {panel && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-800">
          {panel}
        </div>
      )}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {stats.map((item) => (
          <MetricCard key={item.label} item={item} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-600">Interactive Charts</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">Weekly Eco Progress</h2>
            </div>
            <FaChartLine className="text-3xl text-emerald-600" />
          </div>
          <div className="mt-8 flex h-72 items-end gap-3">
            {progress.map(([day, value]) => (
              <div key={day} className="flex flex-1 flex-col items-center gap-3">
                <div className="flex h-56 w-full items-end rounded-2xl bg-slate-100 p-1">
                  <div
                    className="w-full rounded-2xl bg-gradient-to-t from-emerald-600 to-lime-400"
                    style={{ height: `${value}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-slate-500">{day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-950">Leaderboard Position</h2>
          <div className="mt-6 space-y-4">
            {["Akshay - 3,420", `${firstName} - 2,840`, "Priya - 2,780"].map((person, index) => (
              <div key={person} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-100 font-black text-emerald-700">
                    {index + 6}
                  </span>
                  <span className="font-bold text-slate-800">{person}</span>
                </div>
                <FaTrophy className={index === 1 ? "text-amber-500" : "text-slate-300"} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr_0.8fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-950">Complaint Timeline</h2>
          <div className="mt-6 space-y-5">
            {timeline.map(([title, detail, time]) => (
              <div key={title} className="flex gap-4">
                <div className="mt-1 h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                <div>
                  <p className="font-black text-slate-900">{title}</p>
                  <p className="mt-1 text-sm text-slate-500">{detail}</p>
                  <p className="mt-1 text-xs font-bold text-emerald-600">{time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-950">Recent Activity</h2>
          <div className="mt-6 space-y-4">
            {activities.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                <FaAward className="mt-1 text-emerald-600" />
                <p className="text-sm font-semibold leading-6 text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-950">Achievements</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {badges.map(([label, Icon]) => (
              <div key={label} className="flex items-center gap-3 rounded-2xl border border-slate-100 p-4">
                <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
                  <Icon />
                </div>
                <div>
                  <p className="font-black text-slate-900">{label}</p>
                  <p className="text-xs font-bold text-slate-400">Badge unlocked</p>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3 rounded-2xl bg-slate-950 p-4 text-white">
              <FaCertificate className="text-emerald-300" />
              <span className="font-bold">2 certificates ready</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

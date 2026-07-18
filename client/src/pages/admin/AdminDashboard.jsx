import {
  FaBell,
  FaChartPie,
  FaCheckCircle,
  FaClipboardList,
  FaCog,
  FaDatabase,
  FaFileAlt,
  FaLeaf,
  FaMapMarkedAlt,
  FaRecycle,
  FaRobot,
  FaShieldAlt,
  FaTachometerAlt,
  FaUsers,
  FaUserShield,
  FaUserTie,
  FaWrench,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import EcoPulseLogo from "../../components/brand/EcoPulseLogo";
import { getComplaintDashboard } from "../../services/complaintService";

const summary = [
  ["Users", "18,420", FaUsers],
  ["Citizens", "16,900", FaUsers],
  ["Workers", "630", FaUserTie],
  ["Supervisors", "125", FaUserShield],
  ["Complaints", "3,200", FaClipboardList],
  ["Resolved", "2,900", FaCheckCircle],
  ["Carbon Saved", "14.8 t", FaLeaf],
  ["Waste Collected", "96 t", FaRecycle],
];

const modules = [
  ["User Management", "Role approvals, blocked accounts, profiles", FaUsers],
  ["Complaint Management", "Assignment, priority, verification, audit trail", FaClipboardList],
  ["Rewards", "Green points, badges, certificates, coupons", FaLeaf],
  ["Leaderboards", "Citizen, worker, area rankings", FaTachometerAlt],
  ["Notifications", "In-app, reminders, escalation messages", FaBell],
  ["Reports", "Weekly, monthly, PDF export pipeline", FaFileAlt],
  ["Security", "Login logs, role authorization, anomalies", FaShieldAlt],
  ["Settings", "Rules, reminder intervals, city zones", FaCog],
];

const bars = [
  ["Jan", 38, 24],
  ["Feb", 52, 35],
  ["Mar", 74, 48],
  ["Apr", 58, 44],
  ["May", 82, 61],
  ["Jun", 78, 59],
];

export default function AdminDashboard() {
  const [activeModule, setActiveModule] = useState("System Health");
  const [analytics, setAnalytics] = useState(null);
  const dynamicSummary = summary.map((item) => {
    if (item[0] === "Complaints") return ["Complaints", analytics?.total ?? item[1], item[2]];
    if (item[0] === "Resolved") return ["Resolved", analytics?.resolved ?? item[1], item[2]];
    if (item[0] === "Carbon Saved") return ["Carbon Saved", analytics?.carbonSaved ?? item[1], item[2]];
    return item;
  });

  useEffect(() => {
    getComplaintDashboard()
      .then((data) => setAnalytics(data.analytics))
      .catch(() => setAnalytics(null));
  }, []);

  return (
    <div className="space-y-7">
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-800">
        Active panel: {activeModule}
      </div>
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-6 p-6 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[1.5rem] bg-slate-950 p-7 text-white">
            <EcoPulseLogo inverted />
            <p className="mt-8 text-sm font-bold uppercase tracking-[0.24em] text-emerald-200">
              Admin Control Center
            </p>
            <h1 className="mt-4 text-4xl font-black md:text-5xl">
              City Cleanliness Score
            </h1>
            <div className="mt-8 flex items-end gap-4">
              <span className="text-7xl font-black">88</span>
              <span className="pb-3 text-2xl font-bold text-emerald-300">/100</span>
            </div>
            <p className="mt-5 leading-7 text-slate-300">
              AI predicts complaint load will drop 11% this week if high-risk
              zones receive one extra worker team before 5 PM.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {dynamicSummary.map(([label, value, Icon]) => (
              <div key={label} className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                <Icon className="text-2xl text-emerald-600" />
                <p className="mt-4 text-sm font-bold text-slate-500">{label}</p>
                <p className="mt-1 text-3xl font-black text-slate-950">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-600">
                Complaint Analytics
              </p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Reported vs Resolved
              </h2>
            </div>
            <FaChartPie className="text-3xl text-emerald-600" />
          </div>
          <div className="mt-8 flex h-72 items-end gap-4">
            {bars.map(([month, reported, resolved]) => (
              <div key={month} className="flex flex-1 flex-col items-center gap-3">
                <div className="flex h-56 w-full items-end justify-center gap-2 rounded-2xl bg-slate-50 p-2">
                  <div className="w-1/3 rounded-full bg-blue-500" style={{ height: `${reported}%` }} />
                  <div className="w-1/3 rounded-full bg-emerald-500" style={{ height: `${resolved}%` }} />
                </div>
                <span className="text-sm font-bold text-slate-500">{month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-3 text-2xl font-black text-slate-950">
            <FaRobot className="text-emerald-600" /> AI Insights
          </h2>
          <div className="mt-6 space-y-4">
            {[
              "Kukatpally has a high mixed-waste spike between 8 AM and 11 AM.",
              "Worker Team C can reduce pending complaints by 17% if reassigned east.",
              "Three medical-waste reports need supervisor review before closure.",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-emerald-50 p-4 text-sm font-semibold leading-6 text-slate-700">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-3xl bg-slate-950 p-5 text-white">
            <p className="text-sm font-bold text-slate-300">System Health</p>
            <p className="mt-2 text-4xl font-black text-emerald-300">99.7%</p>
            <p className="mt-2 text-sm text-slate-400">API, database, jobs, and notification queue normal.</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr_0.8fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-3 text-2xl font-black text-slate-950">
            <FaMapMarkedAlt className="text-emerald-600" /> City Map
          </h2>
          <div className="mt-6 h-80 rounded-3xl bg-[linear-gradient(135deg,#dbeafe_25%,#f0fdf4_25%,#f0fdf4_50%,#dbeafe_50%,#dbeafe_75%,#f0fdf4_75%)] bg-[length:48px_48px] p-5">
            <div className="h-full rounded-2xl border-2 border-dashed border-emerald-500/60 bg-white/60 p-4">
              <div className="h-4 w-4 rounded-full bg-red-500 ring-4 ring-red-100" />
              <div className="ml-auto mt-20 h-4 w-4 rounded-full bg-amber-500 ring-4 ring-amber-100" />
              <div className="mx-auto mt-20 h-4 w-4 rounded-full bg-emerald-600 ring-4 ring-emerald-100" />
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-950">Worker Analytics</h2>
          <div className="mt-6 space-y-5">
            {[
              ["North Zone", "92%", 92],
              ["East Zone", "76%", 76],
              ["West Zone", "84%", 84],
              ["South Zone", "69%", 69],
            ].map(([zone, value, width]) => (
              <div key={zone}>
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-600">{zone}</span>
                  <span>{value}</span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" style={{ width: `${width}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-950">Live Activity Feed</h2>
          <div className="mt-6 space-y-4">
            {["Supervisor reassigned CP-3013", "Worker Team B completed CP-2890", "New user verification pending", "Reward batch approved"].map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                <FaBell className="mt-1 text-emerald-600" />
                <p className="text-sm font-semibold text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {modules.map(([title, text, Icon]) => (
          <button
            type="button"
            key={title}
            onClick={() => setActiveModule(title)}
            className={`rounded-2xl border bg-white p-4 text-left shadow-sm transition hover:border-emerald-200 hover:shadow-md ${
              activeModule === title
                ? "border-emerald-300 ring-4 ring-emerald-50"
                : "border-slate-200"
            }`}
          >
            <Icon className="text-2xl text-emerald-600" />
            <h3 className="mt-3 text-base font-black text-slate-950">{title}</h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{text}</p>
          </button>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Database", "Healthy", FaDatabase],
          ["AI Monitoring", "7 analyses queued", FaRobot],
          ["Maintenance", "No incidents", FaWrench],
        ].map(([label, value, Icon]) => (
          <div key={label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <Icon className="text-2xl text-emerald-600" />
            <p className="mt-4 text-sm font-bold text-slate-500">{label}</p>
            <p className="mt-1 text-2xl font-black text-slate-950">{value}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

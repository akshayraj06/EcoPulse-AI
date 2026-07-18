import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaAward,
  FaCertificate,
  FaCheckCircle,
  FaClock,
  FaImage,
  FaLeaf,
  FaMapMarkedAlt,
  FaMedal,
  FaRoute,
  FaShieldAlt,
  FaTasks,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { getComplaints } from "../../services/complaintService";

const buildMetrics = (items) => {
  const hasLiveData = items.length > 0;
  const pending = items.filter((item) => item.status !== "Completed").length;
  const completed = items.filter((item) => item.status === "Completed").length;
  const displayTotal = hasLiveData ? items.length : 7;
  const displayPending = hasLiveData ? pending : 11;
  const displayCompleted = hasLiveData ? completed : 4;

  return [
    ["Today's Tasks", String(displayTotal), FaTasks, "from-blue-500 to-cyan-500"],
    ["Assigned Complaints", String(displayPending), FaRoute, "from-indigo-500 to-blue-500"],
    ["Pending Complaints", String(displayPending), FaClock, "from-amber-500 to-orange-500"],
    ["Completed Complaints", String(displayCompleted), FaCheckCircle, "from-emerald-500 to-green-600"],
    ["Handled This Month", String(hasLiveData ? completed : 86), FaShieldAlt, "from-slate-700 to-slate-950"],
    ["Green Points", String((hasLiveData ? completed : 16) * 120), FaLeaf, "from-lime-500 to-emerald-500"],
  ];
};

const fallbackTasks = [
  { _id: "demo-cp-2011", complaintId: "CP-2011", category: "Mixed Waste", location: "Madhapur", priority: "High", status: "Assigned", description: "Mixed waste cleanup near Madhapur main road." },
  { _id: "demo-cp-2012", complaintId: "CP-2012", category: "Plastic Waste", location: "HITEC City", priority: "Medium", status: "Accepted", description: "Plastic waste pickup near HITEC City walkway." },
  { _id: "demo-cp-2013", complaintId: "CP-2013", category: "Organic Waste", location: "Kukatpally", priority: "Low", status: "Cleaning", description: "Organic waste cleanup near Kukatpally service lane." },
];

const goals = [
  ["Response Time", "21 mins", 72],
  ["Completion Rate", "95%", 95],
  ["Performance Score", "4.8/5", 88],
  ["Current Streak", "9 days", 82],
];

const getMapLocation = (route) => route?.location || "Hyderabad Telangana";
const getMapSrc = (route) =>
  `https://www.google.com/maps?q=${encodeURIComponent(getMapLocation(route))}&output=embed`;
const getDirectionsUrl = (route) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(getMapLocation(route))}`;
const isCompletedTask = (task) => task.status === "Completed";

export default function WorkersDashboard() {
  const { user } = useAuth();
  const location = useLocation();
  const [notice, setNotice] = useState("");
  const [loadError, setLoadError] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const firstName = user?.name?.split(" ")[0] || "Worker";
  const portalNotice = location.state?.taskCompleted
    ? `${location.state.complaintId} completed and portal metrics updated.`
    : "";
  const sortedComplaints = [...complaints].sort((a, b) => {
    if (a.status === "Completed" && b.status !== "Completed") return 1;
    if (a.status !== "Completed" && b.status === "Completed") return -1;
    return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt);
  });
  const tasks = sortedComplaints.length ? sortedComplaints.slice(0, 3) : fallbackTasks;
  const activeTaskCount = tasks.filter((task) => !isCompletedTask(task)).length;
  const metrics = buildMetrics(complaints);

  useEffect(() => {
    const loadComplaints = () => {
      getComplaints()
        .then((items) => {
          setComplaints(items);
          setLoadError("");
        })
        .catch((error) => {
          setComplaints([]);
          setLoadError(
            error.response?.data?.message ||
              "Unable to load worker tasks. Please refresh after the server reconnects."
          );
        });
    };

    loadComplaints();

    const handleFocus = () => loadComplaints();
    window.addEventListener("focus", handleFocus);

    return () => window.removeEventListener("focus", handleFocus);
  }, [location.key]);

  return (
    <div className="space-y-7">
      <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-7 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-200">
              Worker Operations Dashboard
            </p>
            <h1 className="mt-5 text-4xl font-black md:text-5xl">
              Welcome, {firstName}. Your routes are ready.
            </h1>
            <p className="mt-4 max-w-2xl leading-7 text-slate-300">
              Prioritize assigned complaints, upload before/after proof, and
              complete AI verification from one focused operations workspace.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {["Worker Rank #4", "Daily Goal 64%", "AI Verified 18"].map((item) => (
                <div key={item} className="rounded-2xl bg-white/10 p-4 font-bold text-slate-100">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500">Nearest Complaint</p>
                <h2 className="mt-2 text-3xl font-black text-slate-950">CP-2011</h2>
                <p className="mt-1 text-sm font-semibold text-slate-500">
                  Madhapur, 2.1 km away
                </p>
              </div>
              <FaMapMarkedAlt className="text-4xl text-emerald-600" />
            </div>
            <div className="mt-6 h-48 rounded-3xl bg-[linear-gradient(135deg,#dbeafe_25%,#ecfdf5_25%,#ecfdf5_50%,#dbeafe_50%,#dbeafe_75%,#ecfdf5_75%)] bg-[length:42px_42px] p-4">
              <div className="h-full rounded-2xl border-2 border-dashed border-emerald-500/60 bg-white/60 p-4">
                <div className="h-3 w-3 rounded-full bg-red-500 ring-4 ring-red-100" />
                <div className="ml-auto mt-16 h-3 w-3 rounded-full bg-emerald-600 ring-4 ring-emerald-100" />
                <div className="mx-auto mt-10 h-3 w-3 rounded-full bg-amber-500 ring-4 ring-amber-100" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {metrics.map(([label, value, Icon, tone]) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className={`inline-flex rounded-2xl bg-gradient-to-br ${tone} p-3 text-white`}>
              <Icon />
            </div>
            <p className="mt-4 text-sm font-bold text-slate-500">{label}</p>
            <p className="mt-1 text-3xl font-black text-slate-950">{value}</p>
          </motion.div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black text-slate-950">Assigned Task Timeline</h2>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                Open each task to clean, upload proof photos, and submit AI verification.
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700">
              {activeTaskCount} active tasks
            </span>
          </div>
          <div className="mt-6 space-y-4">
            {loadError && (
              <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-bold leading-6 text-red-700">
                {loadError}
              </div>
            )}
            {tasks.map((task, index) => {
              const completed = isCompletedTask(task);

              return (
              <div
                key={task._id || task.complaintId}
                className={`grid gap-4 rounded-3xl border p-4 transition md:grid-cols-[96px_1fr_auto] ${
                  completed
                    ? "border-emerald-200 bg-emerald-50/70"
                    : "border-slate-100 bg-white hover:border-emerald-200 hover:bg-emerald-50/30"
                }`}
              >
                <div
                  className={`relative grid h-24 place-items-center rounded-2xl ${
                    completed ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {task.image ? (
                    <img
                      src={task.image}
                      alt={task.category}
                      loading="lazy"
                      className="h-full w-full rounded-2xl object-cover"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='240' viewBox='0 0 320 240'%3E%3Crect width='320' height='240' fill='%23f8fafc'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18' fill='%23738e9c'%3EImage not available%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  ) : (
                    <FaImage className="text-3xl" />
                  )}
                  {completed && (
                    <span className="absolute -right-2 -top-2 grid h-9 w-9 place-items-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-100">
                      <FaCheckCircle />
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-black text-slate-950">{task.complaintId}</h3>
                    <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">{task.priority}</span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                        completed
                          ? "bg-emerald-600 text-white"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {completed && <FaCheckCircle />}
                      {task.status}
                    </span>
                  </div>
                  <p className="mt-2 font-semibold text-slate-700">{task.category}</p>
                  <p className="mt-1 text-sm text-slate-500">{task.location} | {(index + 2.1).toFixed(1)} km</p>
                  {completed && (
                    <p className="mt-2 inline-flex items-center gap-2 text-sm font-black text-emerald-700">
                      <FaCheckCircle />
                      AI verified and completed
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 self-center md:justify-end">
                  {!completed && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRoute(task);
                        setNotice(`Route map opened for ${task.complaintId} in ${task.location}.`);
                      }}
                      className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700"
                    >
                      Navigate
                    </button>
                  )}
                  <Link
                    to={`/worker/details/${task._id || task.complaintId}`}
                    state={{ task }}
                    className={`rounded-2xl px-4 py-2 text-center text-sm font-black transition ${
                      completed
                        ? "bg-white text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-50"
                        : "bg-emerald-600 text-white hover:bg-emerald-700"
                    }`}
                  >
                    {completed ? "View Task" : "Open Task"}
                  </Link>
                </div>
              </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">Worker Performance Charts</h2>
            <div className="mt-6 space-y-5">
              {goals.map(([label, value, width]) => (
                <div key={label}>
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-slate-600">{label}</span>
                    <span className="text-slate-950">{value}</span>
                  </div>
                  <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" style={{ width: `${width}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-black text-slate-950">Google Route Map</h2>
              <a
                href={getDirectionsUrl(selectedRoute)}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-black text-white transition hover:bg-emerald-700"
              >
                Open Directions
              </a>
            </div>
            {(notice || portalNotice) && (
              <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">
                {notice || portalNotice}
              </div>
            )}
            <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
              <iframe
                title="Google Maps route to complaint"
                src={getMapSrc(selectedRoute)}
                className="h-80 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="mt-5 rounded-2xl bg-slate-50 p-4">
              <p className="font-black text-slate-900">
                {selectedRoute?.complaintId || "Select a complaint route"}
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-500">
                Destination: {selectedRoute?.location || "Click Navigate on an assigned task."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Rewards", "Reusable safety kit unlocked", FaAward],
          ["Badges", "Rapid Responder badge active", FaMedal],
          ["Certificates", "July Clean Worker certificate", FaCertificate],
        ].map(([label, text, Icon]) => (
          <div key={label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <Icon className="text-2xl text-emerald-600" />
            <h3 className="mt-4 text-xl font-black text-slate-950">{label}</h3>
            <p className="mt-2 text-sm font-semibold text-slate-500">{text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

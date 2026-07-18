import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  FaBell,
  FaChartArea,
  FaCheckCircle,
  FaClock,
  FaExchangeAlt,
  FaExclamationTriangle,
  FaFire,
  FaListUl,
  FaMapMarkedAlt,
  FaRoute,
  FaSearchLocation,
  FaShieldAlt,
  FaSignOutAlt,
  FaTimes,
  FaUserCheck,
  FaUsers,
} from "react-icons/fa";
import EcoPulseLogo from "../../components/brand/EcoPulseLogo";
import { getComplaints } from "../../services/complaintService";

const fallbackComplaints = [
  {
    complaintId: "CP-3011",
    location: "Madhapur",
    assignedWorker: { name: "Raj" },
    status: "No response",
    priority: "High",
    zone: "North Block",
  },
  {
    complaintId: "CP-3012",
    location: "Kavuri Hills",
    assignedWorker: { name: "Ramesh" },
    status: "Worker delayed",
    priority: "Medium",
    zone: "East Block",
  },
  {
    complaintId: "CP-3013",
    location: "Kukatpally",
    assignedWorker: { name: "Suresh" },
    status: "Needs reassign",
    priority: "High",
    zone: "West Block",
  },
];

const workers = [
  { name: "Raj", completed: 12, rating: 4.6, score: 86, zone: "North", response: "18m" },
  { name: "Ramesh", completed: 10, rating: 4.2, score: 74, zone: "East", response: "24m" },
  { name: "Suresh", completed: 9, rating: 4.0, score: 68, zone: "West", response: "29m" },
  { name: "Anjali", completed: 15, rating: 4.8, score: 92, zone: "South", response: "14m" },
];

const navItems = [
  ["Overview", FaChartArea, "overview"],
  ["Reassign", FaExchangeAlt, "reassign"],
  ["Analytics", FaListUl, "analytics"],
  ["Heatmap", FaFire, "heatmap"],
  ["Escalations", FaExclamationTriangle, "escalations"],
  ["Routes", FaRoute, "routes"],
  ["Live Feed", FaBell, "live-feed"],
];

const priorityStyles = {
  High: "bg-red-50 text-red-700 ring-red-100",
  Medium: "bg-amber-50 text-amber-700 ring-amber-100",
  Low: "bg-emerald-50 text-emerald-700 ring-emerald-100",
};

const getHeatTone = (index, reassignCount) => {
  if (reassignCount > 0 && index % 7 === 0) return "bg-amber-300 shadow-amber-200";
  if (index % 7 === 0) return "bg-red-400 shadow-red-200";
  if (index % 5 === 0) return "bg-blue-300 shadow-blue-100";
  if (index % 4 === 0) return "bg-amber-300 shadow-amber-100";
  return "bg-emerald-100 shadow-emerald-50";
};

export default function SupervisorDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [notice, setNotice] = useState("");
  const [activePanel, setActivePanel] = useState("Overview");
  const [liveComplaints, setLiveComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState(workers[3].name);
  const [reassigned, setReassigned] = useState([]);
  const [successCard, setSuccessCard] = useState(null);

  const complaints = liveComplaints.length ? liveComplaints.slice(0, 5) : fallbackComplaints;
  const pendingCount = complaints.filter((item) => item.status !== "Completed").length;
  const highPriorityCount = complaints.filter((item) => item.priority === "High").length;
  const escalatedComplaints = complaints.filter(
    (item) => item.status === "Escalated" || item.escalated,
  );
  const reassignCount = reassigned.length;
  const areaScore = Math.max(72, 84 - highPriorityCount * 2 + reassignCount);

  const metrics = useMemo(
    () => [
      ["Pending Complaints", String(pendingCount), FaExclamationTriangle, "text-red-600", "bg-red-50"],
      ["Today's Complaints", String(complaints.length), FaClock, "text-blue-600", "bg-blue-50"],
      ["Active Workers", String(workers.length), FaUserCheck, "text-emerald-600", "bg-emerald-50"],
      ["Area Score", `${areaScore}%`, FaShieldAlt, "text-violet-600", "bg-violet-50"],
    ],
    [areaScore, complaints.length, pendingCount],
  );

  const escalationQueue = complaints
    .filter((item) => item.priority === "High" || item.status === "No response" || item.status === "Escalated" || item.escalated)
    .map((item, index) => ({
      id: item.complaintId,
      area: item.location,
      reason: index % 2 === 0 ? "No response from assigned worker" : "High severity cleanup pending",
      age: `${24 + index * 8} mins`,
    }));

  const routeItems = reassigned.length
    ? reassigned
    : [
        { id: "Route-A", worker: "Raj", area: "Madhapur", time: "Planned", status: "Ready" },
        { id: "Route-B", worker: "Anjali", area: "Kavuri Hills", time: "Queued", status: "Optimized" },
      ];

  useEffect(() => {
    getComplaints()
      .then(setLiveComplaints)
      .catch(() => setLiveComplaints([]));
  }, []);

  const jumpToPanel = (label, sectionId) => {
    setActivePanel(label);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openReassign = (complaint) => {
    setSelectedComplaint(complaint);
    setSelectedWorker(workers[3].name);
    jumpToPanel("Reassign", "reassign");
    setNotice(`${complaint.complaintId} selected for reassignment.`);
  };

  const confirmReassign = () => {
    if (!selectedComplaint) {
      setNotice("Select a complaint before reassignment.");
      return;
    }

    const updated = {
      ...selectedComplaint,
      assignedWorker: { name: selectedWorker },
      status: "Reassigned",
    };

    const successDetails = {
      id: selectedComplaint.complaintId,
      worker: selectedWorker,
      area: selectedComplaint.location,
      previousWorker: selectedComplaint.assignedWorker?.name || "Worker Team B",
      route: `${selectedComplaint.location} cleanup route`,
      time: "Just now",
      status: "Optimized",
    };

    setLiveComplaints((current) =>
      current.map((item) => (item.complaintId === selectedComplaint.complaintId ? updated : item)),
    );
    setReassigned((current) => [successDetails, ...current]);
    setSelectedComplaint(updated);
    setSuccessCard(successDetails);
    setNotice("Reassigned successfully. Analytics, heatmap, escalation queue, and routes have been updated.");
  };

  return (
    <div className="min-h-screen bg-slate-100/70">
      <div className="grid gap-5 xl:grid-cols-[268px_1fr]">
        <aside className="overflow-hidden rounded-[1.5rem] border border-slate-800 bg-slate-950 text-white shadow-xl xl:sticky xl:top-4 xl:h-[calc(100vh-2rem)]">
          <div className="border-b border-white/10 p-5">
            <EcoPulseLogo inverted />
            <div className="mt-5 rounded-2xl bg-white/10 p-4">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-200">
                Supervisor Dashboard
              </p>
              <p className="mt-2 text-lg font-black">Madhapur Zone</p>
              <p className="mt-1 text-xs font-semibold text-slate-400">Live field operations</p>
            </div>
          </div>

          <nav className="p-3">
            {navItems.map(([label, Icon, sectionId]) => (
              <button
                key={label}
                type="button"
                onClick={() => jumpToPanel(label, sectionId)}
                className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold transition ${
                  activePanel === label
                    ? "bg-white text-slate-950 shadow-lg"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span
                  className={`grid h-8 w-8 place-items-center rounded-lg ${
                    activePanel === label ? "bg-emerald-100 text-emerald-700" : "bg-white/10"
                  }`}
                >
                  <Icon />
                </span>
                {label}
              </button>
            ))}
          </nav>

          <div className="m-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
              Reassigned Today
            </p>
            <div className="mt-3 flex items-end justify-between">
              <p className="text-4xl font-black text-emerald-200">{reassignCount}</p>
              <p className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-black text-emerald-100">
                {areaScore}% Area Score
              </p>
            </div>
          </div>
          <div className="m-4 rounded-2xl bg-slate-900 p-4">
            <button
              type="button"
              onClick={() => {
                logout();
                navigate("/login", { replace: true });
              }}
              className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-red-600 px-4 py-3 text-sm font-black text-white transition hover:bg-red-700"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </aside>

        <main className="space-y-5">
          {successCard && (
            <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 px-4 py-8 backdrop-blur-sm">
              <div className="w-full max-w-xl overflow-hidden rounded-[1.5rem] border border-emerald-100 bg-white shadow-2xl">
                <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-slate-950 px-6 py-8 text-white">
                  <button
                    type="button"
                    onClick={() => setSuccessCard(null)}
                    className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
                    aria-label="Close reassignment success"
                  >
                    <FaTimes />
                  </button>
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-white text-4xl text-emerald-600 shadow-xl shadow-emerald-950/20">
                    <FaCheckCircle />
                  </div>
                  <p className="mt-5 text-sm font-black uppercase tracking-[0.24em] text-emerald-100">
                    Reassignment Confirmed
                  </p>
                  <h2 className="mt-2 text-3xl font-black">Reassigned Successfully</h2>
                  <p className="mt-3 max-w-md text-sm font-semibold leading-6 text-emerald-50">
                    Complaint {successCard.id} has moved to {successCard.worker}. Route, heatmap,
                    analytics, and escalation status are refreshed.
                  </p>
                </div>

                <div className="space-y-4 p-6">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-emerald-50 p-4">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
                        New Worker
                      </p>
                      <p className="mt-2 text-xl font-black text-slate-950">{successCard.worker}</p>
                      <p className="mt-1 text-sm font-semibold text-slate-500">
                        From {successCard.previousWorker}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                        Assigned Area
                      </p>
                      <p className="mt-2 text-xl font-black text-slate-950">{successCard.area}</p>
                      <p className="mt-1 text-sm font-semibold text-slate-500">{successCard.time}</p>
                    </div>
                  </div>

                  {["Worker assignment updated", "Escalation queue refreshed", "Heatmap pressure recalculated", "Route plan regenerated"].map(
                    (item) => (
                      <div key={item} className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
                        <FaCheckCircle className="text-emerald-600" />
                        <p className="text-sm font-bold text-slate-700">{item}</p>
                      </div>
                    ),
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setSuccessCard(null);
                      jumpToPanel("Routes", "routes");
                    }}
                    className="w-full rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
                  >
                    View Updated Route
                  </button>
                </div>
              </div>
            </div>
          )}

          <section
            id="overview"
            className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm"
          >
            <div className="grid gap-6 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
                  <FaShieldAlt /> Control Center
                </p>
                <h1 className="mt-4 text-3xl font-black text-slate-950 md:text-4xl">
                  Supervisor Operations Hub
                </h1>
                <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-slate-500">
                  Monitor pending complaints, reassign delayed tasks, track worker performance,
                  and keep route pressure balanced across Madhapur.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => jumpToPanel("Reassign", "reassign")}
                  className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-black text-white transition hover:bg-slate-800"
                >
                  Review Tasks
                </button>
                <button
                  type="button"
                  onClick={() => jumpToPanel("Heatmap", "heatmap")}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-black text-slate-700 transition hover:bg-slate-50"
                >
                  View Heatmap
                </button>
              </div>
            </div>

            <div className="grid border-t border-slate-100 sm:grid-cols-2 xl:grid-cols-4">
              {metrics.map(([label, value, Icon, color, bg]) => (
                <div key={label} className="border-b border-r border-slate-100 p-5 xl:border-b-0">
                  <div className={`inline-grid h-11 w-11 place-items-center rounded-xl ${bg} ${color}`}>
                    <Icon />
                  </div>
                  <p className="mt-4 text-sm font-bold text-slate-500">{label}</p>
                  <p className="mt-1 text-3xl font-black text-slate-950">{value}</p>
                </div>
              ))}
            </div>
          </section>

          {notice && (
            <div
              className={`rounded-xl border px-4 py-3 text-sm font-bold shadow-sm ${
                notice.toLowerCase().includes("success")
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border-blue-200 bg-blue-50 text-blue-800"
              }`}
            >
              <div className="flex items-center gap-3">
                {notice.toLowerCase().includes("success") ? <FaCheckCircle /> : <FaExchangeAlt />}
                <span>{notice}</span>
              </div>
            </div>
          )}

          <section id="reassign" className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-black text-slate-950">Complaint Reassignment</h2>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    Select a complaint and assign the best available worker.
                  </p>
                </div>
                <FaExchangeAlt className="text-xl text-blue-600" />
              </div>

              <div className="mt-5 space-y-3">
                {complaints.map((item) => (
                  <div
                    key={item.complaintId}
                    className={`grid gap-4 rounded-2xl border p-4 transition md:grid-cols-[1fr_auto] ${
                      selectedComplaint?.complaintId === item.complaintId
                        ? "border-blue-300 bg-blue-50"
                        : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-black text-slate-950">{item.complaintId}</h3>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-black ring-1 ${
                            priorityStyles[item.priority] || priorityStyles.Low
                          }`}
                        >
                          {item.priority}
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                          {item.status}
                        </span>
                      </div>
                      <div className="mt-3 grid gap-2 text-sm font-semibold text-slate-600 sm:grid-cols-3">
                        <span>{item.location}</span>
                        <span>{item.zone || "Central Block"}</span>
                        <span>Worker: {item.assignedWorker?.name || "Worker Team B"}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => openReassign(item)}
                      className="self-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-black text-white transition hover:bg-blue-700"
                    >
                      Reassign
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-2xl font-black text-slate-950">Assignment Panel</h2>
              {selectedComplaint ? (
                <div className="mt-5 space-y-4">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                      Selected Complaint
                    </p>
                    <p className="mt-2 text-2xl font-black text-slate-950">
                      {selectedComplaint.complaintId}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-500">
                      {selectedComplaint.location} | {selectedComplaint.status}
                    </p>
                  </div>

                  <label className="block">
                    <span className="text-sm font-black text-slate-700">Assign to worker</span>
                    <select
                      value={selectedWorker}
                      onChange={(event) => setSelectedWorker(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                    >
                      {workers.map((worker) => (
                        <option key={worker.name} value={worker.name}>
                          {worker.name} | {worker.zone} Zone | Score {worker.score}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-emerald-50 p-4">
                      <p className="text-xs font-black text-emerald-700">Best score</p>
                      <p className="mt-1 text-xl font-black text-slate-950">Anjali 92</p>
                    </div>
                    <div className="rounded-2xl bg-blue-50 p-4">
                      <p className="text-xs font-black text-blue-700">Route impact</p>
                      <p className="mt-1 text-xl font-black text-slate-950">-11 mins</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={confirmReassign}
                    className="w-full rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-700"
                  >
                    Confirm Reassignment
                  </button>

                  {selectedComplaint.status === "Reassigned" && (
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-600 text-white">
                          <FaCheckCircle />
                        </span>
                        <div>
                          <p className="font-black text-emerald-900">Reassigned Successfully</p>
                          <p className="text-sm font-semibold text-emerald-700">
                            {selectedComplaint.complaintId} is now assigned to {selectedWorker}.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-center">
                  <FaSearchLocation className="mx-auto text-3xl text-blue-500" />
                  <p className="mt-3 text-sm font-bold text-slate-600">
                    Choose a complaint to load worker matching, route impact, and escalation context.
                  </p>
                </div>
              )}
            </div>
          </section>

          <section id="analytics" className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="flex items-center gap-3 text-2xl font-black text-slate-950">
                <FaChartArea className="text-blue-600" /> Analytics
              </h2>
              <div className="mt-5 space-y-5">
                {[
                  ["Pending pressure", `${pendingCount} active cases`, Math.min(95, pendingCount * 18), "bg-red-500"],
                  ["Escalation risk", `${escalationQueue.length} cases`, Math.min(95, escalationQueue.length * 24), "bg-amber-500"],
                  ["Route balance", reassignCount ? "Improving" : "Needs attention", reassignCount ? 82 : 58, "bg-blue-500"],
                  ["Worker capacity", "74% available", 74, "bg-emerald-500"],
                ].map(([label, value, width, color]) => (
                  <div key={label}>
                    <div className="flex justify-between gap-3 text-sm font-bold">
                      <span className="text-slate-600">{label}</span>
                      <span className="text-slate-950">{value}</span>
                    </div>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                      <div className={`h-full rounded-full ${color}`} style={{ width: `${width}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              id="heatmap"
              className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="flex items-center gap-3 text-2xl font-black text-slate-950">
                  <FaFire className="text-red-500" /> Dynamic Heatmap
                </h2>
                <div className="flex gap-2 text-xs font-black">
                  <span className="rounded-full bg-red-50 px-3 py-1 text-red-700">Critical</span>
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700">Busy</span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">Stable</span>
                </div>
              </div>
              <div className="mt-5 grid h-72 grid-cols-5 gap-2 rounded-2xl bg-slate-50 p-3">
                {Array.from({ length: 25 }).map((_, index) => (
                  <div key={index} className={`rounded-xl shadow-sm ${getHeatTone(index, reassignCount)}`} />
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-5 xl:grid-cols-3">
            <div
              id="escalations"
              className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h2 className="flex items-center gap-3 text-2xl font-black text-slate-950">
                <FaExclamationTriangle className="text-red-500" /> Escalations
              </h2>
              <div className="mt-5 space-y-3">
                {escalatedComplaints.length > 0 ? (
                  escalatedComplaints.map((item) => (
                    <div key={item.complaintId} className="rounded-2xl border border-red-100 bg-red-50 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-black text-red-700">{item.complaintId}</p>
                        <p className="text-xs font-black text-red-500">
                          {item.ignoreCount ? `${item.ignoreCount} ignores` : "Escalated"}
                        </p>
                      </div>
                      <p className="mt-1 text-sm font-semibold text-slate-600">{item.location}</p>
                      <p className="mt-2 text-xs font-bold text-red-700">
                        {item.escalationReason || "Repeated ignore by worker"}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm font-semibold text-slate-500">
                    No escalated complaints at the moment.
                  </div>
                )}
                {escalationQueue.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-red-100 bg-red-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-black text-red-700">{item.id}</p>
                      <p className="text-xs font-black text-red-500">{item.age}</p>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-slate-600">{item.area}</p>
                    <p className="mt-2 text-xs font-bold text-red-700">{item.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            <div id="routes" className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="flex items-center gap-3 text-2xl font-black text-slate-950">
                <FaRoute className="text-emerald-600" /> Routes
              </h2>
              <div className="mt-5 space-y-3">
                {routeItems.map((item) => (
                  <div key={`${item.id}-${item.worker}`} className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-black text-emerald-700">{item.id}</p>
                      <span className="rounded-full bg-white px-2 py-1 text-xs font-black text-emerald-700">
                        {item.status || "Ready"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-slate-600">
                      {item.worker} routed to {item.area}
                    </p>
                    <p className="mt-1 text-xs font-bold text-emerald-600">{item.time}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              id="live-feed"
              className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h2 className="flex items-center gap-3 text-2xl font-black text-slate-950">
                <FaBell className="text-blue-600" /> Live Feed
              </h2>
              <div className="mt-5 space-y-3">
                {[
                  reassignCount ? "Reassignment confirmed and route updated" : "Awaiting reassignment action",
                  "Worker availability refreshed",
                  "Area score recalculated",
                  "Heatmap pressure synchronized",
                ].map((item, index) => (
                  <div key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-500" />
                    <div>
                      <p className="text-sm font-bold text-slate-700">{item}</p>
                      <p className="mt-1 text-xs font-semibold text-slate-400">{index + 2} mins ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-5 xl:grid-cols-[1fr_0.85fr]">
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="flex items-center gap-3 text-2xl font-black text-slate-950">
                <FaUsers className="text-emerald-600" /> Worker Performance
              </h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {workers.map((worker) => (
                  <div key={worker.name} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-full bg-emerald-100 font-black text-emerald-700">
                        {worker.name[0]}
                      </div>
                      <div>
                        <p className="font-black text-slate-950">{worker.name}</p>
                        <p className="text-xs font-semibold text-slate-500">
                          {worker.zone} Zone | Avg {worker.response}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between text-xs font-black text-slate-500">
                      <span>{worker.completed} completed</span>
                      <span>Rating {worker.rating}</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
                      <div className="h-full rounded-full bg-emerald-500" style={{ width: `${worker.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="flex items-center gap-3 text-2xl font-black text-slate-950">
                <FaMapMarkedAlt className="text-blue-600" /> Area Map
              </h2>
              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-100">
                <iframe
                  title="Madhapur supervisor map"
                  src="https://www.google.com/maps?q=Madhapur%20Hyderabad&output=embed"
                  className="h-80 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

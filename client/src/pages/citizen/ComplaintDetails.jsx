import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaImage,
  FaMapMarkerAlt,
  FaPhone,
  FaRobot,
  FaUser,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { getComplaint, updateComplaint } from "../../services/complaintService";

const fallbackComplaint = {
  _id: "demo",
  complaintId: "CP-1001",
  category: "Plastic Waste",
  priority: "High",
  status: "Assigned",
  location: "Hyderabad",
  description: "Plastic waste awaiting cleanup.",
  assignedWorker: { name: "Rahul Kumar", phone: "+91 9876543210" },
  aiAnalysis: {
    category: "Plastic Waste",
    confidence: 96,
    severity: "High",
    garbageAmount: "Large",
    recyclingAdvice: "Separate bottles and wrappers before pickup.",
    environmentalImpact: "High risk of drain blockage.",
    recommendation: "Immediate cleaning recommended",
  },
  timeline: [
    { label: "Submitted", detail: "Complaint submitted.", status: "complete" },
    { label: "AI Verification", detail: "Waste classified by AI.", status: "complete" },
    { label: "Worker Assignment", detail: "Worker assigned.", status: "active" },
    { label: "Cleaning", detail: "Waiting for completion.", status: "pending" },
  ],
  createdAt: new Date().toISOString(),
};

export default function ComplaintDetails() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(fallbackComplaint);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState("");
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    getComplaint(id)
      .then(setComplaint)
      .catch((err) =>
        setError(err.response?.data?.message || "Unable to load complaint")
      )
      .finally(() => setLoading(false));
  }, [id]);

  const markResolved = async () => {
    if (!complaint?._id || complaint._id === "demo") {
      setResolved(true);
      return;
    }

    const updated = await updateComplaint(complaint._id, { status: "Completed" });
    setComplaint(updated);
    setResolved(true);
  };

  if (loading) {
    return <div className="rounded-2xl bg-white p-6 font-bold">Loading complaint...</div>;
  }

  return (
    <div className="space-y-7">
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 font-bold text-red-700">
          {error}
        </div>
      )}

      <section className="flex flex-wrap items-center justify-between gap-5 rounded-[2rem] bg-slate-950 p-8 text-white shadow-xl">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-200">
            Complaint Details
          </p>
          <h1 className="mt-4 text-4xl font-black">{complaint.complaintId}</h1>
          <p className="mt-2 text-slate-300">{complaint.description}</p>
        </div>
        <span className="rounded-full bg-emerald-400/15 px-5 py-2 font-black text-emerald-200">
          {complaint.status}
        </span>
      </section>

      <div className="grid gap-7 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-7">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            {complaint.image ? (
              <img
                src={complaint.image}
                alt={complaint.category}
                loading="lazy"
                className="h-80 w-full rounded-3xl object-cover"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='360' viewBox='0 0 600 360'%3E%3Crect width='600' height='360' fill='%23f8fafc'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='26' fill='%23738e9c'%3EImage not available%3C/text%3E%3C/svg%3E";
                }}
              />
            ) : (
              <div className="grid h-80 place-items-center rounded-3xl bg-slate-100 text-slate-400">
                <FaImage className="text-6xl" />
              </div>
            )}
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">Complaint Information</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <p><strong>Category:</strong> {complaint.category}</p>
              <p><strong>Priority:</strong> {complaint.priority}</p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt /> {complaint.location}
              </p>
              <p className="flex items-center gap-2">
                <FaCalendarAlt /> {new Date(complaint.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-7">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 flex items-center gap-3 text-2xl font-black text-slate-950">
              <FaRobot className="text-emerald-600" />
              AI Analysis
            </h2>
            <div className="space-y-3 rounded-3xl bg-emerald-50 p-5 font-semibold text-slate-700">
              <p>Category: {complaint.aiAnalysis?.category}</p>
              <p>Confidence: {complaint.aiAnalysis?.confidence}%</p>
              <p>Severity: {complaint.aiAnalysis?.severity}</p>
              <p>Garbage Amount: {complaint.aiAnalysis?.garbageAmount}</p>
              <p>Advice: {complaint.aiAnalysis?.recyclingAdvice}</p>
              <p className="font-black text-emerald-700">
                {complaint.aiAnalysis?.recommendation}
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">Progress Timeline</h2>
            <div className="mt-6 space-y-4">
              {complaint.timeline?.map((item) => (
                <div key={item.label} className="flex gap-3">
                  <FaCheckCircle
                    className={
                      item.status === "complete"
                        ? "mt-1 text-emerald-600"
                        : item.status === "active"
                          ? "mt-1 text-amber-500"
                          : "mt-1 text-slate-300"
                    }
                  />
                  <div>
                    <p className="font-black text-slate-950">{item.label}</p>
                    <p className="text-sm text-slate-500">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">Assigned Worker</h2>
            <p className="mt-5 flex items-center gap-3">
              <FaUser /> {complaint.assignedWorker?.name}
            </p>
            <p className="mt-3 flex items-center gap-3">
              <FaPhone /> {complaint.assignedWorker?.phone}
            </p>
          </div>

          {resolved && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">
              Complaint marked as resolved. Thank you for confirming the cleanup.
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={markResolved}
              className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-700"
            >
              Mark as Resolved
            </button>
            <Link
              to="/history"
              className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-black text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700"
            >
              Back to History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

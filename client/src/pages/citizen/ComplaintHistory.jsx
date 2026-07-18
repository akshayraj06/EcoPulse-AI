import { useEffect, useState } from "react";
import { FaClock, FaEye, FaImage, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getComplaints } from "../../services/complaintService";

const statusClass = {
  Completed: "bg-green-100 text-green-700",
  Submitted: "bg-yellow-100 text-yellow-700",
  Assigned: "bg-blue-100 text-blue-700",
  Accepted: "bg-indigo-100 text-indigo-700",
  Cleaning: "bg-purple-100 text-purple-700",
  Verification: "bg-cyan-100 text-cyan-700",
};

export default function ComplaintHistory() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getComplaints()
      .then(setComplaints)
      .catch((err) =>
        setError(err.response?.data?.message || "Unable to load complaints")
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-7">
      <section className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-xl">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-200">
          Complaint Tracking
        </p>
        <h1 className="mt-4 text-4xl font-black">Complaint History</h1>
        <p className="mt-3 text-slate-300">
          Track AI verification, worker assignment, cleaning, and completion.
        </p>
      </section>

      {loading && (
        <div className="rounded-2xl bg-white p-6 font-bold text-slate-600 shadow-sm">
          Loading complaints...
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 font-bold text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && complaints.length === 0 && (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
          <FaImage className="mx-auto text-5xl text-slate-300" />
          <h2 className="mt-5 text-2xl font-black text-slate-950">
            No complaints yet
          </h2>
          <p className="mt-2 text-slate-500">
            Submit your first cleanliness report to start tracking impact.
          </p>
          <Link
            to="/report"
            className="mt-6 inline-flex rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-black text-white"
          >
            Report Complaint
          </Link>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {complaints.map((item) => (
          <article
            key={item._id}
            className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.category}
                loading="lazy"
                className="h-52 w-full object-cover"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300' viewBox='0 0 500 300'%3E%3Crect width='500' height='300' fill='%23f8fafc'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%23738e9c'%3EImage not available%3C/text%3E%3C/svg%3E";
                }}
              />
            ) : (
              <div className="grid h-52 place-items-center bg-slate-100 text-slate-400">
                <FaImage className="text-5xl" />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-black text-slate-950">
                  {item.complaintId}
                </h2>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    statusClass[item.status] || "bg-slate-100 text-slate-600"
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <p className="mt-4 font-semibold text-slate-700">{item.category}</p>
              <p className="mt-2 text-sm font-bold text-red-500">
                Priority: {item.priority}
              </p>
              <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                <FaMapMarkerAlt />
                {item.location}
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <FaClock />
                {new Date(item.createdAt).toLocaleDateString()}
              </div>
              <Link
                to={`/details/${item._id}`}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-600 py-3 text-sm font-black text-white transition hover:bg-emerald-700"
              >
                <FaEye />
                View Details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

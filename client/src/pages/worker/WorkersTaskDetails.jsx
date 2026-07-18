import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaBell,
  FaCheckCircle,
  FaClock,
  FaImage,
  FaLock,
  FaMapMarkerAlt,
  FaRobot,
  FaUpload,
} from "react-icons/fa";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getComplaint, getComplaints, updateComplaint } from "../../services/complaintService";

const fallbackTask = {
  _id: "demo",
  complaintId: "CP-1001",
  category: "Plastic Waste",
  priority: "High",
  status: "Assigned",
  location: "Hyderabad",
  description: "Plastic waste cleanup task.",
  image: "",
  beforeImage: "",
  afterImage: "",
  cleaningVerification: null,
};

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export default function WorkersTaskDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const selectedTask = location.state?.task;
  const [task, setTask] = useState(fallbackTask);
  const [beforeImage, setBeforeImage] = useState("");
  const [afterImage, setAfterImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const loadTask = async () => {
      if (selectedTask) {
        setTask({
          ...fallbackTask,
          ...selectedTask,
        });
        setBeforeImage(selectedTask.beforeImage || "");
        setAfterImage(selectedTask.afterImage || "");
        setLoading(false);
        return;
      }

      try {
        const complaint = id && !id.startsWith("demo-")
          ? await getComplaint(id)
          : (await getComplaints())[0] || fallbackTask;
        setTask(complaint);
        setBeforeImage(complaint.beforeImage || "");
        setAfterImage(complaint.afterImage || "");
      } catch {
        setTask(fallbackTask);
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [id, selectedTask]);

  const handleProofImage = async (event, type) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const dataUrl = await readFileAsDataUrl(file);
    if (type === "before") {
      setBeforeImage(dataUrl);
      setNotice("Before image added. Now upload the after (post-clean) image to run AI verification.");
      return;
    }

    setAfterImage(dataUrl);
    setNotice("After image added. Submit cleanup for AI verification.");
  };

  const ignoreTask = async () => {
    const nextCount = (task.ignoreCount || 0) + 1;

    if (task._id === "demo" || String(task._id).startsWith("demo-")) {
      setTask((current) => ({
        ...current,
        ignoreCount: nextCount,
        status: nextCount >= 3 ? "Escalated" : "No response",
      }));
      setNotice(
        nextCount >= 3
          ? "Task ignored repeatedly. This would now be escalated to supervisors."
          : `Task ignored. Reminder ${nextCount} sent to the worker.`
      );
      return;
    }

    setSaving(true);
    try {
      const updated = await updateComplaint(task._id, { ignore: true });
      setTask(updated);
      setNotice(
        updated.escalated
          ? "Task ignored repeatedly and escalated to supervisors."
          : `Task ignored. Reminder ${updated.ignoreCount || 1} sent to the worker.`
      );
    } catch (err) {
      setNotice(err.response?.data?.message || "Unable to ignore task right now.");
    } finally {
      setSaving(false);
    }
  };

  const verifyWithAI = async () => {
    if (!beforeImage || !afterImage) {
      setNotice("Upload both before and after photos before AI verification.");
      return;
    }

    if (task._id === "demo" || String(task._id).startsWith("demo-")) {
      setTask((current) => ({
        ...current,
        status: "Completed",
        beforeImage,
        afterImage,
        cleaningVerification: {
          cleanlinessScore: 91,
          confidence: 93,
          result: "Clean",
          nextAction: "Auto-complete complaint",
        },
      }));
      setNotice("Cleanup submitted and AI verified with 93% confidence. Task marked completed.");
      return;
    }

    setSaving(true);
    try {
      const updated = await updateComplaint(task._id, {
        beforeImage,
        afterImage,
        status: "Verification",
      });
      setTask(updated);
      if (updated.status === "Completed") {
        setNotice(
          `${updated.complaintId} completed. Worker portal metrics are ready to update.`
        );
      } else {
        setNotice(
          `${updated.cleaningVerification?.result || "AI verification complete"} with ${
            updated.cleaningVerification?.confidence || 0
          }% confidence.`
        );
      }
    } catch (err) {
      setNotice(err.response?.data?.message || "Unable to verify images right now.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="rounded-2xl bg-white p-6 font-bold">Loading task...</div>;
  }

  return (
    <div className="space-y-7">
      <Link
        to="/worker"
        className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-emerald-700 shadow hover:bg-emerald-50"
      >
        <FaArrowLeft />
        Back to Tasks
      </Link>

      <section className="flex flex-wrap items-center justify-between gap-5 rounded-[2rem] bg-slate-950 p-8 text-white shadow-xl">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-200">
            Complaint Task
          </p>
          <h1 className="mt-4 text-4xl font-black">{task.complaintId}</h1>
          <p className="mt-2 text-slate-300">{task.description}</p>
        </div>
        <span className="rounded-full bg-emerald-400/15 px-5 py-2 font-black text-emerald-200">
          {task.status}
        </span>
      </section>

      <section className="grid gap-7 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-7">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-black text-slate-950">Citizen Photo</h2>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                <FaLock /> Read-only
              </span>
            </div>
            <div className="mt-5 overflow-hidden rounded-3xl border border-slate-100 bg-slate-50">
              {task.image ? (
                <img
                  src={task.image}
                  alt={task.category}
                  loading="lazy"
                  className="h-80 w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='360' viewBox='0 0 600 360'%3E%3Crect width='600' height='360' fill='%23f8fafc'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%23738e9c'%3EImage not available%3C/text%3E%3C/svg%3E";
                  }}
                />
              ) : (
                <div className="grid h-80 place-items-center text-slate-400">
                  <FaImage className="text-6xl" />
                </div>
              )}
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-500">
              This image was uploaded by the citizen and is never changed by worker proof uploads.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">Assignment</h2>
            <div className="mt-5 space-y-4 text-slate-700">
              <p className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-emerald-600" />
                {task.location}
              </p>
              <p className="flex items-center gap-3">
                <FaClock className="text-emerald-600" />
                Priority: {task.priority}
              </p>
              <p className="flex items-center gap-3">
                <FaCheckCircle className="text-emerald-600" />
                Category: {task.category}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-7">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">Clean & Submit Proof</h2>
            <p className="mt-2 text-sm font-semibold text-slate-500">
              Clean the location, upload worker proof photos, then submit cleanup for AI verification.
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {[
                ["before", "Before Image (pre-clean)", beforeImage],
                ["after", "After Image (post-clean)", afterImage],
              ].map(([type, label, image]) => (
                <label
                  key={type}
                  className="cursor-pointer rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-4 text-center transition hover:border-emerald-300"
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => handleProofImage(event, type)}
                  />
                  {image ? (
                    <img src={image} alt={label} className="h-52 w-full rounded-2xl object-cover" />
                  ) : (
                    <div className="grid h-52 place-items-center text-slate-500">
                      <span>
                        <FaUpload className="mx-auto mb-3 text-3xl text-emerald-600" />
                        <span className="font-black">{label}</span>
                      </span>
                    </div>
                  )}
                  <p className="mt-3 text-xs text-slate-500">
                    {type === "before" ? "Photo taken BEFORE cleaning (pre-clean)" : "Photo taken AFTER cleaning (post-clean)"}
                  </p>
                </label>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={verifyWithAI}
                disabled={saving}
                className="inline-flex items-center gap-3 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <FaRobot />
                {saving ? "Submitting..." : "Submit Cleanup for AI Verification"}
              </button>
              <button
                type="button"
                onClick={ignoreTask}
                disabled={saving}
                className="inline-flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-black text-red-700 transition hover:border-red-300 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <FaBell />
                Ignore Task
              </button>
            </div>

            {notice && (
              <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">
                {notice}
              </div>
            )}

            {task.status === "Completed" && (
              <button
                type="button"
                onClick={() =>
                  navigate("/worker", {
                    replace: true,
                    state: {
                      taskCompleted: true,
                      complaintId: task.complaintId,
                    },
                  })
                }
                className="mt-4 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
              >
                Back to Updated Worker Portal
              </button>
            )}
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">AI Verification Result</h2>
            {task.cleaningVerification ? (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-emerald-50 p-4">
                  <p className="text-sm font-bold text-slate-500">Cleanliness Score</p>
                  <p className="mt-1 text-3xl font-black text-emerald-700">
                    {task.cleaningVerification.cleanlinessScore}/100
                  </p>
                </div>
                <div className="rounded-2xl bg-cyan-50 p-4">
                  <p className="text-sm font-bold text-slate-500">Confidence</p>
                  <p className="mt-1 text-3xl font-black text-cyan-700">
                    {task.cleaningVerification.confidence}%
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
                  <p className="font-black text-slate-950">{task.cleaningVerification.result}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    {task.cleaningVerification.nextAction}
                  </p>
                </div>
              </div>
            ) : (
              <p className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-500">
                Waiting for before and after images. AI will compare proof images and mark the task completed when clean.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

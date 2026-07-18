import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCamera,
  FaCheck,
  FaClock,
  FaMapMarkerAlt,
  FaMagic,
  FaPaperPlane,
  FaRobot,
  FaRoute,
  FaSpinner,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { analyzeComplaintImage, createComplaint } from "../../services/complaintService";

const confetti = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${8 + ((index * 17) % 84)}%`,
  delay: index * 0.035,
  color: ["bg-emerald-400", "bg-lime-300", "bg-cyan-400", "bg-amber-300"][index % 4],
}));

export default function ReportIssue() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Plastic Waste");
  const [priority, setPriority] = useState("Medium");
  const [description, setDescription] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analyzed, setAnalyzed] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [analysisError, setAnalysisError] = useState("");
  const [complaintId, setComplaintId] = useState("CP-1024");
  const [complaintRecordId, setComplaintRecordId] = useState("");
  const [assignedArea, setAssignedArea] = useState("Kukatpally Zone");
  const [estimatedResponseTime, setEstimatedResponseTime] = useState("30-45 minutes");

  const handleImage = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
        setFileName(file.name || "");
      };
      reader.readAsDataURL(file);
      setAnalyzed(false);
      setAnalysisResult(null);
      setAnalysisError("");
    }
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocation("Kukatpally, Hyderabad, Telangana");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(
          `${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}`
        );
      },
      () => {
        setLocation("Kukatpally, Hyderabad, Telangana");
      }
    );
  };

  const analyzeImage = async () => {
    if (!preview) {
      setAnalysisError("Upload an image first to analyze it.");
      return;
    }

    setAnalysisError("");
    setAnalyzed(false);
    setAnalyzing(true);
    try {
      const data = await analyzeComplaintImage({
        image: preview,
        filename: fileName,
        location,
        description,
      });

      setAnalysisResult(data);
      setCategory(data.category || category);
      setPriority(data.priority || priority);
      setLocation(data.location || location);
      setDescription((prev) => (prev ? prev : data.description || ""));
      setAnalyzed(true);
    } catch (err) {
      setAnalysisError(err.response?.data?.message || "Image analysis failed. Please try again.");
      setAnalyzed(false);
    } finally {
      setAnalyzing(false);
    }
  };

  const submitComplaint = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const complaint = await createComplaint({
        image: preview,
        location: location || "Kukatpally, Hyderabad, Telangana",
        description,
        category,
        priority,
      });

      setComplaintId(complaint.complaintId);
      setComplaintRecordId(complaint._id);
      setAssignedArea(complaint.assignedArea);
      setEstimatedResponseTime(complaint.estimatedResponseTime);
      setSuccess(true);
      setTimeout(() => navigate(`/details/${complaint._id}`, { replace: true }), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to submit complaint right now");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 p-4 backdrop-blur"
          >
            <div className="absolute inset-0 overflow-hidden">
              {confetti.map((piece) => (
                <motion.span
                  key={piece.id}
                  className={`absolute top-0 h-3 w-2 rounded-full ${piece.color}`}
                  style={{ left: piece.left }}
                  initial={{ y: -40, rotate: 0, opacity: 0 }}
                  animate={{ y: "92vh", rotate: 360, opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 2.4, delay: piece.delay, ease: "easeOut" }}
                />
              ))}
            </div>

            <motion.div
              initial={{ scale: 0.94, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              className="relative w-full max-w-2xl rounded-[2rem] bg-white p-8 text-center shadow-2xl"
            >
              <motion.div
                initial={{ scale: 0.4 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 240, damping: 16 }}
                className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-emerald-500 text-4xl text-white shadow-lg shadow-emerald-200"
              >
                <FaCheck />
              </motion.div>
              <h2 className="mt-6 text-3xl font-black text-slate-950">
                Complaint Submitted Successfully!
              </h2>
              <p className="mt-2 text-slate-600">
                Thank you for helping keep the city clean.
              </p>
              <div className="mt-6 rounded-3xl bg-slate-50 p-5">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">
                  Your complaint has been assigned ID
                </p>
                <p className="mt-2 text-4xl font-black text-emerald-600">{complaintId}</p>
                <div className="mt-5 grid gap-3 text-left sm:grid-cols-3">
                  {[
                    ["Submitted", "Complete", FaCheck],
                    ["AI Verification", "Complete", FaRobot],
                    ["Worker Assignment", "Waiting...", FaClock],
                  ].map(([label, status, Icon]) => (
                    <div key={label} className="rounded-2xl bg-white p-4 shadow-sm">
                      <Icon className="text-emerald-600" />
                      <p className="mt-3 font-black text-slate-900">{label}</p>
                      <p className="mt-1 text-sm font-bold text-slate-500">{status}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 grid gap-3 text-left sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-100 p-4">
                  <p className="text-xs font-bold text-slate-400">Assigned Area</p>
                  <p className="mt-1 font-black text-slate-900">{assignedArea}</p>
                </div>
                <div className="rounded-2xl border border-slate-100 p-4">
                  <p className="text-xs font-bold text-slate-400">Estimated Response</p>
                  <p className="mt-1 font-black text-slate-900">{estimatedResponseTime}</p>
                </div>
                <button
                  onClick={() => navigate(`/details/${complaintRecordId || complaintId}`, { replace: true })}
                  className="rounded-2xl bg-slate-950 px-4 py-3 font-bold text-white"
                >
                  Track Complaint
                </button>
              </div>
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-emerald-100">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3 }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={submitComplaint} className="space-y-7">
        <section className="rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-8 text-white shadow-xl">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-200">
            Report Complaint
          </p>
          <h1 className="mt-4 text-4xl font-black">Capture, verify, assign.</h1>
          <p className="mt-3 max-w-2xl leading-7 text-slate-300">
            Upload a complaint photo, capture GPS, let AI classify the waste,
            and submit it to the worker assignment queue.
          </p>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-3 text-2xl font-black text-slate-950">
              <FaCamera className="text-emerald-600" /> Capture Photo
            </h2>
            <input type="file" accept="image/*" id="upload" className="hidden" onChange={handleImage} />
            <label
              htmlFor="upload"
              className="mt-6 grid h-80 cursor-pointer place-items-center overflow-hidden rounded-3xl border-2 border-dashed border-emerald-300 bg-emerald-50"
            >
              {preview ? (
                <img src={preview} alt="Complaint preview" className="h-full w-full object-cover" />
              ) : (
                <span className="text-center font-bold text-emerald-700">
                  <FaCamera className="mx-auto mb-3 text-5xl" />
                  Click to upload complaint image
                </span>
              )}
            </label>
            <button
              type="button"
              onClick={analyzeImage}
              disabled={analyzing}
              aria-busy={analyzing}
              className="mt-5 flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-950 py-3 font-bold text-white disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {analyzing ? <FaSpinner className="animate-spin" /> : <FaRobot />}
              {analyzing ? "Analyzing..." : "Analyze Image"}
            </button>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-3 text-xl font-black text-slate-950">
                <FaMapMarkerAlt className="text-emerald-600" /> Location
              </h2>
              <button
                type="button"
                onClick={detectLocation}
                className="mt-5 rounded-2xl bg-emerald-600 px-5 py-3 font-bold text-white"
              >
                Use Current Location
              </button>
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Kukatpally, Hyderabad, Telangana"
                className="mt-4 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <label className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <span className="font-black text-slate-950">Waste Category</span>
                <select value={category} onChange={(event) => setCategory(event.target.value)} className="mt-4 w-full rounded-2xl border border-slate-200 px-4 py-3">
                  <option>Plastic Waste</option>
                  <option>Organic Waste</option>
                  <option>Electronic Waste</option>
                  <option>Construction Waste</option>
                  <option>Mixed Waste</option>
                </select>
              </label>

              <label className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <span className="font-black text-slate-950">Priority</span>
                <select value={priority} onChange={(event) => setPriority(event.target.value)} className="mt-4 w-full rounded-2xl border border-slate-200 px-4 py-3">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </label>
            </div>

            <label className="block rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <span className="font-black text-slate-950">Description</span>
              <textarea
                rows="4"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Describe the issue..."
                className="mt-4 w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              />
            </label>
          </div>
        </section>

        <section className="grid min-w-0 gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-3 text-2xl font-black text-slate-950">
              <FaMagic className="text-emerald-600" /> AI Detection Result
            </h2>
            <div className="mt-6 rounded-3xl bg-emerald-50 p-5">
              {!analyzed ? (
                <div className="space-y-3">
                  <p className="font-semibold text-slate-600">
                    AI will analyze the uploaded image for waste type, severity,
                    location, and whether the photo shows a cleaned area.
                  </p>
                  {analysisError && (
                    <p className="text-sm font-bold text-red-600">{analysisError}</p>
                  )}
                </div>
              ) : (
                <div className="space-y-3 font-semibold text-slate-700">
                  <p>
                    Garbage detected: {analysisResult?.cleanDetected ? "No" : "Yes"}
                  </p>
                  <p>Type: {analysisResult?.category || category}</p>
                  <p>Severity: {analysisResult?.priority || priority}</p>
                  <p>Location: {analysisResult?.location || location}</p>
                  <p>Clean detected: {analysisResult?.cleanDetected ? "Yes" : "No"}</p>
                  <p className="font-black text-emerald-700">
                    {analysisResult?.cleanliness === "Clean"
                      ? "Image appears clean"
                      : "Cleanup needed"}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="min-w-0 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="flex min-w-0 flex-wrap items-center gap-3 text-2xl font-black text-slate-950">
              <FaRoute className="text-emerald-600" /> Submit to Queue
            </h2>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-500">
              The complaint will enter AI verification and worker assignment.
            </p>
            {error && (
              <div className="mt-4 w-full max-w-full overflow-hidden rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold leading-6 text-red-700">
                <span className="block min-w-0 whitespace-normal break-words">{error}</span>
              </div>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-emerald-100 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              <FaPaperPlane />
              {submitting ? "Submitting..." : "Submit Complaint"}
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}

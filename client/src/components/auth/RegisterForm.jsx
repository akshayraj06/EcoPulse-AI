import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaCheck, FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";
import RoleSelector from "./RoleSelector";
import useAuth from "../../hooks/useAuth";
import EcoPulseLogo from "../brand/EcoPulseLogo";

const getPasswordStrength = (password) => {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;

  if (score <= 1) return { label: "Weak", width: "25%", color: "bg-red-500" };
  if (score === 2) return { label: "Fair", width: "50%", color: "bg-amber-500" };
  if (score === 3) return { label: "Good", width: "75%", color: "bg-lime-500" };
  return { label: "Strong", width: "100%", color: "bg-emerald-500" };
};

export default function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "citizen",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const strength = getPasswordStrength(formData.password);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await register(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1800);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to register right now");
      setSubmitting(false);
    } finally {
      if (!success) {
        setSubmitting(false);
      }
    }
  };

  return (
    <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55 }}
        className="glass-card relative mx-auto w-full max-w-md overflow-hidden rounded-[2rem] p-8"
      >
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/95 px-8 text-center backdrop-blur"
            >
              <motion.div
                initial={{ scale: 0.5, rotate: -12 }}
                animate={{ scale: 1, rotate: 0 }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-3xl text-white shadow-lg shadow-emerald-200"
              >
                <FaCheck />
              </motion.div>
              <h2 className="mt-6 text-3xl font-black text-slate-950">
                Registration Successful
              </h2>
              <p className="mt-2 font-semibold text-slate-600">
                Welcome to EcoPulse AI. Redirecting to Login...
              </p>
              <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-emerald-100">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.65 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mb-8">
          <EcoPulseLogo />
          <h1 className="mt-8 text-3xl font-black text-slate-950">Create account</h1>
          <p className="mt-2 text-slate-600">Join the EcoPulse AI network.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-bold text-slate-700">Full Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-slate-700">Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-slate-700">Password</span>
            <div className="relative mt-2">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
                required
                className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 pr-12 text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
            />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-emerald-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                <div className={`h-full ${strength.color}`} style={{ width: strength.width }} />
              </div>
              <span className="text-xs font-bold text-slate-500">{strength.label}</span>
            </div>
          </label>

          <RoleSelector value={formData.role} onChange={handleChange} />

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-red-100 bg-red-50 p-3 text-sm font-semibold text-red-700"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-cyan-600 py-3 font-bold text-white shadow-lg shadow-emerald-200 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <FaUserPlus />
            {submitting ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-emerald-700">
            Login
          </Link>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.05 }}
        className="hidden lg:block"
      >
        <EcoPulseLogo />
        <h1 className="mt-8 max-w-xl text-5xl font-black leading-tight text-slate-950">
          Build cleaner neighborhoods with every verified action.
        </h1>
        <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">
          Citizens, workers, and administrators share one intelligent workflow
          for complaints, points, verification, and city insights.
        </p>
      </motion.div>
    </section>
  );
}

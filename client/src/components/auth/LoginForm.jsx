import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheck,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaSignInAlt,
} from "react-icons/fa";
import { getRoleDashboard } from "../../utils/routes";
import useAuth from "../../hooks/useAuth";
import EcoPulseLogo from "../brand/EcoPulseLogo";

export default function LoginForm() {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: true,
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const user = await login(
        {
          email: formData.email,
          password: formData.password,
        },
        formData.remember
      );
      setSuccess(true);
      setTimeout(() => {
        navigate(location.state?.from?.pathname || getRoleDashboard(user.role), {
          replace: true,
        });
      }, 1600);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to login right now");
      setSubmitting(false);
    } finally {
      if (!success) {
        setSubmitting(false);
      }
    }
  };

  return (
    <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="hidden lg:block"
      >
        <EcoPulseLogo />
        <h1 className="mt-8 max-w-xl text-5xl font-black leading-tight text-slate-950">
          Welcome back to the city cleanup command center.
        </h1>
        <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">
          Track complaints, coordinate workers, and keep every cleanliness
          action visible from one premium workspace.
        </p>
        <div className="mt-8 grid max-w-lg grid-cols-3 gap-3">
          {["AI routing", "Live status", "Eco rewards"].map((item) => (
            <div key={item} className="rounded-2xl border border-white/70 bg-white/70 p-4 text-sm font-bold text-slate-700 shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </motion.div>

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
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-3xl text-white shadow-lg shadow-emerald-200"
              >
                <FaCheck />
              </motion.div>
              <h2 className="mt-6 text-3xl font-black text-slate-950">
                Login Successful
              </h2>
              <p className="mt-2 font-semibold text-slate-600">
                Welcome back. Loading dashboard...
              </p>
              <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-emerald-100">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.45 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mb-8">
          <EcoPulseLogo />
          <h1 className="mt-8 text-3xl font-black text-slate-950">Login</h1>
          <p className="mt-2 text-slate-600">Access your EcoPulse AI account.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
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
              <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
                required
                className="w-full rounded-2xl border border-slate-200 bg-white/80 py-3 pl-11 pr-12 text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
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
          </label>

          <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300"
            />
            Remember me
          </label>

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
            <FaSignInAlt />
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          New to EcoPulse AI?{" "}
          <Link to="/register" className="font-semibold text-emerald-700">
            Register
          </Link>
        </p>
      </motion.div>
    </section>
  );
}

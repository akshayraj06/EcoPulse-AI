import { Link, useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaSignOutAlt,
  FaTasks,
  FaUserCircle,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import EcoPulseLogo from "../brand/EcoPulseLogo";

export default function WorkerSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="flex min-h-screen w-72 flex-col bg-slate-950 text-white shadow-xl">
      <div className="border-b border-white/10 p-6">
        <EcoPulseLogo inverted />
        <p className="mt-4 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">
          Worker Portal
        </p>
      </div>

      <nav className="flex-1 px-4 py-6">
        <Link
          to="/worker"
          className="mb-3 flex items-center gap-4 rounded-xl bg-white px-4 py-4 font-semibold text-emerald-700 shadow-lg"
        >
          <FaTasks />
          Assigned Tasks
        </Link>

        <Link
          to="/worker/details"
          className="mb-3 flex items-center gap-4 rounded-xl px-4 py-4 font-semibold text-slate-200 transition hover:bg-white/10"
        >
          <FaCheckCircle />
          Completed Tasks
        </Link>
      </nav>

      <div className="border-t border-white/10 p-5">
        <Link
          to="/worker"
          className="flex w-full items-center gap-3 rounded-xl p-3 font-semibold text-slate-200 transition hover:bg-white/10"
        >
          <FaUserCircle className="text-2xl" />
          My Profile
        </Link>

        <button
          onClick={handleLogout}
          className="mt-3 flex w-full items-center gap-3 rounded-xl p-3 font-semibold text-slate-200 transition hover:bg-red-500"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}

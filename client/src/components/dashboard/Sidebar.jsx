import { Link, useNavigate } from "react-router-dom";
import {
  FaCamera,
  FaClipboardList,
  FaHome,
  FaLeaf,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import EcoPulseLogo from "../brand/EcoPulseLogo";

export default function Sidebar() {
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
      </div>

      <nav className="flex-1 px-4 py-6">
        <Link
          to="/dashboard"
          className="mb-3 flex items-center gap-4 rounded-xl bg-white px-4 py-4 font-semibold text-emerald-700 shadow-lg"
        >
          <FaHome />
          Dashboard
        </Link>

        <Link
          to="/report"
          className="mb-3 flex items-center gap-4 rounded-xl px-4 py-4 font-semibold text-slate-200 transition hover:bg-white/10"
        >
          <FaCamera />
          Report Issue
        </Link>

        <Link
          to="/history"
          className="mb-3 flex items-center gap-4 rounded-xl px-4 py-4 font-semibold text-slate-200 transition hover:bg-white/10"
        >
          <FaClipboardList />
          My Complaints
        </Link>

        <Link
          to="/eco-points"
          className="flex items-center gap-4 rounded-xl px-4 py-4 font-semibold text-slate-200 transition hover:bg-white/10"
        >
          <FaLeaf />
          Eco Points
        </Link>
      </nav>

      <div className="border-t border-white/10 p-5">
        <Link
          to="/dashboard"
          className="flex w-full items-center gap-3 rounded-xl p-3 font-semibold text-slate-200 transition hover:bg-white/10"
        >
          <FaUserCircle className="text-2xl" />
          <span>My Profile</span>
        </Link>

        <button
          onClick={handleLogout}
          className="mt-3 flex w-full items-center gap-3 rounded-xl p-3 font-semibold text-slate-200 transition hover:bg-red-500"
        >
          <FaSignOutAlt className="text-xl" />
          <span>Logout</span>
        </button>

        <p className="mt-6 text-center text-xs text-slate-400">
          EcoPulse AI v1.0
        </p>
      </div>
    </aside>
  );
}

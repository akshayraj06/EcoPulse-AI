import { useState, useRef, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

function Topbar() {
    const { user, logout } = useAuth();
    const [notice, setNotice] = useState("");
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const firstName = user?.name?.split(" ")[0] || "Citizen";
      const navigate = useNavigate();

    useEffect(() => {
      const onClick = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
      };
      window.addEventListener("click", onClick);
      return () => window.removeEventListener("click", onClick);
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <header className="mb-8 rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-600">
                    {getGreeting()}
                </p>
                <h2 className="mt-1 text-3xl font-black text-slate-950">
                    Hello {firstName}
                </h2>
                <p className="mt-1 text-slate-600">
                    Welcome back. Today's eco tip: segregate wet and dry waste before pickup.
                </p>
            </div>
            <div className="relative flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setNotice("Notification center opened. You have 3 updates.")}
                  className="rounded-2xl border border-slate-200 p-3 text-slate-600 transition hover:border-emerald-200 hover:text-emerald-600"
                  aria-label="Open notifications"
                >
                    <FaBell />
                </button>

                <div ref={menuRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setOpen((s) => !s)}
                    className="flex items-center gap-3 rounded-3xl bg-gradient-to-r from-emerald-500 to-cyan-400 px-3 py-2 text-white shadow-sm"
                    aria-haspopup="true"
                    aria-expanded={open}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 font-black">
                      {user?.name ? user.name.split(" ").map(s=>s[0]).slice(0,2).join("") : "U"}
                    </div>
                    <div className="text-left leading-tight">
                      <div className="text-sm font-black">{firstName}</div>
                      <div className="text-[0.65rem] text-white/80">{user?.role || "Supervisor"}</div>
                    </div>
                  </button>

                  {open && (
                    <div className="absolute right-0 z-30 mt-2 w-44 rounded-lg border border-slate-100 bg-white shadow-lg">
                      <button
                        className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        onClick={() => { setOpen(false); /* open profile modal if exists */ }}
                      >
                        Profile
                      </button>
                      <button
                        className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
            </div>
          </div>
          {notice && (
            <div className="mt-4 rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-800">
              {notice}
            </div>
          )}
        </header>
    );
}
export default Topbar;

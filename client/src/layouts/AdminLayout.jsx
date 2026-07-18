import { Outlet } from "react-router-dom";
import Topbar from "../components/dashboard/Topbar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Topbar />

      <main className="p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}

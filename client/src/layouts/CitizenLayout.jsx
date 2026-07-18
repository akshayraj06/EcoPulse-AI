import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";

export default function CitizenLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}

import { Outlet } from "react-router-dom";
import WorkerSidebar from "../components/worker/WorkerSidebar";

export default function WorkerLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <WorkerSidebar />

      <main className="flex-1 p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import AdminLayout from "./layouts/AdminLayout";
import CitizenLayout from "./layouts/CitizenLayout";
import WorkerLayout from "./layouts/WorkerLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import EcoPoints from "./pages/citizen/EcoPoints";
import ComplaintDetails from "./pages/citizen/ComplaintDetails";
import ComplaintHistory from "./pages/citizen/ComplaintHistory";
import Home from "./pages/citizen/Home";
import ReportIssue from "./pages/citizen/ReportIssue";
import SupervisorDashboard from "./pages/supervisor/SupervisorDashboard";
import WorkersDashboard from "./pages/worker/WorkersDashboard";
import WorkersTaskDetails from "./pages/worker/WorkersTaskDetails";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            element={
              <ProtectedRoute allowedRoles={["citizen"]}>
                <CitizenLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<CitizenDashboard />} />
            <Route path="/report" element={<ReportIssue />} />
            <Route path="/history" element={<ComplaintHistory />} />
            <Route path="/details" element={<ComplaintDetails />} />
            <Route path="/details/:id" element={<ComplaintDetails />} />
            <Route path="/eco-points" element={<EcoPoints />} />
          </Route>

          <Route
            element={
              <ProtectedRoute allowedRoles={["worker"]}>
                <WorkerLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/worker" element={<WorkersDashboard />} />
            <Route path="/worker/details" element={<WorkersTaskDetails />} />
            <Route path="/worker/details/:id" element={<WorkersTaskDetails />} />
          </Route>

          <Route
            element={
              <ProtectedRoute allowedRoles={["supervisor"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/supervisor" element={<SupervisorDashboard />} />
          </Route>

          <Route
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

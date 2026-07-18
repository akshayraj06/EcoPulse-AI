import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { getRoleDashboard } from "../../utils/routes";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-2xl bg-white px-8 py-6 font-semibold text-gray-700 shadow-lg">
          Loading...
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={getRoleDashboard(user.role)} replace />;
  }

  return children;
}

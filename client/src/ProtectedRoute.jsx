import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/useAuth";
import LoadingPage from "./components/LoadingPage";

function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingPage />;

  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default ProtectedRoute;

import { Navigate, Outlet } from "react-router-dom";
import { canUseProtectedApp } from "@/lib/auth/token";
import { useAppContext } from "@/stores/AppContext";

export function ProtectedRoute() {
  const { isAuthenticated } = useAppContext();
  if (!isAuthenticated || !canUseProtectedApp()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

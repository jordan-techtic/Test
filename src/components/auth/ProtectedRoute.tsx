import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getStoredAccessToken } from "../../lib/api/token";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  if (!getStoredAccessToken()) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
}

export function HomeRedirect() {
  if (getStoredAccessToken()) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Navigate to="/sign-in" replace />;
}

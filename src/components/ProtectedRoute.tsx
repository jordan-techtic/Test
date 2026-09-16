import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { hasUsableSession } from "@/lib/auth/storage";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  if (!hasUsableSession()) {
    return <Navigate to="/" replace />;
  }
  return children;
}

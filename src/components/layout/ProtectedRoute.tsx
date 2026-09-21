import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { getStoredToken } from '@/lib/auth/session';

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = getStoredToken();
  return token ? children : <Navigate to="/" replace />;
}

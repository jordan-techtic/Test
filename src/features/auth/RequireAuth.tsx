import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { getAccessToken } from './sessionStorage';

export function RequireAuth({ children }: { children: ReactNode }) {
  const location = useLocation();
  const token = getAccessToken();

  if (!token) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  return children;
}

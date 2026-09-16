import { Navigate, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppShell } from "@/components/layout/AppShell";
import { LoginPage } from "@/components/features/auth/LoginPage";
import { AnnualCalendarPage } from "@/components/features/calendar/AnnualCalendarPage";
import { NotFound } from "@/pages/NotFound";
import { ServerError } from "@/pages/ServerError";
import { canUseProtectedApp } from "@/lib/auth/token";

function RootRedirect() {
  return <Navigate to={canUseProtectedApp() ? "/calendar" : "/login"} replace />;
}

export const router = createBrowserRouter([
  { path: "/", element: <RootRedirect /> },
  { path: "/login", element: <LoginPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppShell />,
        children: [{ path: "/calendar", element: <AnnualCalendarPage /> }],
      },
    ],
  },
  { path: "/500", element: <ServerError /> },
  { path: "*", element: <NotFound /> },
]);

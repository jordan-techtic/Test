import { Route, Routes } from "react-router-dom";
import { GuestRoute, ProtectedRoute } from "@/components/ProtectedRoute";
import { LoginPage } from "@/components/features/auth/LoginPage";
import { CalendarPage } from "@/components/features/calendar/CalendarPage";
import { NotFound } from "@/components/features/NotFound";
import { ServerError } from "@/components/features/ServerError";
import { AppShell } from "@/components/layout/AppShell";

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />
      <Route
        path="/calendar"
        element={
          <ProtectedRoute>
            <AppShell>
              <CalendarPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route path="/500" element={<ServerError />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

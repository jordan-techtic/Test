import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LoginPage } from "@/components/features/auth/LoginPage";
import { NotFound } from "@/components/features/NotFound";
import { ProtectedPlaceholder } from "@/components/features/ProtectedPlaceholder";
import { ServerError } from "@/components/features/ServerError";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/protected",
    element: (
      <ProtectedRoute>
        <AppShell>
          <ProtectedPlaceholder />
        </AppShell>
      </ProtectedRoute>
    ),
  },
  {
    path: "/500",
    element: <ServerError />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

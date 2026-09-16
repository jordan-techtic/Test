import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppProvider } from "@/stores/AppContext";

function renderWithAuth(initialPath = "/calendar") {
  return render(
    <AppProvider>
      <MemoryRouter
        initialEntries={[initialPath]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route path="/login" element={<div>Login page</div>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/calendar" element={<div>Calendar page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AppProvider>,
  );
}

describe("ProtectedRoute", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("redirects unauthenticated users to login", () => {
    renderWithAuth();
    expect(screen.getByText("Login page")).toBeInTheDocument();
  });

  it("renders the protected page when a session is established", () => {
    localStorage.setItem("token", "access-token");
    localStorage.setItem("session_established", "true");
    localStorage.setItem(
      "auth_user",
      JSON.stringify({ id: "1", email: "a@b.com", username: "alex", role: "marketing" }),
    );
    renderWithAuth();
    expect(screen.getByText("Calendar page")).toBeInTheDocument();
  });
});

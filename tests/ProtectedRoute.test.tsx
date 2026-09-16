import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { SESSION_REJECTED_KEY } from "@/lib/auth/storage";

function renderProtected() {
  return render(
    <MemoryRouter initialEntries={["/protected"]}>
      <Routes>
        <Route path="/" element={<div>login page</div>} />
        <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <div>secret</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>,
  );
}

describe("ProtectedRoute", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it("redirects unauthenticated users to login", () => {
    renderProtected();
    expect(screen.getByText("login page")).toBeInTheDocument();
  });

  it("does not restore a rejected session from storage", () => {
    localStorage.setItem("access_token", "dead-token");
    sessionStorage.setItem(SESSION_REJECTED_KEY, "1");
    renderProtected();
    expect(screen.getByText("login page")).toBeInTheDocument();
  });

  it("renders children when a session exists", () => {
    localStorage.setItem("access_token", "live-token");
    renderProtected();
    expect(screen.getByText("secret")).toBeInTheDocument();
  });
});

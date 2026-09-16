import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { GuestRoute, ProtectedRoute } from "@/components/ProtectedRoute";
import { AppProvider } from "@/stores/AppContext";

describe("ProtectedRoute", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("redirects unauthenticated users to the login route", () => {
    render(
      <AppProvider>
        <MemoryRouter initialEntries={["/calendar"]}>
          <Routes>
            <Route path="/" element={<div>Sign in</div>} />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <div>Calendar</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </AppProvider>,
    );

    expect(screen.getByText("Sign in")).toBeInTheDocument();
    expect(screen.queryByText("Calendar")).not.toBeInTheDocument();
  });

  it("does not treat a leftover token as a session without stored user", () => {
    window.localStorage.setItem("mcc.access_token", "dead-token");
    render(
      <AppProvider>
        <MemoryRouter initialEntries={["/calendar"]}>
          <Routes>
            <Route path="/" element={<div>Sign in</div>} />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <div>Calendar</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </AppProvider>,
    );

    expect(screen.getByText("Sign in")).toBeInTheDocument();
    expect(screen.queryByText("Calendar")).not.toBeInTheDocument();
  });

  it("sends authenticated users from login to the calendar", () => {
    window.localStorage.setItem("mcc.access_token", "live-token");
    window.localStorage.setItem(
      "mcc.user",
      JSON.stringify({
        id: "1",
        email: "member@example.com",
        username: "member",
        role: "marketing",
      }),
    );
    render(
      <AppProvider>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route
              path="/"
              element={
                <GuestRoute>
                  <div>Sign in</div>
                </GuestRoute>
              }
            />
            <Route path="/calendar" element={<div>Calendar</div>} />
          </Routes>
        </MemoryRouter>
      </AppProvider>,
    );

    expect(screen.getByText("Calendar")).toBeInTheDocument();
    expect(screen.queryByText("Sign in")).not.toBeInTheDocument();
  });
});

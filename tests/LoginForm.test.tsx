import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LoginForm } from "@/components/features/auth/LoginForm";
import { AppProvider } from "@/stores/AppContext";

describe("LoginForm", () => {
  it("renders email/username, password, login, and forgot password controls", () => {
    render(
      <AppProvider>
        <MemoryRouter>
          <LoginForm onForgotPassword={() => undefined} />
        </MemoryRouter>
      </AppProvider>,
    );
    expect(screen.getByLabelText("Email or username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Forgot password?" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Show password" })).toBeInTheDocument();
  });
});

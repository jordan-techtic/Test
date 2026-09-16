import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { LoginForm } from "@/components/features/auth/LoginForm";
import { AppProvider } from "@/stores/AppContext";

jest.mock("@/hooks/useLogin", () => ({
  useLogin: () => ({
    submit: jest.fn(),
    isPending: false,
    error: null,
    fieldErrors: {},
  }),
}));

describe("LoginForm", () => {
  it("renders email, password, and log in controls", async () => {
    const user = userEvent.setup();
    render(
      <AppProvider>
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <LoginForm onForgotPassword={jest.fn()} />
        </MemoryRouter>
      </AppProvider>,
    );

    expect(screen.getByLabelText("Email or username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Forgot password?" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Show password" }));
    expect(screen.getByLabelText("Password")).toHaveAttribute("type", "text");
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LoginForm } from "@/components/features/auth/LoginForm";
import { AppProvider } from "@/stores/AppContext";

jest.mock("@/hooks/useLogin", () => ({
  useLogin: () => ({
    submit: jest.fn(),
    isLoading: false,
  }),
}));

describe("login validation", () => {
  it("shows field errors when credentials are empty", async () => {
    render(
      <AppProvider>
        <MemoryRouter>
          <LoginForm onForgotPassword={() => undefined} />
        </MemoryRouter>
      </AppProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    expect(await screen.findByText("Email or username is required.")).toBeInTheDocument();
    expect(screen.getByText("Password is required.")).toBeInTheDocument();
  });

  it("toggles password visibility without clearing the value", () => {
    render(
      <AppProvider>
        <MemoryRouter>
          <LoginForm onForgotPassword={() => undefined} />
        </MemoryRouter>
      </AppProvider>,
    );

    const password = screen.getByLabelText("Password") as HTMLInputElement;
    fireEvent.change(password, { target: { value: "secret-pass" } });
    expect(password).toHaveAttribute("type", "password");

    fireEvent.click(screen.getByRole("button", { name: "Show password" }));
    expect(password).toHaveAttribute("type", "text");
    expect(password.value).toBe("secret-pass");

    fireEvent.click(screen.getByRole("button", { name: "Hide password" }));
    expect(password).toHaveAttribute("type", "password");
    expect(password.value).toBe("secret-pass");
  });
});

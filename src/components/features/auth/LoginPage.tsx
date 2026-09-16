import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ForgotPasswordForm } from "@/components/features/auth/ForgotPasswordForm";
import { LoginForm } from "@/components/features/auth/LoginForm";

export function LoginPage() {
  const [showRecovery, setShowRecovery] = useState(false);

  useEffect(() => {
    document.title = "Sign in · Marketing Content Calendar";
  }, []);

  useEffect(() => {
    if (!showRecovery) {
      return;
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowRecovery(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showRecovery]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-[28rem]">
        <CardHeader>
          <img
            src="/brand-logo.webp"
            alt="Marketing Content Calendar"
            className="mb-2 h-10 w-auto"
          />
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Use your registered email or username to access the marketing calendar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showRecovery ? (
            <ForgotPasswordForm onCancel={() => setShowRecovery(false)} />
          ) : (
            <LoginForm onForgotPassword={() => setShowRecovery(true)} />
          )}
        </CardContent>
      </Card>
    </main>
  );
}

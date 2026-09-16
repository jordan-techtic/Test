import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { ForgotPasswordForm } from "@/components/features/auth/ForgotPasswordForm";
import { LoginForm } from "@/components/features/auth/LoginForm";

export function LoginPage() {
  const [forgotOpen, setForgotOpen] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center">
          <img src="/brand-logo.jpg" alt="Marketing Content Calendar" className="h-12 w-12 rounded-md object-cover" />
          <h1 className="text-[28px] font-semibold leading-9 text-foreground">Marketing Content Calendar</h1>
          <CardDescription>Sign in with your email or username and password.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm onForgotPassword={() => setForgotOpen(true)} />
        </CardContent>
      </Card>
      <ForgotPasswordForm open={forgotOpen} onOpenChange={setForgotOpen} />
    </div>
  );
}

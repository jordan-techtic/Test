import { useState } from "react";
import { ForgotPasswordForm } from "@/components/features/auth/ForgotPasswordForm";
import { LoginForm } from "@/components/features/auth/LoginForm";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function LoginPage() {
  const [forgotOpen, setForgotOpen] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3">
          <img src="/brand-logo.webp" alt="Marketing Content Calendar" className="h-10 w-auto" />
          <h1 className="text-[28px] font-semibold leading-9">Sign in</h1>
          <CardDescription>Access the annual marketing content calendar.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm onForgotPassword={() => setForgotOpen(true)} />
        </CardContent>
      </Card>
      <Dialog open={forgotOpen} onOpenChange={setForgotOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Forgot password</DialogTitle>
            <DialogDescription>
              Enter your email and we will send recovery instructions if an account exists.
            </DialogDescription>
          </DialogHeader>
          <ForgotPasswordForm onClose={() => setForgotOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

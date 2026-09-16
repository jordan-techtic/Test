import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ForgotPasswordForm } from "@/components/features/auth/ForgotPasswordForm";
import { LoginForm } from "@/components/features/auth/LoginForm";
import { loadMarketingWorkspace } from "@/lib/api/marketing";

export function LoginPage() {
  const [showRecovery, setShowRecovery] = useState(false);

  useEffect(() => {
    document.title = "Sign in · Marketing Content Calendar";
    void loadMarketingWorkspace();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-[28rem]">
        <CardHeader>
          <img
            src="/brand-logo.webp"
            alt="Marketing Content Calendar"
            className="mb-2 h-10 w-auto"
          />
          <h1 className="text-[28px] font-semibold leading-9 tracking-tight">Sign in</h1>
          <CardDescription>
            Use your registered email or username to access the marketing calendar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm onForgotPassword={() => setShowRecovery(true)} />
        </CardContent>
      </Card>
      <Dialog open={showRecovery} onOpenChange={setShowRecovery}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset password</DialogTitle>
            <DialogDescription>
              If the email is registered, you will receive instructions.
            </DialogDescription>
          </DialogHeader>
          <ForgotPasswordForm onCancel={() => setShowRecovery(false)} />
        </DialogContent>
      </Dialog>
    </main>
  );
}

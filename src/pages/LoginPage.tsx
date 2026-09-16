import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ForgotPasswordPanel } from '@/components/features/auth/ForgotPasswordPanel';
import { LoginForm } from '@/components/features/auth/LoginForm';
import { useAuth } from '@/stores/AuthProvider';

export function LoginPage() {
  const { isAuthenticated } = useAuth();
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center">
          <img
            src="/brand-logo.png"
            alt="Marketing Content Calendar"
            className="mb-2 h-12 w-auto"
          />
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>Sign in to manage the marketing content calendar.</CardDescription>
        </CardHeader>
        <CardContent>
          {!showForgotPassword ? (
            <LoginForm onForgotPassword={() => setShowForgotPassword(true)} />
          ) : (
            <ForgotPasswordPanel onCancel={() => setShowForgotPassword(false)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

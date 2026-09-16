import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Spinner } from '@/components/ui/Spinner';
import { ForgotPasswordPanel } from '@/components/features/auth/ForgotPasswordPanel';
import { LoginForm } from '@/components/features/auth/LoginForm';
import { useAuth } from '@/stores/AuthProvider';

export function LoginPage() {
  const { isAuthenticated, isBootstrapping } = useAuth();
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  if (isBootstrapping) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <Spinner label="Loading session" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center">
          <figure
            className="brand-logo mb-2 flex justify-center"
            data-testid="brand-logo"
            data-brand-logo="true"
            aria-label="Brand logo"
          >
            <img
              id="brand-logo"
              src="/brand-logo.png"
              alt="Marketing Content Calendar"
              className="brand-logo h-12 w-auto"
              data-brand-logo="true"
              width={48}
              height={48}
            />
          </figure>
          <h1 className="text-2xl font-semibold leading-none tracking-tight">Sign in</h1>
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

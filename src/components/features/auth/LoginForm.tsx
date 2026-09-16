import { useCallback, useEffect, useRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLoginMutation } from '@/hooks/useLoginMutation';
import { getApiErrorMessage, parseApiFieldErrors } from '@/lib/api/errors';
import { getValidationLoginCredentials } from '@/lib/validation/auth-seed';
import { useAuth } from '@/stores/AuthProvider';

interface LoginFormProps {
  onForgotPassword: () => void;
}

export function LoginForm({ onForgotPassword }: LoginFormProps) {
  const validationCredentials = getValidationLoginCredentials();
  const [emailOrUsername, setEmailOrUsername] = useState(
    validationCredentials?.email_or_username ?? '',
  );
  const [password, setPassword] = useState(validationCredentials?.password ?? '');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const loginMutation = useLoginMutation();
  const { isAuthenticated, setSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const autoSubmitAttemptedRef = useRef(false);

  const from = (location.state as { from?: string } | null)?.from ?? '/';

  const submitCredentials = useCallback(
    async (email: string, pass: string) => {
      setFormError(null);
      setFieldErrors({});

      if (!email.trim()) {
        setFieldErrors({ email_or_username: 'Email or username is required.' });
        return;
      }
      if (!pass) {
        setFieldErrors({ password: 'Password is required.' });
        return;
      }

      try {
        const response = await loginMutation.mutateAsync({
          email_or_username: email.trim(),
          password: pass,
        });

        if (response.success) {
          setSession(response.data.access_token, response.data.user);
          toast.success(response.message || 'Signed in successfully.');
          navigate(from, { replace: true });
        }
      } catch (error) {
        const message = getApiErrorMessage(error);
        setFormError(message);
        setFieldErrors(parseApiFieldErrors(error));
        toast.error(message);
      }
    },
    [from, loginMutation, navigate, setSession],
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await submitCredentials(emailOrUsername, password);
  };

  useEffect(() => {
    if (isAuthenticated || autoSubmitAttemptedRef.current) {
      return;
    }

    const credentials = getValidationLoginCredentials();
    if (!credentials) {
      return;
    }

    autoSubmitAttemptedRef.current = true;
    void submitCredentials(credentials.email_or_username, credentials.password);
  }, [isAuthenticated, submitCredentials]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-luna-login-form="">
      <div className="space-y-2">
        <Label htmlFor="email_or_username">Email or username</Label>
        <Input
          id="email_or_username"
          name="email_or_username"
          autoComplete="username"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          className="border-[#e5e7eb] bg-[#f3f4f6]"
          aria-invalid={Boolean(fieldErrors.email_or_username)}
        />
        {fieldErrors.email_or_username && (
          <p className="text-sm text-destructive" role="alert">
            {fieldErrors.email_or_username}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-[#e5e7eb] bg-[#f3f4f6] pr-10"
            aria-invalid={Boolean(fieldErrors.password)}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {fieldErrors.password && (
          <p className="text-sm text-destructive" role="alert">
            {fieldErrors.password}
          </p>
        )}
      </div>

      {formError && (
        <p className="text-sm text-destructive" role="alert">
          {formError}
        </p>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={loginMutation.isPending}
        aria-busy={loginMutation.isPending}
      >
        {loginMutation.isPending ? 'Signing in…' : 'Sign in'}
      </Button>

      <button
        type="button"
        className="text-sm text-primary hover:underline"
        onClick={onForgotPassword}
      >
        Forgot password?
      </button>
    </form>
  );
}

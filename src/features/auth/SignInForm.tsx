import { type FormEvent, useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { Skeleton } from '@/components/ui/skeleton';
import { useLogin } from '@/hooks/useLogin';
import { getRememberMe } from '@/lib/auth/session';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignInForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  const { mutate, isPending, error, fieldErrors } = useLogin();

  useEffect(() => {
    setRememberMe(getRememberMe());
  }, []);

  const mergedFieldError = (field: string): string | undefined => {
    return clientErrors[field] ?? fieldErrors[field]?.[0];
  };

  const bannerError = error;

  const validate = (): boolean => {
    const next: Record<string, string> = {};

    if (!email.trim()) {
      next.email = 'Email is required.';
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      next.email = 'Enter a valid email address.';
    }
    if (!password) {
      next.password = 'Password is required.';
    }

    setClientErrors(next);
    const firstErrorField = Object.keys(next)[0];
    if (firstErrorField) {
      document.querySelector<HTMLElement>(`[name="${firstErrorField}"]`)?.focus();
    }
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      await mutate({ email: email.trim(), password }, rememberMe);
      navigate('/dashboard', { replace: true });
    } catch {
      // Errors surfaced via banner and field messages.
    }
  };

  const statusMessage = isPending
    ? 'Signing in.'
    : bannerError ?? Object.values(clientErrors)[0] ?? Object.values(fieldErrors).flat()[0] ?? '';

  return (
    <form
      data-figma-node="998:1024"
      noValidate
      onSubmit={(event) => {
        void handleSubmit(event);
      }}
      className="absolute box-border left-[100px] top-[105.5px] w-[461px] flex flex-col items-center gap-7"
      aria-busy={isPending}
    >
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {statusMessage}
      </div>

      <img
        src="/assets/figma/1007-1734.png"
        alt="Agentwise"
        className="box-border h-[55px] w-[164px] max-w-none object-cover object-top"
      />

      <div className="relative box-border h-[130px] w-[461px] gap-2.5">
        <h1 className="absolute left-0 top-0 box-border h-[100px] w-[461px] text-center font-eb-garamond text-[38px] font-[500] leading-[49.59px] text-[#ffffff]">
          Welcome Back
        </h1>
        <p className="absolute left-[84.5px] top-[110px] box-border h-[20px] w-[292px] whitespace-nowrap text-center font-almarai text-[18px] font-[400] leading-[20.09px] text-[#ffffff] opacity-60">
          Sign in to your Agentwise account
        </p>
      </div>

      {bannerError ? (
        <p role="alert" className="w-full rounded-full bg-[rgba(255,107,107,0.12)] px-5 py-3 text-center font-almarai text-[14px] text-[#ff6b6b]">
          {bannerError}
        </p>
      ) : null}

      <div className="relative box-border h-[184px] w-[461px] gap-5">
        <div
          className="absolute left-0 top-0 box-border h-[52px] w-[461px] rounded-full pl-[20px] pr-[20px]"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
        >
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            aria-label="Email"
            aria-invalid={Boolean(mergedFieldError('email'))}
            autoComplete="email"
            disabled={isPending}
            className="absolute left-[20px] top-[18px] box-border h-[16px] w-[421px] border-0 bg-transparent px-0 font-almarai text-[14px] font-[400] leading-[15.62px] text-[#ffffff] opacity-60 shadow-none ring-0 placeholder:text-[#ffffff] focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed"
          />
        </div>
        {mergedFieldError('email') ? (
          <p role="alert" className="absolute left-0 top-[56px] font-almarai text-[12px] text-[#ff6b6b]">
            {mergedFieldError('email')}
          </p>
        ) : null}

        <div
          className="absolute left-0 top-[72px] box-border h-[52px] w-[461px] rounded-full pl-[20px] pr-[20px]"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
        >
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            aria-label="Password"
            aria-invalid={Boolean(mergedFieldError('password'))}
            autoComplete="current-password"
            disabled={isPending}
            className="absolute left-[20px] top-[18px] box-border h-[16px] w-[361px] border-0 bg-transparent px-0 font-almarai text-[14px] font-[400] leading-[15.62px] text-[#ffffff] opacity-60 shadow-none ring-0 placeholder:text-[#ffffff] focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed"
          />
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
            disabled={isPending}
            onClick={() => setShowPassword((current) => !current)}
            className="absolute left-[411px] top-[6px] box-border flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-[500px] border-0 bg-transparent p-0 text-[#ffffff] hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e] disabled:cursor-not-allowed"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {mergedFieldError('password') ? (
          <p role="alert" className="absolute left-0 top-[128px] font-almarai text-[12px] text-[#ff6b6b]">
            {mergedFieldError('password')}
          </p>
        ) : null}

        <div className="absolute left-0 top-[144px] box-border flex h-[20px] w-[461px] items-center justify-between gap-2">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              name="remember_me"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              disabled={isPending}
              aria-label="Remember me"
              className="box-border h-[20px] w-[20px] cursor-pointer appearance-none rounded-[4px] border border-[#ffffff] bg-transparent checked:border-[#c8a47e] checked:bg-[#c8a47e] disabled:cursor-not-allowed"
            />
            <span className="font-almarai text-[14px] font-[400] leading-[15.62px] text-[#ffffff] opacity-60">
              Remember me
            </span>
          </label>
          <Link
            to="/forgot-password"
            className="font-almarai text-[14px] font-[400] leading-[15.62px] text-[#c8a47e] hover:opacity-90"
          >
            Forgot your password?
          </Link>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        aria-busy={isPending}
        className="relative box-border inline-flex h-[52px] w-[461px] items-center justify-center rounded-full bg-[#c8a47e] px-[24px] py-[10px] text-[#ffffff] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e] disabled:pointer-events-none disabled:opacity-50"
      >
        {isPending ? (
          <>
            <Skeleton className="absolute inset-0 rounded-full bg-[rgba(255,255,255,0.08)]" />
            <span className="relative font-almarai text-[18px] font-[400] leading-[20.09px]">
              Signing in…
            </span>
          </>
        ) : (
          <span className="font-almarai text-[18px] font-[400] leading-[20.09px]">Sign In</span>
        )}
      </button>

      <div className="box-border h-[1px] w-[461px]" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

      <p className="box-border h-[16px] w-[461px] whitespace-nowrap text-center font-almarai text-[14px] font-[400] leading-[15.62px] text-[#ffffff] opacity-60">
        Not a member yet?{' '}
        <Link to="/signup" className="text-[#c8a47e] hover:opacity-90">
          Sign up here.
        </Link>
      </p>
    </form>
  );
}

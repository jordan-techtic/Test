import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/useLogout';
import { getToken } from '@/lib/auth/session';

export default function DashboardPage() {
  const token = getToken();
  const { logout, isPending, error } = useLogout();

  useEffect(() => {
    document.title = 'Dashboard | Agentwise';
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0e0d0d] px-4 text-center text-white">
      <h1 className="font-eb-garamond text-[48px] font-[500] leading-[56px]">Dashboard</h1>
      <p className="max-w-lg font-almarai text-[16px] opacity-60">
        {token
          ? 'You are signed in. Your Agentwise workspace will load here.'
          : 'Sign in to access your Agentwise workspace.'}
      </p>
      {error ? (
        <p role="alert" className="font-almarai text-[14px] text-[#ff6b6b]">
          {error}
        </p>
      ) : null}
      {token ? (
        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          aria-busy={isPending}
          onClick={() => {
            void logout();
          }}
          className="rounded-full border-[#c8a47e] bg-transparent font-almarai text-[16px] text-[#c8a47e] hover:bg-[#c8a47e] hover:text-white"
        >
          {isPending ? 'Signing out…' : 'Sign Out'}
        </Button>
      ) : (
        <Link to="/login" className="font-almarai text-[16px] text-[#c8a47e] hover:opacity-90">
          Sign in
        </Link>
      )}
    </div>
  );
}

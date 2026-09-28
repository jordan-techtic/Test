import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLogout } from '@/hooks/useLogout';
import { getToken } from '@/lib/auth/session';

export default function DashboardPage() {
  const token = getToken();
  const { logout, isPending, error } = useLogout();

  useEffect(() => {
    document.title = 'Dashboard | Agentwise';
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-[var(--color-surface)] text-[var(--color-text)]">
      <header className="flex w-full items-center justify-end px-6 py-4">
        {token ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Account menu"
                className="rounded-full border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-text)]"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-[var(--color-border)] bg-[var(--color-surface-alt)]">
              <DropdownMenuItem
                disabled={isPending}
                onSelect={() => {
                  void logout();
                }}
                className="cursor-pointer font-almarai text-[14px] focus:bg-[var(--color-accent)] focus:text-[var(--color-text)]"
              >
                {isPending ? 'Signing out…' : 'Sign out'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </header>
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
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
        {!token ? (
          <Link to="/login" className="font-almarai text-[16px] text-[var(--color-accent)] hover:opacity-90">
            Sign in
          </Link>
        ) : null}
      </main>
    </div>
  );
}

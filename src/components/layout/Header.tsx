import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/stores/AuthProvider';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4 md:px-6">
      <h1 className="text-lg font-semibold">Marketing Content Calendar</h1>
      <div className="flex items-center gap-3">
        {user && (
          <span className="hidden text-sm text-muted-foreground sm:inline">{user.email}</span>
        )}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleLogout}
          aria-label="Sign out"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Sign out</span>
        </Button>
      </div>
    </header>
  );
}

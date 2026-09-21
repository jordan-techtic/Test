import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

type SidebarNavProps = {
  onNavigate?: () => void;
};

export function SidebarNav({ onNavigate }: SidebarNavProps) {
  return (
    <nav aria-label="Primary" className="flex flex-col gap-1">
      <NavLink
        to="/"
        end
        onClick={onNavigate}
        className={({ isActive }) =>
          cn(
            'rounded-[10px] px-3 py-2 text-sm font-semibold transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            isActive ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-white/5',
          )
        }
      >
        Home
      </NavLink>
    </nav>
  );
}

export default function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-border/20 bg-[#0b0b0b] px-4 py-6 md:block">
      <SidebarNav />
    </aside>
  );
}

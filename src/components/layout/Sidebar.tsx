import { CalendarDays, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAppLayout } from '@/stores/AppLayoutProvider';

const navItems = [{ to: '/', label: 'Calendar', icon: CalendarDays }];

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useAppLayout();
  const location = useLocation();

  return (
    <aside
      className={cn(
        'flex shrink-0 flex-col border-r border-border bg-card transition-all duration-200',
        sidebarCollapsed ? 'w-16' : 'w-64',
      )}
    >
      <div className="flex items-center gap-2 border-b border-border p-4">
        {!sidebarCollapsed && (
          <img src="/brand-logo.png" alt="Marketing Content Calendar" className="h-8 w-auto" />
        )}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="ml-auto shrink-0"
          onClick={toggleSidebar}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </Button>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) => {
              const calendarActive =
                isActive || location.pathname === '/calendar';
              return cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted',
                calendarActive && 'bg-primary text-primary-foreground hover:bg-primary/90',
                sidebarCollapsed && 'justify-center px-2',
              );
            }}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {!sidebarCollapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

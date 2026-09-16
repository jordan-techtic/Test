import { CalendarDays } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export function Sidebar({ className, onNavigate }: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-full w-[240px] flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-sidebar-border px-4 py-4">
        <img src="/brand-logo.webp" alt="Marketing Content Calendar" className="h-8 w-auto" />
      </div>
      <nav className="flex flex-col gap-1 p-3" aria-label="Primary">
        <NavLink
          to="/calendar"
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive &&
                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
            )
          }
        >
          <CalendarDays className="size-4" aria-hidden />
          Calendar
        </NavLink>
      </nav>
    </aside>
  );
}

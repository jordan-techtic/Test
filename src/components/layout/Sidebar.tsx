import { CalendarDays, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [{ to: "/calendar", label: "Calendar", icon: CalendarDays }];

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1" aria-label="Primary">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-muted",
              isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
            )
          }
        >
          <item.icon className="size-4" aria-hidden />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 border-r bg-sidebar p-4 md:block">
      <div className="mb-6 flex items-center gap-2">
        <img src="/brand-logo.jpg" alt="Marketing Content Calendar" className="h-9 w-9 rounded-md object-cover" />
        <span className="text-sm font-semibold leading-tight">Marketing Content Calendar</span>
      </div>
      <NavItems />
    </aside>
  );
}

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button type="button" variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation">
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <img src="/brand-logo.jpg" alt="" className="h-8 w-8 rounded-md object-cover" />
            Navigation
          </SheetTitle>
          <SheetDescription className="sr-only">Primary application destinations.</SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          <NavItems />
        </div>
      </SheetContent>
    </Sheet>
  );
}

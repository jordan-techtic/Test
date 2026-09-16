import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MobileNav } from "@/components/layout/Sidebar";
import { useAppContext } from "@/stores/AppContext";
import { humanizeKey } from "@/lib/utils";

export function Header() {
  const { user, signOut } = useAppContext();
  const navigate = useNavigate();
  const label = user?.username || user?.email || "Account";
  const orgOrRole = user?.role ? humanizeKey(user.role) : null;

  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-4">
      <div className="flex items-center gap-2">
        <MobileNav />
        {orgOrRole ? <p className="text-sm font-medium text-muted-foreground">{orgOrRole}</p> : null}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="ghost" className="h-9 max-w-48 truncate px-2" aria-label="Account menu">
            {label}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => {
              signOut();
              navigate("/login", { replace: true });
            }}
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

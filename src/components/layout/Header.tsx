import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";

interface HeaderProps {
  onOpenNav?: () => void;
}

export function Header({ onOpenNav }: HeaderProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const initials = (user?.username || user?.email || "U").slice(0, 1).toUpperCase();

  function handleSignOut() {
    signOut();
    navigate("/", { replace: true });
  }

  return (
    <header className="flex h-14 items-center justify-between gap-3 border-b bg-card px-4">
      <div className="flex items-center gap-2">
        {onOpenNav ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open navigation"
                onClick={onOpenNav}
              >
                <Menu className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Open navigation</TooltipContent>
          </Tooltip>
        ) : null}
        <p className="text-sm font-medium text-muted-foreground">Marketing Content Calendar</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            className="h-9 gap-2 rounded-md px-2"
            aria-label="Account menu"
          >
            <Avatar className="size-7">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <span className="hidden max-w-[140px] truncate text-sm font-medium sm:inline">
              {user?.username || user?.email}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <p className="text-sm font-medium">{user?.username}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleSignOut}>Sign out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

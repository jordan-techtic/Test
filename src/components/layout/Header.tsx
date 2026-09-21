import { useState } from 'react';
import { Menu } from 'lucide-react';
import { FaBeer } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { SidebarNav } from '@/components/layout/Sidebar';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-[color:var(--color-color-16)] px-[var(--padding-16)]">
      <div className="flex items-center gap-[var(--gap-12)]">
        <Sheet open={open} onOpenChange={setOpen}>
          <Tooltip>
            <TooltipTrigger asChild>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="bg-accent text-accent-foreground md:hidden"
                  aria-label="Menu"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
            </TooltipTrigger>
            <TooltipContent>Menu</TooltipContent>
          </Tooltip>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Agentwise</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <SidebarNav onNavigate={() => setOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
        <p className="font-eb-garamond font-semibold tracking-tight text-[color:var(--color-success)] text-[length:var(--fs-heading-md-11)]">
          Agentwise
        </p>
      </div>
      <span
        className="inline-flex items-center gap-[var(--gap-8)] text-sm text-[color:var(--color-color-15)]"
        aria-hidden="true"
      >
        <FaBeer className="h-4 w-4 text-accent" aria-hidden="true" />
      </span>
    </header>
  );
}

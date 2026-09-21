import { useState } from 'react';
import { Menu } from 'lucide-react';
import { FaBeer } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { SidebarNav } from '@/components/layout/Sidebar';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex h-14 items-center justify-between border-b border-border/20 bg-[#0b0b0b] px-4 md:px-6">
      <div className="flex items-center gap-3">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button type="button" variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Agentwise</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <SidebarNav onNavigate={() => setOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
        <p className="font-eb-garamond text-[22px] font-semibold tracking-tight text-primary">Agentwise</p>
      </div>
      <span className="inline-flex items-center gap-2 text-sm text-muted-foreground" aria-hidden="true">
        <FaBeer className="h-4 w-4 text-primary" aria-hidden="true" />
      </span>
    </header>
  );
}

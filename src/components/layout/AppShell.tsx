import { useState, type ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export function AppShell({ children }: { children: ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar className="hidden md:flex" />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header onOpenNav={() => setNavOpen(true)} />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
      <Sheet open={navOpen} onOpenChange={setNavOpen}>
        <SheetContent side="left" className="w-[240px] p-0">
          <Sidebar onNavigate={() => setNavOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}

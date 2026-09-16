import { AppRoutes } from "@/routes";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function App() {
  return (
    <TooltipProvider delayDuration={200}>
      <Toaster />
      <AppRoutes />
    </TooltipProvider>
  );
}

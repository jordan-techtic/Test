import { RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { router } from "@/routes/index";
import { AppProvider } from "@/stores/AppContext";

export default function App() {
  return (
    <AppProvider>
      <ErrorBoundary>
        <TooltipProvider>
          <Toaster />
          <RouterProvider router={router} />
        </TooltipProvider>
      </ErrorBoundary>
    </AppProvider>
  );
}

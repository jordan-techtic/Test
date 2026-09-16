import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Toaster } from "@/components/ui/sonner";
import { Toaster as RadixToaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { router } from "@/routes";
import { AppProvider } from "@/stores/AppContext";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <RadixToaster />
          <RouterProvider router={router} />
        </TooltipProvider>
      </AppProvider>
    </ErrorBoundary>
  </StrictMode>,
);

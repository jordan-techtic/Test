import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";

const toast = sonnerToast;

function Toaster() {
  return (
    <SonnerToaster
      theme="light"
      className="toaster group"
      closeButton
      toastOptions={{
        duration: 4000,
        classNames: {
          toast: "group toast border bg-card text-foreground",
          success: "border-success/30",
          error: "border-destructive/30",
          info: "border-border",
        },
      }}
    />
  );
}

export { toast, Toaster };

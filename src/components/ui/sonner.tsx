import { Toaster as Sonner, toast as sonnerToast, type ToasterProps } from "sonner";

export const toast = sonnerToast;

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      duration={4000}
      closeButton
      visibleToasts={5}
      toastOptions={{
        duration: 4000,
        classNames: {
          toast: "group toast border border-border bg-card text-foreground",
          description: "text-muted-foreground",
          success: "border-success",
          error: "border-destructive",
          info: "border-border",
          warning: "border-warning",
          closeButton: "border-border bg-background text-foreground",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
export type { ToasterProps };

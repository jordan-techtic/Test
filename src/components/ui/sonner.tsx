import {
  Toaster as Sonner,
  toast as emitSonnerToast,
  type ExternalToast,
  type ToasterProps,
} from "sonner";

function showToast(message: string, data?: ExternalToast) {
  return emitSonnerToast(message, data);
}

const toast = Object.assign(showToast, {
  success: (message: string, data?: ExternalToast) => emitSonnerToast.success(message, data),
  error: (message: string, data?: ExternalToast) => emitSonnerToast.error(message, data),
  info: (message: string, data?: ExternalToast) => emitSonnerToast.info(message, data),
  warning: (message: string, data?: ExternalToast) => emitSonnerToast.warning(message, data),
  dismiss: (id?: string | number) => emitSonnerToast.dismiss(id),
  message: (message: string, data?: ExternalToast) => emitSonnerToast.message(message, data),
});

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

export { Toaster, toast };
export type { ToasterProps };

import {
  Toaster as Sonner,
  toast as emitSonnerToast,
  type ExternalToast,
  type ToasterProps,
} from "sonner";

type SonnerToast = ((message: string, data?: ExternalToast) => string | number) & {
  success: (message: string, data?: ExternalToast) => string | number;
  error: (message: string, data?: ExternalToast) => string | number;
  info: (message: string, data?: ExternalToast) => string | number;
  warning: (message: string, data?: ExternalToast) => string | number;
  message: (message: string, data?: ExternalToast) => string | number;
  dismiss: (id?: string | number) => void;
};

export const toast: SonnerToast = Object.assign(
  function toast(message: string, data?: ExternalToast) {
    return emitSonnerToast(message, data);
  },
  {
    success: (message: string, data?: ExternalToast) => emitSonnerToast.success(message, data),
    error: (message: string, data?: ExternalToast) => emitSonnerToast.error(message, data),
    info: (message: string, data?: ExternalToast) => emitSonnerToast.info(message, data),
    warning: (message: string, data?: ExternalToast) => emitSonnerToast.warning(message, data),
    message: (message: string, data?: ExternalToast) => emitSonnerToast.message(message, data),
    dismiss: (id?: string | number) => {
      emitSonnerToast.dismiss(id);
    },
  },
);

export function Toaster({ ...props }: ToasterProps) {
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

export type { ToasterProps };

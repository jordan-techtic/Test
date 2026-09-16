import { CircleCheck, Info, Loader2, OctagonX, TriangleAlert } from "lucide-react";
import * as React from "react";
import {
  Toaster as SonnerToaster,
  toast as sonnerToast,
  type ExternalToast,
  type ToasterProps,
} from "sonner";
import { cn } from "@/lib/utils";

const DEFAULT_DURATION_MS = 4000;

type ToastMessage = React.ReactNode;

function showToast(message: ToastMessage, data?: ExternalToast) {
  return sonnerToast(message, { duration: DEFAULT_DURATION_MS, ...data });
}

function success(message: ToastMessage, data?: ExternalToast) {
  return sonnerToast.success(message, { duration: DEFAULT_DURATION_MS, ...data });
}

function error(message: ToastMessage, data?: ExternalToast) {
  return sonnerToast.error(message, { duration: DEFAULT_DURATION_MS, ...data });
}

function warning(message: ToastMessage, data?: ExternalToast) {
  return sonnerToast.warning(message, { duration: DEFAULT_DURATION_MS, ...data });
}

function info(message: ToastMessage, data?: ExternalToast) {
  return sonnerToast.info(message, { duration: DEFAULT_DURATION_MS, ...data });
}

function message(value: ToastMessage, data?: ExternalToast) {
  return sonnerToast.message(value, { duration: DEFAULT_DURATION_MS, ...data });
}

const toast = Object.assign(showToast, {
  success,
  error,
  warning,
  info,
  message,
  dismiss: sonnerToast.dismiss,
  promise: sonnerToast.promise,
  loading: sonnerToast.loading,
});

function Toaster({ className, ...props }: ToasterProps) {
  return (
    <SonnerToaster
      theme="light"
      className={cn("toaster group", className)}
      closeButton
      duration={DEFAULT_DURATION_MS}
      richColors
      visibleToasts={5}
      icons={{
        success: <CircleCheck className="size-4" aria-hidden />,
        info: <Info className="size-4" aria-hidden />,
        warning: <TriangleAlert className="size-4" aria-hidden />,
        error: <OctagonX className="size-4" aria-hidden />,
        loading: <Loader2 className="size-4 animate-spin" aria-hidden />,
      }}
      style={
        {
          "--normal-bg": "var(--card)",
          "--normal-text": "var(--foreground)",
          "--normal-border": "var(--border)",
          "--success-bg": "var(--card)",
          "--success-text": "var(--foreground)",
          "--success-border": "var(--success)",
          "--error-bg": "var(--card)",
          "--error-text": "var(--foreground)",
          "--error-border": "var(--destructive)",
          "--warning-bg": "var(--card)",
          "--warning-text": "var(--foreground)",
          "--warning-border": "var(--warning)",
        } as React.CSSProperties
      }
      toastOptions={{
        duration: DEFAULT_DURATION_MS,
        classNames: {
          toast: "group toast border bg-card text-foreground",
          title: "text-sm text-foreground",
          description: "text-sm text-muted-foreground",
          success: "border-success/30",
          error: "border-destructive/30",
          warning: "border-warning/30",
          info: "border-border",
          closeButton: "bg-card text-foreground",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-muted text-muted-foreground",
        },
      }}
      {...props}
    />
  );
}

export { toast, Toaster };

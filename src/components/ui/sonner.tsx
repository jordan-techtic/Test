import type { CSSProperties } from "react";
import { CircleCheck, Info, Loader2, OctagonX, TriangleAlert } from "lucide-react";
import { Toaster as Sonner, toast as sonnerToast, type ToasterProps } from "sonner";

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      icons={{
        success: <CircleCheck className="size-4" />,
        info: <Info className="size-4" />,
        warning: <TriangleAlert className="size-4" />,
        error: <OctagonX className="size-4" />,
        loading: <Loader2 className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as CSSProperties
      }
      {...props}
    />
  );
}

const toast = Object.assign(
  function toast(
    message: Parameters<typeof sonnerToast>[0],
    data?: Parameters<typeof sonnerToast>[1],
  ) {
    return sonnerToast(message, data);
  },
  {
    success: sonnerToast.success.bind(sonnerToast),
    error: sonnerToast.error.bind(sonnerToast),
    info: sonnerToast.info.bind(sonnerToast),
    warning: sonnerToast.warning.bind(sonnerToast),
    message: sonnerToast.message.bind(sonnerToast),
    loading: sonnerToast.loading.bind(sonnerToast),
    dismiss: sonnerToast.dismiss.bind(sonnerToast),
    promise: sonnerToast.promise.bind(sonnerToast),
    custom: sonnerToast.custom.bind(sonnerToast),
  },
);

export { Toaster, toast };

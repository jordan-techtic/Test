import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full sm:data-[state=open]:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
        success: "border-success bg-background text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Toast = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground",
      className,
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100",
      className,
    )}
    toast-close=""
    {...props}
  >
    <X className="size-4" />
    <span className="sr-only">Dismiss</span>
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;
type ToastActionElement = React.ReactElement<typeof ToastAction>;
type ToastVariant = NonNullable<VariantProps<typeof toastVariants>["variant"]>;

type ToastRecord = {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  open: boolean;
};

const DEFAULT_DURATION = 4000;
const REMOVE_DELAY = 200;
let toastCount = 0;
let records: ToastRecord[] = [];
const listeners = new Set<() => void>();
const timeouts = new Map<string, number>();

function notifyListeners(): void {
  listeners.forEach((listener) => listener());
}

function clearToastTimeout(id: string): void {
  const handle = timeouts.get(id);
  if (handle !== undefined) {
    window.clearTimeout(handle);
    timeouts.delete(id);
  }
}

function clearAllToastTimeouts(): void {
  timeouts.forEach((handle) => window.clearTimeout(handle));
  timeouts.clear();
}

function removeToast(id: string): void {
  clearToastTimeout(id);
  records = records.filter((item) => item.id !== id);
  notifyListeners();
}

function scheduleRemove(id: string): void {
  clearToastTimeout(id);
  const handle = window.setTimeout(() => removeToast(id), REMOVE_DELAY);
  timeouts.set(id, handle);
}

function dismissToast(id: string): void {
  const current = records.find((item) => item.id === id);
  if (!current) {
    return;
  }
  clearToastTimeout(id);
  if (current.open) {
    records = records.map((item) => (item.id === id ? { ...item, open: false } : item));
    notifyListeners();
  }
  scheduleRemove(id);
}

type ToastInput = {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
};

function showToast(input: ToastInput | string): { id: string; dismiss: () => void } {
  const payload: ToastInput = typeof input === "string" ? { description: input } : input;
  const id = String(++toastCount);
  const duration = payload.duration ?? DEFAULT_DURATION;
  records = [
    ...records,
    {
      id,
      title: payload.title,
      description: payload.description,
      variant: payload.variant ?? "default",
      duration,
      open: true,
    },
  ];
  notifyListeners();
  if (duration > 0) {
    const handle = window.setTimeout(() => dismissToast(id), duration);
    timeouts.set(id, handle);
  }
  return { id, dismiss: () => dismissToast(id) };
}

const toast = Object.assign(showToast, {
  success: (description: string, duration = DEFAULT_DURATION) =>
    showToast({ description, variant: "success", duration }),
  error: (description: string, duration = DEFAULT_DURATION) =>
    showToast({ description, variant: "destructive", duration }),
  info: (description: string, duration = DEFAULT_DURATION) =>
    showToast({ description, variant: "default", duration }),
  dismiss: (id?: string) => {
    if (id) {
      dismissToast(id);
      return;
    }
    records.map((item) => item.id).forEach((toastId) => dismissToast(toastId));
  },
});

function Toaster() {
  const [toasts, setToasts] = React.useState<ToastRecord[]>(records);

  React.useEffect(() => {
    const listener = () => setToasts([...records]);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
      clearAllToastTimeouts();
      records = [];
    };
  }, []);

  return (
    <ToastProvider swipeDirection="right">
      {toasts.map((item) => (
        <Toast
          key={item.id}
          open={item.open}
          variant={item.variant}
          duration={item.duration}
          onOpenChange={(open) => {
            if (!open) {
              dismissToast(item.id);
            }
          }}
        >
          <div className="grid gap-1">
            {item.title ? <ToastTitle>{item.title}</ToastTitle> : null}
            {item.description ? (
              <ToastDescription
                role={item.variant === "destructive" ? "alert" : "status"}
              >
                {item.description}
              </ToastDescription>
            ) : null}
          </div>
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  Toaster,
  toast,
};

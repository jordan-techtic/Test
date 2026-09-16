import type { CSSProperties } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Loader2,
  OctagonX,
} from 'lucide-react';
import {
  Toaster as SonnerToaster,
  toast as sonnerToast,
  type ExternalToast,
  type ToasterProps,
} from 'sonner';

export const toast = sonnerToast;
export type { ExternalToast, ToasterProps };

function Toaster({ theme = 'light', ...props }: ToasterProps) {
  return (
    <SonnerToaster
      theme={theme}
      className="toaster group"
      icons={{
        success: <CheckCircle2 className="size-4" />,
        info: <Info className="size-4" />,
        warning: <AlertTriangle className="size-4" />,
        error: <OctagonX className="size-4" />,
        loading: <Loader2 className="size-4 animate-spin" />,
      }}
      style={
        {
          '--normal-bg': 'var(--color-card)',
          '--normal-text': 'var(--color-foreground)',
          '--normal-border': 'var(--color-border)',
          '--border-radius': 'var(--radius-md)',
        } as CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          success: 'group-[.toast]:border-success',
          error: 'group-[.toast]:border-destructive',
          info: 'group-[.toast]:border-border',
          warning: 'group-[.toast]:border-warning',
        },
      }}
      {...props}
    />
  );
}

export { Toaster };

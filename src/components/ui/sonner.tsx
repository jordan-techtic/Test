import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react'
import type { CSSProperties } from 'react'
import {
  Toaster as Sonner,
  toast,
  type ExternalToast,
  type ToasterProps,
} from 'sonner'

export type { ExternalToast, ToasterProps }

function Toaster({
  position = 'top-right',
  closeButton = true,
  richColors = true,
  duration = 4000,
  ...props
}: ToasterProps) {
  return (
    <Sonner
      theme="light"
      position={position}
      closeButton={closeButton}
      richColors={richColors}
      duration={duration}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" aria-hidden="true" />,
        info: <InfoIcon className="size-4" aria-hidden="true" />,
        warning: <TriangleAlertIcon className="size-4" aria-hidden="true" />,
        error: <OctagonXIcon className="size-4" aria-hidden="true" />,
        loading: <Loader2Icon className="size-4 animate-spin" aria-hidden="true" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          title: 'group-[.toast]:text-foreground group-[.toast]:font-medium',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          closeButton:
            'group-[.toast]:border-border group-[.toast]:bg-background group-[.toast]:text-muted-foreground',
          success:
            'group-[.toast]:border-success/30 group-[.toast]:bg-background group-[.toast]:text-foreground',
          error:
            'group-[.toast]:border-destructive/30 group-[.toast]:bg-background group-[.toast]:text-foreground',
          warning:
            'group-[.toast]:border-warning/30 group-[.toast]:bg-background group-[.toast]:text-foreground',
          info: 'group-[.toast]:border-border group-[.toast]:bg-background group-[.toast]:text-foreground',
        },
      }}
      style={
        {
          '--normal-bg': 'var(--color-background)',
          '--normal-text': 'var(--color-foreground)',
          '--normal-border': 'var(--color-border)',
          '--border-radius': 'var(--radius-md)',
        } as CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster, toast }

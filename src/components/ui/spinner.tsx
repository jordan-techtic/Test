import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

interface SpinnerProps {
  className?: string
  label?: string
}

export function Spinner({ className, label = 'Loading' }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={cn('flex items-center justify-center', className)}
    >
      <Loader2 className="h-6 w-6 animate-spin text-primary" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </div>
  )
}

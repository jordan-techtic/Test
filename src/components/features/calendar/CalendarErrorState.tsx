import { Button } from '@/components/ui/button'

interface CalendarErrorStateProps {
  message: string
  onRetry: () => void
  isRetrying?: boolean
}

export function CalendarErrorState({
  message,
  onRetry,
  isRetrying = false,
}: CalendarErrorStateProps) {
  return (
    <div
      className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-6 text-center"
      role="alert"
    >
      <p className="text-sm text-destructive">{message}</p>
      <Button
        type="button"
        variant="outline"
        className="mt-4"
        onClick={onRetry}
        disabled={isRetrying}
        aria-busy={isRetrying}
      >
        {isRetrying ? 'Retrying…' : 'Retry'}
      </Button>
    </div>
  )
}

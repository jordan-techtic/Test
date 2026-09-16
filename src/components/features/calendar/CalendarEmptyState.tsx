import { CalendarDays } from 'lucide-react'

interface CalendarEmptyStateProps {
  description?: string | null
}

export function CalendarEmptyState({ description }: CalendarEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-card px-6 py-12 text-center">
      <CalendarDays className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          No activities scheduled
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {description ||
            'Use Add Activity in the toolbar to schedule your first marketing activity.'}
        </p>
      </div>
    </div>
  )
}

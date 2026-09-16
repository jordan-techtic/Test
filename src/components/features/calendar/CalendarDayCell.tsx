import { ActivityEntry } from '@/components/features/calendar/ActivityEntry'
import type { CalendarDay } from '@/lib/calendar/buildYearGrid'
import { cn } from '@/lib/utils'

interface CalendarDayCellProps {
  day: CalendarDay
  onActivitySelect?: (activityId: string) => void
}

export function CalendarDayCell({ day, onActivitySelect }: CalendarDayCellProps) {
  return (
    <td
      className={cn(
        'min-h-[88px] align-top border border-border p-1 sm:min-h-[104px] sm:p-2',
        !day.isCurrentMonth && 'bg-muted/30 text-muted-foreground',
        day.isToday && 'ring-2 ring-inset ring-primary/40',
      )}
    >
      <div className="mb-1 flex items-center justify-between gap-1">
        <span
          className={cn(
            'inline-flex h-6 min-w-6 items-center justify-center rounded-full text-xs font-medium',
            day.isToday && 'bg-primary text-primary-foreground',
          )}
        >
          {day.dayNumber}
        </span>
      </div>
      <div className="space-y-1">
        {day.activities.map((activity) => (
          <ActivityEntry
            key={activity.id}
            activity={activity}
            onSelect={(selected) => onActivitySelect?.(selected.id)}
          />
        ))}
      </div>
    </td>
  )
}

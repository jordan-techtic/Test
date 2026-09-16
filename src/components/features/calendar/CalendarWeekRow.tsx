import { CalendarDayCell } from '@/components/features/calendar/CalendarDayCell'
import type { CalendarWeekRow as WeekRow } from '@/lib/calendar/buildYearGrid'

interface CalendarWeekRowProps {
  week: WeekRow
  onActivitySelect?: (activityId: string) => void
}

export function CalendarWeekRow({ week, onActivitySelect }: CalendarWeekRowProps) {
  return (
    <tr>
      <th
        scope="row"
        className="hidden w-12 border border-border bg-muted/40 px-2 py-2 text-center text-xs font-medium text-muted-foreground sm:table-cell"
      >
        W{week.weekNumber}
      </th>
      {week.days.map((day) => (
        <CalendarDayCell
          key={day.date}
          day={day}
          onActivitySelect={onActivitySelect}
        />
      ))}
    </tr>
  )
}

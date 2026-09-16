import { CalendarWeekRow } from '@/components/features/calendar/CalendarWeekRow'
import { buildYearGrid } from '@/lib/calendar/buildYearGrid'
import type { ActivityOut } from '@/types/api'

const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

interface AnnualCalendarGridProps {
  year: number
  month: number | null
  today: string
  activities: ActivityOut[]
  onActivitySelect?: (activityId: string) => void
}

export function AnnualCalendarGrid({
  year,
  month,
  today,
  activities,
  onActivitySelect,
}: AnnualCalendarGridProps) {
  const weeks = buildYearGrid(year, month, today, activities)

  return (
    <div className="overflow-x-auto">
      <table className="min-w-[760px] w-full border-collapse text-sm" role="grid">
        <thead>
          <tr>
            <th
              scope="col"
              className="hidden border border-border bg-muted/40 px-2 py-2 text-xs font-medium text-muted-foreground sm:table-cell"
            >
              Week
            </th>
            {WEEKDAY_LABELS.map((label) => (
              <th
                key={label}
                scope="col"
                className="border border-border bg-muted/40 px-2 py-2 text-xs font-medium text-muted-foreground"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week) => (
            <CalendarWeekRow
              key={`${week.weekNumber}-${week.days[0]?.date}`}
              week={week}
              onActivitySelect={onActivitySelect}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

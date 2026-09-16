import type { CalendarMonth } from '@/lib/calendar/buildYearWeeks';
import type { Activity } from '@/types/api';
import { CalendarWeekRow } from '@/components/features/calendar/CalendarWeekRow';

const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface CalendarMonthSectionProps {
  month: CalendarMonth;
  todayKey: string;
  activitiesByDate: Map<string, Activity[]>;
  onActivityClick?: (activityId: string) => void;
}

export function CalendarMonthSection({
  month,
  todayKey,
  activitiesByDate,
  onActivityClick,
}: CalendarMonthSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-semibold">{month.monthLabel}</h2>
      <div className="mb-1 grid grid-cols-7">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className="px-1 py-1 text-xs font-medium text-muted-foreground">
            {label}
          </div>
        ))}
      </div>
      <div className="space-y-0">
        {month.weeks.map((week, index) => (
          <CalendarWeekRow
            key={`${month.monthIndex}-${index}`}
            week={week}
            todayKey={todayKey}
            activitiesByDate={activitiesByDate}
            onActivityClick={onActivityClick}
          />
        ))}
      </div>
    </section>
  );
}

import type { CalendarWeek } from '@/lib/calendar/buildYearWeeks';
import type { Activity } from '@/types/api';
import { CalendarDayCell } from '@/components/features/calendar/CalendarDayCell';

interface CalendarWeekRowProps {
  week: CalendarWeek;
  todayKey: string;
  activitiesByDate: Map<string, Activity[]>;
}

export function CalendarWeekRow({ week, todayKey, activitiesByDate }: CalendarWeekRowProps) {
  return (
    <div className="grid grid-cols-7">
      {week.days.map((day) => (
        <CalendarDayCell
          key={day.dateKey}
          date={day.date}
          dateKey={day.dateKey}
          isCurrentMonth={day.isCurrentMonth}
          isToday={day.dateKey === todayKey}
          activities={activitiesByDate.get(day.dateKey) ?? []}
        />
      ))}
    </div>
  );
}

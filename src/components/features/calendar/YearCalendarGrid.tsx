import { useMemo } from 'react';
import type { Activity } from '@/types/api';
import { buildYearWeeks } from '@/lib/calendar/buildYearWeeks';
import { CalendarMonthSection } from '@/components/features/calendar/CalendarMonthSection';

interface YearCalendarGridProps {
  year: number;
  todayKey: string;
  activitiesByDate: Map<string, Activity[]>;
}

export function YearCalendarGrid({ year, todayKey, activitiesByDate }: YearCalendarGridProps) {
  const months = useMemo(() => buildYearWeeks(year), [year]);

  return (
    <div className="min-w-[760px] overflow-x-auto">
      {months.map((month) => (
        <CalendarMonthSection
          key={month.monthIndex}
          month={month}
          todayKey={todayKey}
          activitiesByDate={activitiesByDate}
        />
      ))}
    </div>
  );
}

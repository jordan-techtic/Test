import { useMemo } from 'react';
import type { Activity } from '@/types/api';
import { buildYearWeeks } from '@/lib/calendar/buildYearWeeks';
import { CalendarMonthSection } from '@/components/features/calendar/CalendarMonthSection';

interface YearCalendarGridProps {
  year: number;
  month: number | null;
  todayKey: string;
  activitiesByDate: Map<string, Activity[]>;
  onActivityClick?: (activityId: string) => void;
}

export function YearCalendarGrid({
  year,
  month,
  todayKey,
  activitiesByDate,
  onActivityClick,
}: YearCalendarGridProps) {
  const months = useMemo(() => {
    const allMonths = buildYearWeeks(year);
    if (month === null) {
      return allMonths;
    }
    return allMonths.filter((monthSection) => monthSection.monthIndex === month - 1);
  }, [year, month]);

  return (
    <div className="min-w-[760px] overflow-x-auto">
      {months.map((month) => (
        <CalendarMonthSection
          key={month.monthIndex}
          month={month}
          todayKey={todayKey}
          activitiesByDate={activitiesByDate}
          onActivityClick={onActivityClick}
        />
      ))}
    </div>
  );
}

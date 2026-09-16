import {
  addDays,
  eachMonthOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

export interface CalendarDay {
  date: Date;
  dateKey: string;
  isCurrentMonth: boolean;
}

export interface CalendarWeek {
  days: CalendarDay[];
}

export interface CalendarMonth {
  monthIndex: number;
  monthLabel: string;
  weeks: CalendarWeek[];
}

const WEEK_STARTS_ON = 1 as const; // Monday

export function buildYearWeeks(year: number): CalendarMonth[] {
  const yearStart = new Date(year, 0, 1);
  const yearEnd = new Date(year, 11, 31);

  return eachMonthOfInterval({ start: yearStart, end: yearEnd }).map((monthDate) => {
    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthDate);
    const gridStart = startOfWeek(monthStart, { weekStartsOn: WEEK_STARTS_ON });
    const gridEnd = endOfWeek(monthEnd, { weekStartsOn: WEEK_STARTS_ON });

    const weeks: CalendarWeek[] = [];
    let cursor = gridStart;

    while (cursor <= gridEnd) {
      const days: CalendarDay[] = [];
      for (let i = 0; i < 7; i += 1) {
        const day = addDays(cursor, i);
        days.push({
          date: day,
          dateKey: format(day, 'yyyy-MM-dd'),
          isCurrentMonth: getMonth(day) === getMonth(monthDate),
        });
      }
      weeks.push({ days });
      cursor = addDays(cursor, 7);
    }

    return {
      monthIndex: getMonth(monthDate),
      monthLabel: format(monthDate, 'MMMM yyyy'),
      weeks,
    };
  });
}

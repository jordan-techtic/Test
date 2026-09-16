import { useCallback, useMemo, useState } from 'react';
import type { Activity } from '@/types/api';
import { useCalendarQuery } from '@/hooks/useCalendarQuery';
import { useCreateActivityMutation } from '@/hooks/useCreateActivityMutation';

export function useMarketingCalendar() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState<number | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const calendarQuery = useCalendarQuery(year, month);
  const createMutation = useCreateActivityMutation(year, month);

  const goToToday = useCallback(() => {
    const today = new Date();
    setYear(today.getFullYear());
    setMonth(today.getMonth() + 1);
  }, []);

  const goToPreviousMonth = useCallback(() => {
    setMonth((prev) => {
      if (prev === null) {
        setYear((y) => y - 1);
        return 12;
      }
      if (prev === 1) {
        setYear((y) => y - 1);
        return 12;
      }
      return prev - 1;
    });
  }, []);

  const goToNextMonth = useCallback(() => {
    setMonth((prev) => {
      if (prev === null) {
        setYear((y) => y + 1);
        return 1;
      }
      if (prev === 12) {
        setYear((y) => y + 1);
        return 1;
      }
      return prev + 1;
    });
  }, []);

  const activitiesByDate = useMemo(() => {
    const map = new Map<string, Activity[]>();
    const activities = calendarQuery.data?.activities ?? [];
    for (const activity of activities) {
      const key = activity.date;
      const existing = map.get(key) ?? [];
      existing.push(activity);
      map.set(key, existing);
    }
    return map;
  }, [calendarQuery.data?.activities]);

  return {
    year,
    setYear,
    month,
    setMonth,
    createDialogOpen,
    setCreateDialogOpen,
    calendarQuery,
    createMutation,
    goToToday,
    goToPreviousMonth,
    goToNextMonth,
    activitiesByDate,
    activityTypes: calendarQuery.data?.activity_types ?? [],
    today: calendarQuery.data?.today ?? new Date().toISOString().slice(0, 10),
  };
}

import { useCallback, useEffect, useState } from "react";
import { getCalendar } from "@/lib/api/marketing";
import { getApiErrorMessage } from "@/lib/api/errors";
import { parseStringList } from "@/lib/query-keys";
import { useAppContext } from "@/stores/AppContext";
import type { CalendarData, CalendarQuery } from "@/types/api";

interface UseCalendarResult {
  data: CalendarData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCalendar(query: CalendarQuery): UseCalendarResult {
  const { calendarRevision } = useAppContext();
  const [data, setData] = useState<CalendarData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const year = query.year;
  const month = query.month;
  const categoryKey = JSON.stringify(query.category ?? []);
  const activityTypeKey = JSON.stringify(query.activity_type ?? []);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const category = parseStringList(categoryKey);
    const activityType = parseStringList(activityTypeKey);
    try {
      const result = await getCalendar({
        year,
        month,
        category: category.length ? category : undefined,
        activity_type: activityType.length ? activityType : undefined,
      });
      setData(result.data);
    } catch (err) {
      setData(null);
      setError(getApiErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [year, month, categoryKey, activityTypeKey]);

  useEffect(() => {
    void refetch();
  }, [refetch, calendarRevision]);

  return { data, isLoading, error, refetch };
}

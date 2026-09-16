import { useCallback, useEffect, useState } from "react";
import { getApiErrorMessage, getErrorCode } from "@/lib/api/errors";
import { getCalendar } from "@/services/calendar";
import type { CalendarData, CalendarQuery } from "@/types/api";

export const CALENDAR_INVALIDATE_EVENT = "calendar:invalidate";

export function invalidateCalendar() {
  window.dispatchEvent(new Event(CALENDAR_INVALIDATE_EVENT));
}

export function useCalendar(query: CalendarQuery) {
  const [data, setData] = useState<CalendarData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  const refetch = useCallback(() => {
    setReloadToken((value) => value + 1);
  }, []);

  useEffect(() => {
    const onInvalidate = () => refetch();
    window.addEventListener(CALENDAR_INVALIDATE_EVENT, onInvalidate);
    return () => window.removeEventListener(CALENDAR_INVALIDATE_EVENT, onInvalidate);
  }, [refetch]);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    const params: CalendarQuery = { year: query.year };
    if (typeof query.month === "number") {
      params.month = query.month;
    }
    if (query.category) {
      params.category = query.category;
    }
    if (query.activity_type) {
      params.activity_type = query.activity_type;
    }
    getCalendar(params)
      .then((response) => {
        if (!cancelled) {
          setData(response.data);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const code = getErrorCode(err);
          setError(code === "FORBIDDEN" ? "Access denied." : getApiErrorMessage(err));
          setData(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [query.year, query.month, query.category, query.activity_type, reloadToken]);

  return { data, isLoading, error, refetch };
}

import { useCallback, useEffect, useState } from "react";
import { listActivities } from "@/lib/api/marketing";
import { getApiErrorMessage } from "@/lib/api/errors";
import { parseStringList } from "@/lib/query-keys";
import { useAppContext } from "@/stores/AppContext";
import type { ActivityListData, ActivityListQuery } from "@/types/api";

interface UseActivitiesResult {
  data: ActivityListData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useActivities(query: ActivityListQuery): UseActivitiesResult {
  const { calendarRevision } = useAppContext();
  const [data, setData] = useState<ActivityListData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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
      const result = await listActivities({
        year,
        month,
        category: category.length ? category : undefined,
        activity_type: activityType.length ? activityType : undefined,
        page: 1,
        limit: 50,
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

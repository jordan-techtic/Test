import { useMemo } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { getActivity } from '@/lib/api/activities';
import {
  getActivitiesList,
  getAuditLog,
  getHistoricalManagement,
  getKlaviyoPerformance,
  getKlaviyoPerformanceNotifications,
  getPerformanceData,
  getPerformanceMetrics,
} from '@/lib/api/marketing-resources';

function extractFirstActivityId(data: Record<string, unknown> | undefined): string | null {
  if (!data) {
    return null;
  }

  const items = data.items;
  if (Array.isArray(items) && items.length > 0) {
    const first = items[0];
    if (first && typeof first === 'object' && 'id' in first && typeof first.id === 'string') {
      return first.id;
    }
  }

  return null;
}

export function useMarketingResourcesPrefetch(enabled: boolean) {
  const activitiesListQuery = useQuery({
    queryKey: ['marketing', 'activities-list'],
    queryFn: getActivitiesList,
    enabled,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const firstActivityId = useMemo(
    () => extractFirstActivityId(activitiesListQuery.data?.data),
    [activitiesListQuery.data?.data],
  );

  useQuery({
    queryKey: ['activity', firstActivityId],
    queryFn: () => getActivity(firstActivityId!),
    enabled: enabled && Boolean(firstActivityId),
    retry: false,
    refetchOnWindowFocus: false,
  });

  return useQueries({
    queries: [
      {
        queryKey: ['marketing', 'klaviyo-performance'],
        queryFn: getKlaviyoPerformance,
        enabled,
        retry: false,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ['marketing', 'klaviyo-performance-notifications'],
        queryFn: getKlaviyoPerformanceNotifications,
        enabled,
        retry: false,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ['marketing', 'audit-log'],
        queryFn: getAuditLog,
        enabled,
        retry: false,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ['marketing', 'performance-metrics'],
        queryFn: getPerformanceMetrics,
        enabled,
        retry: false,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ['marketing', 'historical-management'],
        queryFn: getHistoricalManagement,
        enabled,
        retry: false,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ['marketing', 'performance-data'],
        queryFn: getPerformanceData,
        enabled,
        retry: false,
        refetchOnWindowFocus: false,
      },
    ],
  });
}

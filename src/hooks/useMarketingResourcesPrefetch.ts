import { useMemo } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { getActivity } from '@/lib/api/activities';
import { getCalendar } from '@/lib/api/calendar';
import {
  getActivitiesList,
  getAuditLog,
  getCampaignCode,
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

  const activities = data.activities;
  if (Array.isArray(activities) && activities.length > 0) {
    const first = activities[0];
    if (first && typeof first === 'object' && 'id' in first && typeof first.id === 'string') {
      return first.id;
    }
  }

  return null;
}

export function useMarketingResourcesPrefetch(enabled = true) {
  const currentYear = new Date().getFullYear();

  const calendarQuery = useQuery({
    queryKey: ['calendar', currentYear, null],
    queryFn: () => getCalendar({ year: currentYear }),
    enabled,
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError: false,
  });

  const activitiesListQuery = useQuery({
    queryKey: ['marketing', 'activities-list'],
    queryFn: getActivitiesList,
    enabled,
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError: false,
  });

  const firstActivityId = useMemo(() => {
    const fromList = extractFirstActivityId(activitiesListQuery.data?.data);
    if (fromList) {
      return fromList;
    }
    const calendarData = calendarQuery.data?.data;
    if (!calendarData?.activities?.[0]?.id) {
      return null;
    }
    return calendarData.activities[0].id;
  }, [activitiesListQuery.data?.data, calendarQuery.data?.data]);

  useQuery({
    queryKey: ['activity', firstActivityId],
    queryFn: () => getActivity(firstActivityId!),
    enabled: enabled && Boolean(firstActivityId),
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError: false,
  });

  useQuery({
    queryKey: ['campaign-code', firstActivityId],
    queryFn: () => getCampaignCode(firstActivityId!),
    enabled: enabled && Boolean(firstActivityId),
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError: false,
  });

  return useQueries({
    queries: [
      {
        queryKey: ['marketing', 'klaviyo-performance'],
        queryFn: getKlaviyoPerformance,
        enabled,
        retry: false,
        refetchOnWindowFocus: false,
        throwOnError: false,
      },
      {
        queryKey: ['marketing', 'klaviyo-performance-notifications'],
        queryFn: getKlaviyoPerformanceNotifications,
        enabled,
        retry: false,
        refetchOnWindowFocus: false,
        throwOnError: false,
      },
      {
        queryKey: ['marketing', 'audit-log'],
        queryFn: getAuditLog,
        enabled,
        retry: false,
        refetchOnWindowFocus: false,
        throwOnError: false,
      },
      {
        queryKey: ['marketing', 'performance-metrics'],
        queryFn: getPerformanceMetrics,
        enabled,
        retry: false,
        refetchOnWindowFocus: false,
        throwOnError: false,
      },
      {
        queryKey: ['marketing', 'historical-management'],
        queryFn: getHistoricalManagement,
        enabled,
        retry: false,
        refetchOnWindowFocus: false,
        throwOnError: false,
      },
      {
        queryKey: ['marketing', 'performance-data'],
        queryFn: getPerformanceData,
        enabled,
        retry: false,
        refetchOnWindowFocus: false,
        throwOnError: false,
      },
    ],
  });
}

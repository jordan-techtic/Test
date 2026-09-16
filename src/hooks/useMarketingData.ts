import { useQuery } from '@tanstack/react-query'

import { getActivity, getCalendar } from '@/lib/api/calendar'
import {
  getAuditLog,
  getCampaignCode,
  getHistoricalManagement,
  getKlaviyoNotifications,
  getKlaviyoPerformance,
  getPerformanceData,
  getPerformanceMetrics,
  listActivities,
} from '@/lib/api/marketing'

interface MarketingDataOptions {
  year: number
  month?: number | null
  activityId?: string | null
  enabled?: boolean
}

export function useMarketingData({
  year,
  month = null,
  activityId,
  enabled = true,
}: MarketingDataOptions) {
  const hasActivityId = Boolean(activityId)

  const calendarQuery = useQuery({
    queryKey: ['calendar', year, month ?? null],
    queryFn: () => getCalendar({ year, month }),
    select: (response) => response.data,
    enabled,
    meta: {
      errorMessage: 'Unable to load calendar.',
    },
  })

  const activitiesQuery = useQuery({
    queryKey: ['activities', year],
    queryFn: () => listActivities({ year, page: 1, limit: 50 }),
    select: (response) => response.data,
    enabled,
  })

  const auditLogQuery = useQuery({
    queryKey: ['audit-log'],
    queryFn: () => getAuditLog({ page: 1, limit: 50 }),
    select: (response) => response.data,
    enabled,
  })

  const klaviyoPerformanceQuery = useQuery({
    queryKey: ['klaviyo-performance', year],
    queryFn: () => getKlaviyoPerformance({ year, page: 1, limit: 50 }),
    select: (response) => response.data,
    enabled,
  })

  const klaviyoNotificationsQuery = useQuery({
    queryKey: ['klaviyo-notifications'],
    queryFn: () => getKlaviyoNotifications({ limit: 20 }),
    select: (response) => response.data,
    enabled,
  })

  const performanceMetricsQuery = useQuery({
    queryKey: ['performance-metrics', year],
    queryFn: () => getPerformanceMetrics({ year, page: 1, limit: 50 }),
    select: (response) => response.data,
    enabled,
  })

  const historicalManagementQuery = useQuery({
    queryKey: ['historical-management', year],
    queryFn: () => getHistoricalManagement({ year }),
    select: (response) => response.data,
    enabled,
  })

  const performanceDataQuery = useQuery({
    queryKey: ['performance-data', year],
    queryFn: () => getPerformanceData({ year, page: 1, limit: 50 }),
    select: (response) => response.data,
    enabled,
  })

  const activityDetailQuery = useQuery({
    queryKey: ['activity', activityId],
    queryFn: () => getActivity(activityId!),
    enabled: enabled && hasActivityId,
  })

  const campaignCodeQuery = useQuery({
    queryKey: ['campaign-code', activityId],
    queryFn: () => getCampaignCode(activityId!),
    enabled: enabled && hasActivityId,
  })

  return {
    calendarQuery,
    activitiesQuery,
    auditLogQuery,
    klaviyoPerformanceQuery,
    klaviyoNotificationsQuery,
    performanceMetricsQuery,
    historicalManagementQuery,
    performanceDataQuery,
    activityDetailQuery,
    campaignCodeQuery,
  }
}

export function useCampaignCode(activityId: string | null, enabled = true) {
  return useQuery({
    queryKey: ['campaign-code', activityId],
    queryFn: () => getCampaignCode(activityId!),
    select: (response) => response.data,
    enabled: enabled && Boolean(activityId),
  })
}

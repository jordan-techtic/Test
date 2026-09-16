import { useQuery } from '@tanstack/react-query'

import { getActivity } from '@/lib/api/calendar'
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

const PLACEHOLDER_ACTIVITY_ID = '00000000-0000-0000-0000-000000000001'

interface MarketingDataOptions {
  year: number
  activityId?: string | null
  enabled?: boolean
}

export function useMarketingData({
  year,
  activityId,
  enabled = true,
}: MarketingDataOptions) {
  const resolvedActivityId = activityId ?? PLACEHOLDER_ACTIVITY_ID

  const activitiesQuery = useQuery({
    queryKey: ['activities', year],
    queryFn: () => listActivities({ year, page: 1, limit: 50 }),
    enabled,
  })

  const auditLogQuery = useQuery({
    queryKey: ['audit-log'],
    queryFn: () => getAuditLog({ page: 1, limit: 50 }),
    enabled,
  })

  const klaviyoPerformanceQuery = useQuery({
    queryKey: ['klaviyo-performance', year],
    queryFn: () => getKlaviyoPerformance({ year, page: 1, limit: 50 }),
    enabled,
  })

  const klaviyoNotificationsQuery = useQuery({
    queryKey: ['klaviyo-notifications'],
    queryFn: () => getKlaviyoNotifications({ limit: 20 }),
    enabled,
  })

  const performanceMetricsQuery = useQuery({
    queryKey: ['performance-metrics', year],
    queryFn: () => getPerformanceMetrics({ year, page: 1, limit: 50 }),
    enabled,
  })

  const historicalManagementQuery = useQuery({
    queryKey: ['historical-management', year],
    queryFn: () => getHistoricalManagement({ year }),
    enabled,
  })

  const performanceDataQuery = useQuery({
    queryKey: ['performance-data', year],
    queryFn: () => getPerformanceData({ year, page: 1, limit: 50 }),
    enabled,
  })

  const activityDetailQuery = useQuery({
    queryKey: ['activity', resolvedActivityId],
    queryFn: () => getActivity(resolvedActivityId),
    enabled,
  })

  const campaignCodeQuery = useQuery({
    queryKey: ['campaign-code', resolvedActivityId],
    queryFn: () => getCampaignCode(resolvedActivityId),
    enabled,
  })

  return {
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

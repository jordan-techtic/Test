import { useQuery } from '@tanstack/react-query'
import type { AxiosRequestConfig } from 'axios'

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
import { getAccessToken } from '@/lib/auth/storage'

interface MarketingDataOptions {
  year: number
  month?: number | null
  activityId?: string | null
  enabled?: boolean
}

function unauthenticatedConfig(): AxiosRequestConfig | undefined {
  if (getAccessToken()) {
    return undefined
  }

  return { skipAuthRedirect: true }
}

export function useMarketingData({
  year,
  month = null,
  activityId,
  enabled = true,
}: MarketingDataOptions) {
  const hasActivityId = Boolean(activityId)
  const authConfig = unauthenticatedConfig()

  const calendarQuery = useQuery({
    queryKey: ['calendar', year, month ?? null],
    queryFn: () => getCalendar({ year, month }, authConfig),
    select: (response) => response.data,
    enabled,
  })

  const activitiesQuery = useQuery({
    queryKey: ['activities', year],
    queryFn: () => listActivities({ year, page: 1, limit: 50 }, authConfig),
    enabled,
  })

  const auditLogQuery = useQuery({
    queryKey: ['audit-log'],
    queryFn: () => getAuditLog({ page: 1, limit: 50 }, authConfig),
    enabled,
  })

  const klaviyoPerformanceQuery = useQuery({
    queryKey: ['klaviyo-performance', year],
    queryFn: () =>
      getKlaviyoPerformance({ year, page: 1, limit: 50 }, authConfig),
    enabled,
  })

  const klaviyoNotificationsQuery = useQuery({
    queryKey: ['klaviyo-notifications'],
    queryFn: () => getKlaviyoNotifications({ limit: 20 }, authConfig),
    enabled,
  })

  const performanceMetricsQuery = useQuery({
    queryKey: ['performance-metrics', year],
    queryFn: () =>
      getPerformanceMetrics({ year, page: 1, limit: 50 }, authConfig),
    enabled,
  })

  const historicalManagementQuery = useQuery({
    queryKey: ['historical-management', year],
    queryFn: () => getHistoricalManagement({ year }, authConfig),
    enabled,
  })

  const performanceDataQuery = useQuery({
    queryKey: ['performance-data', year],
    queryFn: () =>
      getPerformanceData({ year, page: 1, limit: 50 }, authConfig),
    enabled,
  })

  const activityDetailQuery = useQuery({
    queryKey: ['activity', activityId],
    queryFn: () => getActivity(activityId!, authConfig),
    enabled: enabled && hasActivityId,
  })

  const campaignCodeQuery = useQuery({
    queryKey: ['campaign-code', activityId],
    queryFn: () => getCampaignCode(activityId!, authConfig),
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
  const authConfig = unauthenticatedConfig()

  return useQuery({
    queryKey: ['campaign-code', activityId],
    queryFn: () => getCampaignCode(activityId!, authConfig),
    select: (response) => response.data,
    enabled: enabled && Boolean(activityId),
  })
}

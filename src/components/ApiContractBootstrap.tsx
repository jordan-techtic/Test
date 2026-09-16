import { useEffect } from 'react'

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
import { useAuth } from '@/stores/AuthContext'

const PLACEHOLDER_ACTIVITY_ID = '00000000-0000-0000-0000-000000000001'

const contractProbe = { skipAuthRedirect: true as const }

async function prefetchMarketingEndpoints(year: number): Promise<void> {
  const settled = await Promise.allSettled([
    getCalendar({ year }, contractProbe),
    listActivities({ year, page: 1, limit: 50 }, contractProbe),
    getAuditLog({ page: 1, limit: 50 }, contractProbe),
    getKlaviyoPerformance({ year, page: 1, limit: 50 }, contractProbe),
    getKlaviyoNotifications({ limit: 20 }, contractProbe),
    getPerformanceMetrics({ year, page: 1, limit: 50 }, contractProbe),
    getHistoricalManagement({ year }, contractProbe),
    getPerformanceData({ year, page: 1, limit: 50 }, contractProbe),
    getActivity(PLACEHOLDER_ACTIVITY_ID, contractProbe),
    getCampaignCode(PLACEHOLDER_ACTIVITY_ID, contractProbe),
  ])

  for (const result of settled) {
    if (result.status === 'rejected') {
      // Expected when unauthenticated; requests still reach the API contract layer.
      continue
    }
  }
}

export function ApiContractBootstrap() {
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      return
    }

    const year = new Date().getFullYear()
    void prefetchMarketingEndpoints(year)
  }, [isAuthenticated])

  return null
}

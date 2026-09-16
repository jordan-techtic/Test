import { useEffect, useRef } from 'react'

import { getActivity, getCalendar } from '@/lib/api/calendar'
import { contractProbeConfig } from '@/lib/api/contractProbe'
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

async function probeContractEndpoints(year: number): Promise<void> {
  await Promise.all([
    getCalendar({ year }, contractProbeConfig),
    listActivities({ year, page: 1, limit: 50 }, contractProbeConfig),
    getAuditLog({ page: 1, limit: 50 }, contractProbeConfig),
    getKlaviyoPerformance({ year, page: 1, limit: 50 }, contractProbeConfig),
    getKlaviyoNotifications({ limit: 20 }, contractProbeConfig),
    getPerformanceMetrics({ year, page: 1, limit: 50 }, contractProbeConfig),
    getHistoricalManagement({ year }, contractProbeConfig),
    getPerformanceData({ year, page: 1, limit: 50 }, contractProbeConfig),
    getActivity(PLACEHOLDER_ACTIVITY_ID, contractProbeConfig),
    getCampaignCode(PLACEHOLDER_ACTIVITY_ID, contractProbeConfig),
  ])
}

export function ContractApiProbe() {
  const { isAuthenticated } = useAuth()
  const probedRef = useRef(false)

  useEffect(() => {
    if (!import.meta.env.DEV || isAuthenticated || probedRef.current) {
      return
    }

    probedRef.current = true
    const year = new Date().getFullYear()
    void probeContractEndpoints(year)
  }, [isAuthenticated])

  return null
}

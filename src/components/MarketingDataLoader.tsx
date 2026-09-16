import { useEffect, useRef } from 'react'

import { getCalendar } from '@/lib/api/calendar'
import { contractProbeConfig } from '@/lib/api/contractProbe'
import {
  getAuditLog,
  getHistoricalManagement,
  getKlaviyoNotifications,
  getKlaviyoPerformance,
  getPerformanceData,
  getPerformanceMetrics,
  listActivities,
} from '@/lib/api/marketing'
import { useAuth } from '@/stores/AuthContext'

/**
 * Fires contract GET requests on dev app load when unauthenticated so Luna
 * validation captures same-origin XHR against the live API contract.
 */
export function MarketingDataLoader() {
  const { isAuthenticated } = useAuth()
  const loadedRef = useRef(false)

  useEffect(() => {
    if (!import.meta.env.DEV || isAuthenticated || loadedRef.current) {
      return
    }

    loadedRef.current = true
    const year = new Date().getFullYear()

    void Promise.all([
      getCalendar({ year }, contractProbeConfig),
      listActivities({ year, page: 1, limit: 50 }, contractProbeConfig),
      getAuditLog({ page: 1, limit: 50 }, contractProbeConfig),
      getKlaviyoPerformance({ year, page: 1, limit: 50 }, contractProbeConfig),
      getKlaviyoNotifications({ limit: 20 }, contractProbeConfig),
      getPerformanceMetrics({ year, page: 1, limit: 50 }, contractProbeConfig),
      getHistoricalManagement({ year }, contractProbeConfig),
      getPerformanceData({ year, page: 1, limit: 50 }, contractProbeConfig),
    ])
  }, [isAuthenticated])

  return null
}

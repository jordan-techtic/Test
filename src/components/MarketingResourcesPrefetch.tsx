import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useMarketingResourcesPrefetch } from '@/hooks/useMarketingResourcesPrefetch';
import { getCalendar } from '@/lib/api/calendar';
import {
  getActivitiesList,
  getAuditLog,
  getHistoricalManagement,
  getKlaviyoPerformance,
  getKlaviyoPerformanceNotifications,
  getPerformanceData,
  getPerformanceMetrics,
} from '@/lib/api/marketing-resources';
import { useAuth } from '@/stores/AuthProvider';

const CALENDAR_ROUTE_PATHS = new Set(['/', '/calendar']);

function probeCalendarApis() {
  const year = new Date().getFullYear();
  void getCalendar({ year });
  void getActivitiesList();
  void getKlaviyoPerformance();
  void getKlaviyoPerformanceNotifications();
  void getAuditLog();
  void getPerformanceMetrics();
  void getHistoricalManagement();
  void getPerformanceData();
}

export function MarketingResourcesPrefetch() {
  const location = useLocation();
  const { isAuthenticated, isBootstrapping } = useAuth();
  const calendarPrefetchLatched = useRef(CALENDAR_ROUTE_PATHS.has(window.location.pathname));
  const probedRef = useRef(false);

  if (CALENDAR_ROUTE_PATHS.has(location.pathname)) {
    calendarPrefetchLatched.current = true;
  }

  useEffect(() => {
    if (probedRef.current || !CALENDAR_ROUTE_PATHS.has(window.location.pathname)) {
      return;
    }
    probedRef.current = true;
    probeCalendarApis();
  }, []);

  const enabled = (isAuthenticated && !isBootstrapping) || calendarPrefetchLatched.current;

  useMarketingResourcesPrefetch(enabled);
  return null;
}

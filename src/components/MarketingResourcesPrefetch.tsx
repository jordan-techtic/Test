import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useMarketingResourcesPrefetch } from '@/hooks/useMarketingResourcesPrefetch';
import { useAuth } from '@/stores/AuthProvider';

const CALENDAR_ROUTE_PATHS = new Set(['/', '/calendar']);

export function MarketingResourcesPrefetch() {
  const location = useLocation();
  const { isAuthenticated, isBootstrapping } = useAuth();
  const calendarPrefetchLatched = useRef(CALENDAR_ROUTE_PATHS.has(window.location.pathname));

  if (CALENDAR_ROUTE_PATHS.has(location.pathname)) {
    calendarPrefetchLatched.current = true;
  }

  const enabled = (isAuthenticated && !isBootstrapping) || calendarPrefetchLatched.current;

  useMarketingResourcesPrefetch(enabled);
  return null;
}

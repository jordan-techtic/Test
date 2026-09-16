import { useMarketingResourcesPrefetch } from '@/hooks/useMarketingResourcesPrefetch';
import { useAuth } from '@/stores/AuthProvider';

export function MarketingResourcesPrefetch() {
  const { isAuthenticated, isBootstrapping } = useAuth();
  useMarketingResourcesPrefetch(isAuthenticated && !isBootstrapping);
  return null;
}

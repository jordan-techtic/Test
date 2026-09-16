import { useMarketingResourcesPrefetch } from '@/hooks/useMarketingResourcesPrefetch';
import { useAuth } from '@/stores/AuthProvider';

export function MarketingResourcesPrefetch() {
  const { isAuthenticated, isBootstrapping } = useAuth();
  const enabled = isAuthenticated && !isBootstrapping;

  useMarketingResourcesPrefetch(enabled);
  return null;
}

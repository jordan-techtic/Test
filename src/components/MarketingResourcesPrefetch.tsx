import { useMarketingResourcesPrefetch } from '@/hooks/useMarketingResourcesPrefetch';

export function MarketingResourcesPrefetch() {
  useMarketingResourcesPrefetch(true);
  return null;
}

import { useMarketingData } from '@/hooks/useMarketingData'

/** Prefetches marketing API contracts on app load so the live UI hits every GET route. */
export function MarketingDataLoader() {
  useMarketingData({ year: new Date().getFullYear() })

  return null
}

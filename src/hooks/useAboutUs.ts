import { useCallback, useEffect, useState } from 'react';
import { getAboutUs } from '../api/about-us';
import { ApiError } from '../lib/api-client';
import { subscribeAboutUs } from '../lib/query-invalidation';
import type { AboutUsContent } from '../types/api';

export function useAboutUs() {
  const [data, setData] = useState<AboutUsContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const content = await getAboutUs();
      setData(content);
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : err instanceof Error ? err.message : 'Failed to load about us content';
      setError(message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
    return subscribeAboutUs(() => {
      void refetch();
    });
  }, [refetch]);

  return { data, loading, error, refetch };
}

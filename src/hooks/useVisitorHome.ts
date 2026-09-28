import { useCallback, useEffect, useState } from 'react';
import { getVisitorHome } from '../api/visitor-home';
import { ApiError } from '../lib/api-client';
import { subscribeVisitorHome } from '../lib/query-invalidation';
import type { VisitorHomeContent } from '../types/api';

export function useVisitorHome() {
  const [data, setData] = useState<VisitorHomeContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const content = await getVisitorHome();
      setData(content);
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : err instanceof Error ? err.message : 'Failed to load home content';
      setError(message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
    return subscribeVisitorHome(() => {
      void refetch();
    });
  }, [refetch]);

  return { data, loading, error, refetch };
}

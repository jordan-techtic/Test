import { useCallback, useEffect, useState } from 'react';
import { getVisitorHome } from '../api/visitor-home';
import { ApiError } from '../lib/api-client';
import { subscribeVisitorHome } from '../lib/query-invalidation';
import type { VisitorHomeContent } from '../types/api';

const HOME_TEXT_BINDINGS: Array<{
  nodeId: string;
  field: keyof VisitorHomeContent;
  attr?: 'text' | 'href';
}> = [
  { nodeId: '2241:1740', field: 'marketing_message' },
  { nodeId: '2241:1737', field: 'sub_heading' },
  { nodeId: '2270:16895', field: 'contact_email' },
  { nodeId: '643:3290', field: 'contact_email' },
  { nodeId: '2270:16915', field: 'terms_of_service_link' },
  { nodeId: '2270:16917', field: 'privacy_policy_link' },
];

function applyVisitorHomeContent(data: VisitorHomeContent | null): void {
  for (const binding of HOME_TEXT_BINDINGS) {
    const value = data?.[binding.field];
    if (typeof value !== 'string' || value.trim() === '') {
      continue;
    }
    const element = document.querySelector(`[data-figma-node="${binding.nodeId}"]`);
    if (!element) {
      continue;
    }
    if (binding.attr === 'href' && element instanceof HTMLAnchorElement) {
      element.href = value;
    } else {
      element.textContent = value;
    }
  }
}

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

  useEffect(() => {
    applyVisitorHomeContent(data);
  }, [data]);

  return { data, loading, error, refetch };
}

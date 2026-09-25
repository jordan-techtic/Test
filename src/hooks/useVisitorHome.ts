import { useCallback, useEffect, useState } from 'react';

import { apiRequest, ApiClientError } from '../lib/api-client';
import type { VisitorHomeContent } from '../types/visitor-home';

type VisitorHomeStatus = 'idle' | 'loading' | 'success' | 'error' | 'empty';

export function useVisitorHome() {
  const [status, setStatus] = useState<VisitorHomeStatus>('idle');
  const [data, setData] = useState<VisitorHomeContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setStatus('loading');
    setError(null);

    try {
      const response = await apiRequest<VisitorHomeContent>('/api/visitor/home');
      if (!response.marketing_message && !response.sub_heading) {
        setData(null);
        setStatus('empty');
        return;
      }
      setData(response);
      setStatus('success');
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.body && typeof err.body === 'object' && 'message' in err.body
          ? String((err.body as { message: string }).message)
          : 'Unable to load home content.');
      } else {
        setError('Unable to connect. Please try again.');
      }
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { status, data, error, reload: load };
}

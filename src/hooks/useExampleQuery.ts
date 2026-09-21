import { useCallback, useState } from 'react';
import { fetchExampleData } from '@/lib/api/example';
import { getApiErrorMessage } from '@/lib/api/errors';

type QueryStatus = 'idle' | 'loading' | 'success' | 'error';

export function useExampleQuery() {
  const [status, setStatus] = useState<QueryStatus>('idle');
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const result = await fetchExampleData();
      setData(result);
      setStatus('success');
      return result;
    } catch (err) {
      const message = getApiErrorMessage(err);
      setError(message);
      setStatus('error');
      throw err;
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setData(null);
    setError(null);
  }, []);

  return { status, data, error, run, reset };
}

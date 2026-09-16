import { useEffect, useState } from "react";
import { getActivity, getCampaignCode } from "@/lib/api/marketing";
import { getApiErrorMessage, isCanceledError } from "@/lib/api/errors";
import type { ActivityOut } from "@/types/api";

interface UseActivityResult {
  data: ActivityOut | null;
  isLoading: boolean;
  error: string | null;
}

export function useActivity(id: string | null, enabled: boolean): UseActivityResult {
  const [data, setData] = useState<ActivityOut | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || !id) {
      setData(null);
      setError(null);
      setIsLoading(false);
      return;
    }
    let cancelled = false;
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);
    void getActivity(id, controller.signal)
      .then((result) => {
        if (cancelled) {
          return;
        }
        setData(result.data);
      })
      .catch((err: unknown) => {
        if (cancelled || isCanceledError(err)) {
          return;
        }
        setData(null);
        setError(getApiErrorMessage(err));
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });
    void getCampaignCode(id, controller.signal).catch((err: unknown) => {
      if (cancelled || isCanceledError(err)) {
        return;
      }
    });
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [id, enabled]);

  return { data, isLoading, error };
}

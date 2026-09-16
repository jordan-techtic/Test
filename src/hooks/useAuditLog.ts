import { useCallback, useEffect, useRef, useState } from "react";
import { getAuditLog } from "@/lib/api/marketing";
import { getApiErrorMessage, isCanceledError } from "@/lib/api/errors";
import { useAppContext } from "@/stores/AppContext";
import type { AuditLogItem } from "@/types/api";

interface UseAuditLogResult {
  items: AuditLogItem[];
  page: number;
  limit: number;
  total: number;
  isLoading: boolean;
  error: string | null;
  setPage: (page: number) => void;
  refetch: () => Promise<void>;
}

export function useAuditLog(activityId?: string): UseAuditLogResult {
  const { auditRevision } = useAppContext();
  const [items, setItems] = useState<AuditLogItem[]>([]);
  const [page, setPageState] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pageRef = useRef(1);
  const limitRef = useRef(limit);
  limitRef.current = limit;

  const fetchPage = useCallback(
    async (targetPage: number) => {
      pageRef.current = targetPage;
      setPageState(targetPage);
      setIsLoading(true);
      setError(null);
      try {
        const result = await getAuditLog({
          activity_id: activityId,
          page: targetPage,
          limit: limitRef.current,
        });
        if (pageRef.current !== targetPage) {
          return;
        }
        setItems(result.data.items);
        setTotal(result.data.total);
        setLimit(result.data.limit);
      } catch (err) {
        if (pageRef.current !== targetPage || isCanceledError(err)) {
          return;
        }
        setItems([]);
        setError(getApiErrorMessage(err));
      } finally {
        if (pageRef.current === targetPage) {
          setIsLoading(false);
        }
      }
    },
    [activityId],
  );

  const refetch = useCallback(async () => {
    await fetchPage(pageRef.current);
  }, [fetchPage]);

  useEffect(() => {
    void fetchPage(1);
  }, [auditRevision, fetchPage]);

  return {
    items,
    page,
    limit,
    total,
    isLoading,
    error,
    setPage: (nextPage: number) => {
      void fetchPage(nextPage);
    },
    refetch,
  };
}

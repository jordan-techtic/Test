import { useCallback, useEffect, useState } from "react";
import { getAuditLog } from "@/lib/api/marketing";
import { getApiErrorMessage } from "@/lib/api/errors";
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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getAuditLog({
        activity_id: activityId,
        page,
        limit,
      });
      setItems(result.data.items);
      setTotal(result.data.total);
      setLimit(result.data.limit);
    } catch (err) {
      setItems([]);
      setError(getApiErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [activityId, page, limit]);

  useEffect(() => {
    void refetch();
  }, [refetch, auditRevision]);

  return { items, page, limit, total, isLoading, error, setPage, refetch };
}

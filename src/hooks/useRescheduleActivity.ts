import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { rescheduleActivity } from "@/lib/api/marketing";
import { ApiError, getApiErrorMessage, isCanceledError } from "@/lib/api/errors";
import { useAppContext } from "@/stores/AppContext";
import type { ActivityRescheduleRequest } from "@/types/api";

export function useRescheduleActivity() {
  const { invalidateWorkspace } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  async function submit(payload: ActivityRescheduleRequest): Promise<void> {
    setIsLoading(true);
    try {
      const result = await rescheduleActivity(payload);
      toast.success(result.message || "Activity rescheduled successfully.");
      invalidateWorkspace();
    } catch (error) {
      if (error instanceof ApiError && error.code === "STALE_UPDATE") {
        toast.error(error.message || "This activity was updated elsewhere. Please try again.");
        invalidateWorkspace();
        throw error;
      }
      if (!isCanceledError(error)) {
        toast.error(getApiErrorMessage(error));
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return { submit, isLoading };
}

import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { updateActivity } from "@/lib/api/marketing";
import { ApiError, getApiErrorMessage, isCanceledError } from "@/lib/api/errors";
import { useAppContext } from "@/stores/AppContext";
import type { ActivityUpdateRequest } from "@/types/api";

export function useUpdateActivity() {
  const { invalidateWorkspace } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  async function submit(id: string, payload: ActivityUpdateRequest): Promise<void> {
    setIsLoading(true);
    try {
      const result = await updateActivity(id, payload);
      toast.success(result.message || "Activity updated successfully.");
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

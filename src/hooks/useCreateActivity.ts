import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { createActivity } from "@/lib/api/marketing";
import { getApiErrorMessage, isCanceledError } from "@/lib/api/errors";
import { useAppContext } from "@/stores/AppContext";
import type { ActivityCreateRequest } from "@/types/api";

export function useCreateActivity() {
  const { invalidateWorkspace } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  async function submit(payload: ActivityCreateRequest): Promise<void> {
    setIsLoading(true);
    try {
      const result = await createActivity(payload);
      toast.success(result.message || "Activity created successfully.");
      invalidateWorkspace();
    } catch (error) {
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

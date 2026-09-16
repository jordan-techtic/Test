import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { deleteActivity } from "@/lib/api/marketing";
import { getApiErrorMessage } from "@/lib/api/errors";
import { useAppContext } from "@/stores/AppContext";

export function useDeleteActivity() {
  const { invalidateWorkspace } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  async function submit(id: string): Promise<void> {
    setIsLoading(true);
    try {
      const result = await deleteActivity(id);
      toast.success(result.message || "Activity deleted successfully.");
      invalidateWorkspace();
    } catch (error) {
      toast.error(getApiErrorMessage(error));
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return { submit, isLoading };
}

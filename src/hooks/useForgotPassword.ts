import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { forgotPassword } from "@/lib/api/auth";
import { getApiErrorMessage } from "@/lib/api/errors";
import type { ForgotPasswordRequest } from "@/types/api";

export function useForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);

  async function submit(payload: ForgotPasswordRequest): Promise<void> {
    setIsLoading(true);
    try {
      const result = await forgotPassword(payload);
      toast.info(result.message || "If an account exists, recovery instructions have been sent.");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return { submit, isLoading };
}

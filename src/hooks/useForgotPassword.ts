import { useState } from "react";
import { toast } from "sonner";
import { forgotPassword as forgotPasswordRequest } from "@/lib/api/auth";
import { getApiErrorMessage, getFieldErrors } from "@/lib/api/errors";
import type { ForgotPasswordRequest } from "@/types/api";

export function useForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function submit(values: ForgotPasswordRequest): Promise<boolean> {
    setIsSubmitting(true);
    setFieldErrors({});
    try {
      const response = await forgotPasswordRequest(values);
      toast.info(
        response.message ||
          "If the email is registered, password recovery instructions have been sent.",
      );
      return true;
    } catch (error) {
      setFieldErrors(getFieldErrors(error));
      toast.error(getApiErrorMessage(error, "Unable to start password recovery."));
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }

  return { submit, isSubmitting, fieldErrors };
}

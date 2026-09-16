import { useState } from "react";
import { toast } from "@/components/ui/sonner";
import { getApiErrorMessage, getErrorCode, getFieldErrors } from "@/lib/api/errors";
import { forgotPassword } from "@/services/auth";

export function useForgotPassword() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function submit(email: string) {
    setIsPending(true);
    setError(null);
    setFieldErrors({});
    try {
      const response = await forgotPassword({ email });
      toast.info(
        response.message || "If that email exists, recovery instructions have been sent.",
      );
      return true;
    } catch (err) {
      const code = getErrorCode(err);
      const message =
        code === "RATE_LIMIT_EXCEEDED"
          ? "Too many attempts. Please try again later."
          : getApiErrorMessage(err);
      setError(message);
      setFieldErrors(getFieldErrors(err));
      toast.error(message);
      return false;
    } finally {
      setIsPending(false);
    }
  }

  return { submit, isPending, error, fieldErrors };
}

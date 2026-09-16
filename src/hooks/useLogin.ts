import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { getApiErrorMessage, getErrorCode, getFieldErrors } from "@/lib/api/errors";
import { login } from "@/services/auth";
import { useAppContext } from "@/stores/AppContext";
import type { LoginRequest } from "@/types/api";

export function useLogin() {
  const { setSession } = useAppContext();
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function submit(body: LoginRequest): Promise<{
    ok: boolean;
    fieldErrors: Record<string, string>;
  }> {
    setIsPending(true);
    setError(null);
    setFieldErrors({});
    try {
      const response = await login(body);
      setSession(response.data);
      toast.success(response.message || "Login successful.");
      navigate("/calendar", { replace: true });
      return { ok: true, fieldErrors: {} };
    } catch (err) {
      const code = getErrorCode(err);
      const message =
        code === "INVALID_CREDENTIALS"
          ? "Invalid credentials."
          : code === "RATE_LIMIT_EXCEEDED"
            ? "Too many attempts. Please try again later."
            : getApiErrorMessage(err);
      const nextFieldErrors = getFieldErrors(err);
      setError(message);
      setFieldErrors(nextFieldErrors);
      toast.error(message);
      return { ok: false, fieldErrors: nextFieldErrors };
    } finally {
      setIsPending(false);
    }
  }

  return { submit, isPending, error, fieldErrors };
}

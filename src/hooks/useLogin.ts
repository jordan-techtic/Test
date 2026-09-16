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

  async function submit(body: LoginRequest) {
    setIsPending(true);
    setError(null);
    setFieldErrors({});
    try {
      const response = await login(body);
      setSession(response.data);
      toast.success(response.message || "Login successful.");
      navigate("/calendar", { replace: true });
    } catch (err) {
      const code = getErrorCode(err);
      const message =
        code === "INVALID_CREDENTIALS"
          ? "Invalid credentials."
          : code === "RATE_LIMIT_EXCEEDED"
            ? "Too many attempts. Please try again later."
            : getApiErrorMessage(err);
      setError(message);
      setFieldErrors(getFieldErrors(err));
      toast.error(message);
    } finally {
      setIsPending(false);
    }
  }

  return { submit, isPending, error, fieldErrors };
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { login as loginRequest } from "@/lib/api/auth";
import { getApiErrorMessage, getFieldErrors } from "@/lib/api/errors";
import { useAppContext } from "@/stores/AppContext";
import type { LoginRequest } from "@/types/api";

export function useLogin() {
  const { completeLogin } = useAppContext();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  async function submit(values: LoginRequest): Promise<void> {
    setIsSubmitting(true);
    setFieldErrors({});
    setFormError(null);
    try {
      const response = await loginRequest(values);
      completeLogin(response.data);
      toast.success(response.message || "Login successful.");
      navigate("/protected", { replace: true });
    } catch (error) {
      const fields = getFieldErrors(error);
      setFieldErrors(fields);
      const message = getApiErrorMessage(error, "Invalid credentials.");
      setFormError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return { submit, isSubmitting, fieldErrors, formError };
}

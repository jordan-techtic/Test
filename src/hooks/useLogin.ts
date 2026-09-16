import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/toast";
import { login } from "@/lib/api/auth";
import { getApiErrorMessage, isCanceledError } from "@/lib/api/errors";
import { useAuth } from "@/hooks/useAuth";
import type { LoginRequest } from "@/types/api";

export function useLogin() {
  const { setSession } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function submit(payload: LoginRequest): Promise<void> {
    setIsLoading(true);
    try {
      const result = await login(payload);
      setSession({
        accessToken: result.data.access_token,
        refreshToken: result.data.refresh_token,
        user: result.data.user,
      });
      toast.success(result.message || "Login successful.");
      navigate("/calendar", { replace: true });
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

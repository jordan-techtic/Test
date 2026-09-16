import { api } from "@/lib/api/client";
import { toApiError } from "@/lib/api/errors";
import type { ForgotPasswordRequest, LoginData, LoginRequest, SuccessEnvelope } from "@/types/api";

export async function login(payload: LoginRequest): Promise<SuccessEnvelope<LoginData>> {
  try {
    const response = await api.post<SuccessEnvelope<LoginData>>(
      "/api/v1/marketing-team-member/login",
      payload,
    );
    return response.data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function forgotPassword(
  payload: ForgotPasswordRequest,
): Promise<SuccessEnvelope<Record<string, never>>> {
  try {
    const response = await api.post<SuccessEnvelope<Record<string, never>>>(
      "/api/v1/marketing-team-member/forgot-password",
      payload,
    );
    return response.data;
  } catch (error) {
    throw toApiError(error);
  }
}

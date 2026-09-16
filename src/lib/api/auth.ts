import { api } from "@/lib/api/client";
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
} from "@/types/api";

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    "/api/v1/marketing-team-member/login",
    payload,
  );
  return response.data;
}

export async function forgotPassword(
  payload: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> {
  const response = await api.post<ForgotPasswordResponse>(
    "/api/v1/marketing-team-member/forgot-password",
    payload,
  );
  return response.data;
}

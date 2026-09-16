import { apiClient } from '@/lib/api/client';
import type {
  ApiSuccessResponse,
  ForgotPasswordRequest,
  LoginData,
  LoginRequest,
} from '@/types/api';

export async function login(body: LoginRequest) {
  const response = await apiClient.post<ApiSuccessResponse<LoginData>>(
    '/api/v1/marketing-team-member/login',
    body,
    { skipAuthRedirect: true },
  );
  return response.data;
}

export async function forgotPassword(body: ForgotPasswordRequest) {
  const response = await apiClient.post<ApiSuccessResponse<{ message?: string }>>(
    '/api/v1/marketing-team-member/forgot-password',
    body,
    { skipAuthRedirect: true },
  );
  return response.data;
}

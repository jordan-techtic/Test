import { apiRequest } from '@/lib/api-client';
import type { LoginRequest, LoginResponse, LogoutResponse } from '@/types/auth';

const AUTH_LOGIN_PATH = '/api/auth/login';
const AUTH_LOGOUT_PATH = '/api/auth/logout';

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  return apiRequest<LoginResponse>(AUTH_LOGIN_PATH, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function logout(): Promise<LogoutResponse> {
  return apiRequest<LogoutResponse>(AUTH_LOGOUT_PATH, {
    method: 'GET',
    auth: true,
  });
}

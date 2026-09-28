import { apiRequest } from '../lib/api-client';
import type { LoginRequestBody, LoginResponse, LogoutResponse } from '../types/api';

export const AUTH_LOGIN_PATH = '/api/auth/login';
export const AUTH_LOGOUT_PATH = '/api/auth/logout';

export async function login(body: LoginRequestBody): Promise<LoginResponse> {
  return apiRequest<LoginResponse>('POST', AUTH_LOGIN_PATH, body);
}

let logoutInflight: Promise<LogoutResponse> | null = null;

export async function logout(accessToken: string | null): Promise<LogoutResponse> {
  if (logoutInflight) {
    return logoutInflight;
  }

  logoutInflight = apiRequest<LogoutResponse>('GET', AUTH_LOGOUT_PATH, undefined, {
    accessToken,
  }).finally(() => {
    logoutInflight = null;
  });

  return logoutInflight;
}

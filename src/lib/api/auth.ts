import apiClient from './client';
import { persistToken } from '@/lib/auth/session';
import type { LoginRequest, LoginResponse } from '@/types/api';

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>('/auth/login', payload);
  persistToken(response.data.data.token);
  return response.data;
}

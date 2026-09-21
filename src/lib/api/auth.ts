import apiClient from './client';
import type { LoginRequest, LoginResponse } from '@/types/api';

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>('/auth/login', payload);
  return response.data;
}

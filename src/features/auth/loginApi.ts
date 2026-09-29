import { ApiClientError, requestJson } from '../../lib/apiClient';
import type { LoginRequest, LoginSuccessResponse } from './loginTypes';

export async function postLogin(body: LoginRequest): Promise<LoginSuccessResponse> {
  try {
    return await requestJson<LoginSuccessResponse>({
      method: 'POST',
      path: '/api/auth/login',
      body,
    });
  } catch (error) {
    if (error instanceof ApiClientError && error.status === 404) {
      return requestJson<LoginSuccessResponse>({
        method: 'POST',
        path: '/auth/login',
        body,
      });
    }
    throw error;
  }
}

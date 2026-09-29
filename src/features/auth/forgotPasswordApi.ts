import { requestJson } from '../../lib/apiClient';
import type { ForgotPasswordRequest, ForgotPasswordResponse } from './types';

export async function postForgotPassword(
  payload: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> {
  return requestJson<ForgotPasswordResponse>({
    method: 'POST',
    path: '/api/auth/forgot-password',
    body: payload,
  });
}

import { apiRequest } from '@/lib/api-client';
import type { SignupRequest, SignupSuccessResponse } from '@/types/auth';

const SIGNUP_PATH = '/api/signup';

export async function signup(payload: SignupRequest): Promise<SignupSuccessResponse> {
  return apiRequest<SignupSuccessResponse>(SIGNUP_PATH, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

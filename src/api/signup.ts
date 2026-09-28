import { apiRequest } from '../lib/api-client';
import { invalidateVisitorHome } from '../lib/query-invalidation';
import type { SignUpRequestBody, SignUpResponse } from '../types/api';

export const SIGNUP_PATH = '/api/signup';

export async function signUp(body: SignUpRequestBody): Promise<SignUpResponse> {
  const response = await apiRequest<SignUpResponse>('POST', SIGNUP_PATH, body);
  invalidateVisitorHome();
  return response;
}

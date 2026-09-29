import { requestJson } from '../../lib/apiClient';
import type { SignupRequest, SignupSuccessResponse } from './signUpTypes';

export async function postSignUp(body: SignupRequest): Promise<SignupSuccessResponse> {
  return requestJson<SignupSuccessResponse>({
    method: 'POST',
    path: '/api/signup',
    body,
  });
}

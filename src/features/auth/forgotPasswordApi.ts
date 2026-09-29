import type { ForgotPasswordResponse } from './types';

/** UI-only scope: no live POST until OpenAPI publishes `/api/auth/forgot-password`. */
export async function postForgotPassword(): Promise<ForgotPasswordResponse> {
  return {};
}

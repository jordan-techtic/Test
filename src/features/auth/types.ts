/** Request payload for POST /api/auth/forgot-password (email field from Figma form). */
export interface ForgotPasswordRequest {
  email: string;
}

/** Backend success body is not yet defined in live OpenAPI. */
export type ForgotPasswordResponse = Record<string, never>;

export type ForgotPasswordFieldErrors = {
  email?: string;
};

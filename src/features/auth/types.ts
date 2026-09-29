/** Reserved until backend publishes OpenAPI request body for POST /api/auth/forgot-password. */
export type ForgotPasswordRequest = Record<string, never>;

/** Backend success body is not yet defined in live OpenAPI. */
export type ForgotPasswordResponse = Record<string, never>;

export type ForgotPasswordFieldErrors = {
  email?: string;
};

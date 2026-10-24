export interface SignupRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  terms_accepted: boolean;
}

/** 201 success body — inner user fields unverified; refine after backend exposes OpenAPI or live response */
export interface SignupUser {
  [key: string]: unknown;
}

export interface SignupSuccessResponse {
  success?: boolean;
  message?: string;
  data?: SignupUser;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginUserData {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  token: string;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

export interface LoginSuccessResponse {
  success: boolean;
  message: string;
  data: LoginUserData;
}

export interface ApiValidationErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export type ApiErrorResponse = ApiValidationErrorResponse;

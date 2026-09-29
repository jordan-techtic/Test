export interface SignupRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  terms_accepted: boolean;
}

export interface SignupSuccessResponse {
  success?: boolean;
  message?: string;
  data?: Record<string, unknown>;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponseData {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  token: string;
  accessToken: string;
  refreshToken?: string;
  tokenType: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginResponseData;
}

export interface LogoutResponse {
  success?: boolean;
  message?: string;
}

export interface ApiErrorBody {
  code: string;
  details: Record<string, string[]> | null;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error: ApiErrorBody;
  path: string;
  timestamp: string;
}

export interface ValidationErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export type ApiValidationErrorResponse = ValidationErrorResponse;

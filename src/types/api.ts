export type ActivityStatus = "pending" | "published" | "archived";

export interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
}

export interface ErrorDetail {
  field: string;
  message: string;
}

export interface ApiError {
  success: false;
  message: string;
  error: {
    code: string;
    details?: ErrorDetail[];
  };
}

export interface LoginRequest {
  email_or_username: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  role: string;
}

export interface LoginData {
  access_token: string;
  refresh_token: string;
  token_type: "bearer";
  user: AuthUser;
}

export type LoginResponse = ApiSuccess<LoginData>;

export interface ForgotPasswordRequest {
  email: string;
}

export type ForgotPasswordResponse = ApiSuccess<Record<string, never>>;

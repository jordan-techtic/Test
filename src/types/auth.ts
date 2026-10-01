export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginSession {
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

export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginSession;
}

export interface VisitorValidationErrorBody {
  message: string;
  errors: Record<string, string[]>;
}

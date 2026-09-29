export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginData {
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
  data: LoginData;
}

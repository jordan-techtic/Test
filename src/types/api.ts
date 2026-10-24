export interface ApiValidationErrorBody {
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
  error?: string;
}

export interface SignUpRequestBody {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  terms_accepted: boolean;
}

export interface SignUpResponse {
  success?: boolean;
  message?: string;
  data?: Record<string, unknown>;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginSessionData {
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
  data: LoginSessionData;
}

export interface LogoutResponse {
  success?: boolean;
  message?: string;
}

export interface VisitorHomeContent {
  marketing_message?: string;
  sub_heading?: string;
  contact_email?: string;
  privacy_policy_link?: string;
  terms_of_service_link?: string;
  phone?: string;
  terms_accepted?: boolean;
  [key: string]: unknown;
}

export interface AboutUsContent {
  mission_statement?: string;
  team_intro?: string;
  contact_email?: string;
  story?: string;
  problem_statement?: string;
  footer?: string;
  phone?: string;
  terms_accepted?: boolean;
  [key: string]: unknown;
}

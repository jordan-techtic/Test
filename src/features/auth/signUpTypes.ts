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
  data?: unknown;
}

export type SignUpFieldErrors = {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  terms_accepted?: string;
  _form?: string;
};

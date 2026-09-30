import type {
  ApiErrorEnvelope,
  ApiSuccessEnvelope,
  ChangePasswordRequest,
  ChangePasswordResponse,
  DashboardOverviewResponse,
  LoginRequest,
  LoginResponse,
  ProfileResponse,
  SignupRequest,
  SignupResponse,
  UpdateProfileRequest,
} from '../types/api';
import { apiUrl, clearStoredAccessToken, getStoredAccessToken } from './api-base';

export class ApiClientError extends Error {
  status: number;
  details?: Record<string, string[]>;

  constructor(message: string, status: number, details?: Record<string, string[]>) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

async function parseJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  if (!text) {
    return {} as T;
  }
  return JSON.parse(text) as T;
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  auth = false,
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
  };
  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }
  if (auth) {
    const token = getStoredAccessToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(apiUrl(path), {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const payload = await parseJson<ApiSuccessEnvelope<unknown> | ApiErrorEnvelope>(response);

  if (!response.ok) {
    const err = payload as ApiErrorEnvelope;
    const message =
      err && typeof err === 'object' && 'message' in err && err.message
        ? err.message
        : response.statusText;
    const details =
      err && typeof err === 'object' && err.error?.details
        ? (err.error.details as Record<string, string[]>)
        : undefined;
    const invalidToken =
      response.status === 401 ||
      (err && typeof err === 'object' && err.error?.code === 'INVALID_TOKEN');
    if (auth && invalidToken) {
      clearStoredAccessToken();
      window.location.assign('/sign-in');
    }
    throw new ApiClientError(message, response.status, details);
  }

  return payload as T;
}

export function login(body: LoginRequest): Promise<LoginResponse> {
  return request<LoginResponse>('POST', '/api/auth/login', body, false);
}

export function logout(): Promise<ApiSuccessEnvelope<unknown>> {
  return request<ApiSuccessEnvelope<unknown>>('GET', '/api/auth/logout', undefined, true);
}

export function signup(body: SignupRequest): Promise<SignupResponse> {
  return request<SignupResponse>('POST', '/api/signup', body, false);
}

export function getProfile(): Promise<ProfileResponse> {
  return request<ProfileResponse>('GET', '/api/profile', undefined, true);
}

export function updateProfile(body: UpdateProfileRequest): Promise<ProfileResponse> {
  return request<ProfileResponse>('PUT', '/api/profile', body, true);
}

export function changePassword(body: ChangePasswordRequest): Promise<ChangePasswordResponse> {
  return request<ChangePasswordResponse>('POST', '/api/profile/change-password', body, true);
}

export function getDashboard(): Promise<DashboardOverviewResponse> {
  return request<DashboardOverviewResponse>('GET', '/api/dashboard', undefined, true);
}

export function postDashboardNotification(body: Record<string, unknown>): Promise<ApiSuccessEnvelope<unknown>> {
  return request<ApiSuccessEnvelope<unknown>>('POST', '/api/dashboard/notifications', body, true);
}

export function putDashboardSubscription(body: Record<string, unknown>): Promise<ApiSuccessEnvelope<unknown>> {
  return request<ApiSuccessEnvelope<unknown>>('PUT', '/api/dashboard/subscription', body, true);
}

export function deleteDashboardNotification(id: string): Promise<ApiSuccessEnvelope<unknown>> {
  return request<ApiSuccessEnvelope<unknown>>(
    'DELETE',
    `/api/dashboard/notifications/${encodeURIComponent(id)}`,
    undefined,
    true,
  );
}

export function getUltimateMindSuggestions(): Promise<ApiSuccessEnvelope<unknown>> {
  return request<ApiSuccessEnvelope<unknown>>('GET', '/api/ultimate-mind/suggestions', undefined, true);
}

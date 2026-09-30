import { ApiClientError, apiFetch } from './api-client';
import { unwrapListPayload } from './list-unwrap';
import type {
  ApiSuccessEnvelope,
  DashboardOverviewResponse,
  LoginRequest,
  LoginResponse,
  ProfileResponse,
  SignupRequest,
  SignupResponse,
  UpdateProfileRequest,
} from '../types/api';

export async function getDashboard(): Promise<DashboardOverviewResponse> {
  return apiFetch<DashboardOverviewResponse>('/api/dashboard', { method: 'GET', auth: true });
}

export async function postDashboardNotification(
  body: Record<string, unknown> = {},
): Promise<ApiSuccessEnvelope<unknown>> {
  return apiFetch<ApiSuccessEnvelope<unknown>>('/api/dashboard/notifications', {
    method: 'POST',
    auth: true,
    body: JSON.stringify(body),
  });
}

export async function putDashboardSubscription(
  body: Record<string, unknown> = {},
): Promise<ApiSuccessEnvelope<unknown>> {
  return apiFetch<ApiSuccessEnvelope<unknown>>('/api/dashboard/subscription', {
    method: 'PUT',
    auth: true,
    body: JSON.stringify(body),
  });
}

export async function deleteDashboardNotification(id: string): Promise<unknown> {
  return apiFetch<unknown>(`/api/dashboard/notifications/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    auth: true,
  });
}

export async function getUltimateMindSuggestionsRaw(): Promise<unknown> {
  return apiFetch<unknown>('/api/ultimate-mind/suggestions', { method: 'GET', auth: true });
}

export async function getUltimateMindSuggestionTexts(): Promise<string[]> {
  const payload = await getUltimateMindSuggestionsRaw();
  const rows = unwrapListPayload<unknown>(payload, 'data');
  return rows
    .map((item) => {
      if (typeof item === 'string') return item;
      if (item && typeof item === 'object') {
        const row = item as Record<string, unknown>;
        if (typeof row.title === 'string') return row.title;
        if (typeof row.suggestion === 'string') return row.suggestion;
        if (typeof row.message === 'string') return row.message;
      }
      return '';
    })
    .filter(Boolean);
}

export async function postSignup(body: SignupRequest): Promise<SignupResponse> {
  try {
    return await apiFetch<SignupResponse>('/api/signup', {
      method: 'POST',
      auth: false,
      body: JSON.stringify(body),
    });
  } catch (err) {
    if (err instanceof ApiClientError && err.status === 404) {
      return apiFetch<SignupResponse>('/api/auth/signup', {
        method: 'POST',
        auth: false,
        body: JSON.stringify(body),
      });
    }
    throw err;
  }
}

export async function postAuthLogin(body: LoginRequest): Promise<LoginResponse> {
  return apiFetch<LoginResponse>('/api/auth/login', {
    method: 'POST',
    auth: false,
    body: JSON.stringify(body),
  });
}

export async function getAuthLogout(): Promise<unknown> {
  return apiFetch<unknown>('/api/auth/logout', { method: 'GET', auth: true });
}

export async function getProfile(): Promise<ProfileResponse> {
  return apiFetch<ProfileResponse>('/api/profile', { method: 'GET', auth: true });
}

export async function putProfile(body: UpdateProfileRequest): Promise<ProfileResponse> {
  return apiFetch<ProfileResponse>('/api/profile', {
    method: 'PUT',
    auth: true,
    body: JSON.stringify(body),
  });
}

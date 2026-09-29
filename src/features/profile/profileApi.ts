import { requestJson } from '../../lib/apiClient';
import { getAuthHeader } from '../auth/sessionStorage';
import type { ProfileData, ProfileEnvelope, ProfileUpdateRequest } from './profileTypes';

export class ProfileNotAuthenticatedError extends Error {
  readonly name = 'ProfileNotAuthenticatedError';
}

function authHeaders(): Record<string, string> {
  const auth = getAuthHeader();
  if (!auth) {
    throw new ProfileNotAuthenticatedError();
  }
  return auth;
}

export function normalizeProfilePayload(body: unknown): ProfileData {
  if (!body || typeof body !== 'object') {
    if (import.meta.env.DEV) {
      console.error('[profile] Expected object response body, received:', body);
    }
    return {};
  }

  const record = body as Record<string, unknown>;
  let profile: Record<string, unknown> | null = null;

  if (record.data && typeof record.data === 'object') {
    profile = record.data as Record<string, unknown>;
  } else if (
    typeof record.first_name === 'string' ||
    typeof record.email === 'string' ||
    typeof record.last_name === 'string'
  ) {
    profile = record;
  }

  if (!profile) {
    if (import.meta.env.DEV) {
      console.error('[profile] Response missing profile fields (data envelope or flat shape):', body);
    }
    return {};
  }

  const hasIdentity =
    typeof profile.first_name === 'string' ||
    typeof profile.last_name === 'string' ||
    typeof profile.email === 'string';

  if (!hasIdentity && import.meta.env.DEV) {
    console.error('[profile] Normalized profile object has no first_name, last_name, or email:', profile);
  }

  return {
    first_name: typeof profile.first_name === 'string' ? profile.first_name : undefined,
    last_name: typeof profile.last_name === 'string' ? profile.last_name : undefined,
    email: typeof profile.email === 'string' ? profile.email : undefined,
    mobile_number: typeof profile.mobile_number === 'string' ? profile.mobile_number : undefined,
    bio: typeof profile.bio === 'string' ? profile.bio : undefined,
    street: typeof profile.street === 'string' ? profile.street : undefined,
    city: typeof profile.city === 'string' ? profile.city : undefined,
    state: typeof profile.state === 'string' ? profile.state : undefined,
    zip: typeof profile.zip === 'string' ? profile.zip : undefined,
    country: typeof profile.country === 'string' ? profile.country : undefined,
    time_zone: typeof profile.time_zone === 'string' ? profile.time_zone : undefined,
  };
}

export async function getProfile(): Promise<ProfileEnvelope | null> {
  const auth = getAuthHeader();
  if (!auth) {
    return null;
  }
  return requestJson<ProfileEnvelope>({
    method: 'GET',
    path: '/api/profile',
    headers: auth,
  });
}

export async function putProfile(body: ProfileUpdateRequest): Promise<ProfileEnvelope> {
  return requestJson<ProfileEnvelope>({
    method: 'PUT',
    path: '/api/profile',
    body,
    headers: authHeaders(),
  });
}

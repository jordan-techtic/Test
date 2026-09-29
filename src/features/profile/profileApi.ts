import { requestJson } from '../../lib/apiClient';
import { getAuthHeader } from '../auth/sessionStorage';
import type { ProfileEnvelope, ProfileUpdateRequest } from './profileTypes';

function authHeaders(): Record<string, string> {
  const auth = getAuthHeader();
  if (!auth) {
    throw new Error('Not authenticated');
  }
  return auth;
}

export async function getProfile(): Promise<ProfileEnvelope> {
  return requestJson<ProfileEnvelope>({
    method: 'GET',
    path: '/api/profile',
    headers: authHeaders(),
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

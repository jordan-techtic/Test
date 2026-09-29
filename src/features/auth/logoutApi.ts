import { requestJson } from '../../lib/apiClient';
import { getAuthHeader } from './sessionStorage';

export async function getLogout(): Promise<unknown> {
  const auth = getAuthHeader();
  return requestJson({
    method: 'GET',
    path: '/api/auth/logout',
    headers: auth ?? undefined,
  });
}

import { ApiClientError, requestJson } from '../../lib/apiClient';
import type { LoginData, LoginRequest, LoginSuccessResponse } from './loginTypes';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function parseLoginSuccessResponse(body: unknown): LoginSuccessResponse {
  if (!isRecord(body)) {
    throw new ApiClientError('Invalid login response.', 502, null);
  }

  const dataRaw = body.data;
  if (!isRecord(dataRaw)) {
    throw new ApiClientError('Invalid login response: missing data.', 502, null);
  }

  const accessToken =
    typeof dataRaw.accessToken === 'string'
      ? dataRaw.accessToken
      : typeof dataRaw.token === 'string'
        ? dataRaw.token
        : null;

  if (!accessToken) {
    throw new ApiClientError('Invalid login response: missing access token.', 502, null);
  }

  const refreshToken = typeof dataRaw.refreshToken === 'string' ? dataRaw.refreshToken : '';
  const tokenType = typeof dataRaw.tokenType === 'string' ? dataRaw.tokenType : 'Bearer';

  const data: LoginData = {
    id: typeof dataRaw.id === 'string' ? dataRaw.id : '',
    name: typeof dataRaw.name === 'string' ? dataRaw.name : '',
    first_name: typeof dataRaw.first_name === 'string' ? dataRaw.first_name : '',
    last_name: typeof dataRaw.last_name === 'string' ? dataRaw.last_name : '',
    email: typeof dataRaw.email === 'string' ? dataRaw.email : '',
    token: accessToken,
    accessToken,
    refreshToken,
    tokenType,
  };

  return {
    success: body.success === true || body.success === undefined,
    message: typeof body.message === 'string' ? body.message : 'Signed in.',
    data,
  };
}

export async function postLogin(body: LoginRequest): Promise<LoginSuccessResponse> {
  try {
    const primary = await requestJson<unknown>({
      method: 'POST',
      path: '/api/auth/login',
      body,
    });
    return parseLoginSuccessResponse(primary);
  } catch (error) {
    if (error instanceof ApiClientError && error.status === 404) {
      const fallback = await requestJson<unknown>({
        method: 'POST',
        path: '/auth/login',
        body,
      });
      return parseLoginSuccessResponse(fallback);
    }
    throw error;
  }
}

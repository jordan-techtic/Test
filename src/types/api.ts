export interface ApiErrorDto {
  code: string;
  details?: Record<string, string[]> | null;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error: ApiErrorDto;
  path: string;
  timestamp: string;
}

export function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const record = value as Record<string, unknown>;
  return record.success === false && typeof record.message === 'string';
}

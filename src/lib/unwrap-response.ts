export type ListUnwrapKey = 'data' | 'items' | 'results';

export function unwrapResponse<T>(
  body: unknown,
  listUnwrapKey: ListUnwrapKey | null,
): T {
  if (listUnwrapKey === null || body === null || typeof body !== 'object') {
    return body as T;
  }

  const record = body as Record<string, unknown>;
  if (listUnwrapKey in record) {
    return record[listUnwrapKey] as T;
  }

  return body as T;
}

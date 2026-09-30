/** Unwrap list payloads using contract list_unwrap_key (data / items / results). */
export function unwrapListPayload<T>(payload: unknown, listUnwrapKey: 'data' | 'items' | 'results' = 'data'): T[] {
  if (!payload || typeof payload !== 'object') return [];
  const root = payload as Record<string, unknown>;
  const primary = root[listUnwrapKey];
  if (Array.isArray(primary)) return primary as T[];
  if (primary && typeof primary === 'object') {
    const nested = primary as Record<string, unknown>;
    for (const key of ['items', 'results', 'data'] as const) {
      if (Array.isArray(nested[key])) return nested[key] as T[];
    }
  }
  return [];
}

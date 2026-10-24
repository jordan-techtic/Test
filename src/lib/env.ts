export function getApiBaseUrl(): string {
  const base = import.meta.env.VITE_API_BASE_URL ?? '';
  return base.replace(/\/$/, '');
}

/** Map ticket paths like /api/visitor/home to client paths relative to VITE_API_BASE_URL. */
export function resolveApiPath(ticketPath: string): string {
  const base = getApiBaseUrl();
  if (base.endsWith('/api') && ticketPath.startsWith('/api/')) {
    return ticketPath.slice(4);
  }
  return ticketPath;
}

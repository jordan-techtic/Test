import { apiRequest } from '../lib/api-client';
import { unwrapResponse } from '../lib/unwrap-response';
import type { VisitorHomeContent } from '../types/api';

export const VISITOR_HOME_PATH = '/api/visitor/home';
export const VISITOR_HOME_LIST_UNWRAP_KEY = null;

function isVisitorHomeContent(value: unknown): value is VisitorHomeContent {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  const record = value as Record<string, unknown>;
  return (
    'marketing_message' in record ||
    'sub_heading' in record ||
    'contact_email' in record ||
    'privacy_policy_link' in record ||
    'terms_of_service_link' in record
  );
}

function parseVisitorHomeResponse(body: unknown): VisitorHomeContent {
  if (body && typeof body === 'object' && !Array.isArray(body) && 'data' in body) {
    const envelope = body as Record<string, unknown>;
    const inner = envelope.data;
    if (isVisitorHomeContent(inner)) {
      return inner;
    }
  }

  const unwrapped = unwrapResponse<unknown>(body, VISITOR_HOME_LIST_UNWRAP_KEY);
  if (isVisitorHomeContent(unwrapped)) {
    return unwrapped;
  }

  return unwrapped as VisitorHomeContent;
}

let visitorHomeInflight: Promise<VisitorHomeContent> | null = null;
let visitorHomeCache: VisitorHomeContent | null = null;

export function resetVisitorHomeCache(): void {
  visitorHomeCache = null;
}

export async function getVisitorHome(): Promise<VisitorHomeContent> {
  if (visitorHomeCache) {
    return visitorHomeCache;
  }

  if (visitorHomeInflight) {
    return visitorHomeInflight;
  }

  visitorHomeInflight = (async () => {
    try {
      const response = await apiRequest<unknown>('GET', VISITOR_HOME_PATH);
      const parsed = parseVisitorHomeResponse(response);
      visitorHomeCache = parsed;
      return parsed;
    } finally {
      visitorHomeInflight = null;
    }
  })();

  return visitorHomeInflight;
}

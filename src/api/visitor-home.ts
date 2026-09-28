import { apiRequest } from '../lib/api-client';
import { unwrapResponse } from '../lib/unwrap-response';
import type { ListUnwrapKey } from '../lib/unwrap-response';
import type { VisitorHomeContent } from '../types/api';

export const VISITOR_HOME_PATH = '/api/visitor/home';
export const VISITOR_HOME_LIST_UNWRAP_KEY = 'data' satisfies ListUnwrapKey;

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
  const unwrapped = unwrapResponse<unknown>(body, VISITOR_HOME_LIST_UNWRAP_KEY);
  if (isVisitorHomeContent(unwrapped)) {
    return unwrapped;
  }

  return unwrapped as VisitorHomeContent;
}

let visitorHomeInflight: Promise<VisitorHomeContent> | null = null;

export async function getVisitorHome(): Promise<VisitorHomeContent> {
  if (visitorHomeInflight) {
    return visitorHomeInflight;
  }

  visitorHomeInflight = (async () => {
    try {
      const response = await apiRequest<unknown>('GET', VISITOR_HOME_PATH);
      return parseVisitorHomeResponse(response);
    } finally {
      visitorHomeInflight = null;
    }
  })();

  return visitorHomeInflight;
}

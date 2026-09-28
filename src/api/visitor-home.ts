import { apiRequest } from '../lib/api-client';
import { unwrapResponse } from '../lib/unwrap-response';
import type { VisitorHomeContent } from '../types/api';

export const VISITOR_HOME_PATH = '/api/visitor/home';
export const VISITOR_HOME_LIST_UNWRAP_KEY = 'data' as const;

export async function getVisitorHome(): Promise<VisitorHomeContent> {
  const response = await apiRequest<unknown>('GET', VISITOR_HOME_PATH);
  return unwrapResponse<VisitorHomeContent>(response, VISITOR_HOME_LIST_UNWRAP_KEY);
}

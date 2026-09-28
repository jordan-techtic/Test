import { apiRequest } from '../lib/api-client';
import { unwrapResponse } from '../lib/unwrap-response';
import type { AboutUsContent } from '../types/api';

export const ABOUT_US_PATH = '/api/about-us';
export const ABOUT_US_LIST_UNWRAP_KEY = 'data' as const;

export async function getAboutUs(): Promise<AboutUsContent> {
  const response = await apiRequest<unknown>('GET', ABOUT_US_PATH);
  return unwrapResponse<AboutUsContent>(response, ABOUT_US_LIST_UNWRAP_KEY);
}

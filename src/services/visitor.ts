import { apiRequest } from '@/lib/api-client';
import type { VisitorHomeResponse } from '@/types/visitor-home';

const VISITOR_HOME_PATH = '/api/visitor/home';

export async function getVisitorHome(): Promise<VisitorHomeResponse> {
  return apiRequest<VisitorHomeResponse>(VISITOR_HOME_PATH);
}

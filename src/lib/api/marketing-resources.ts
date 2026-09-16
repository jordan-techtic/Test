import { apiClient } from '@/lib/api/client';
import type { ApiSuccessResponse } from '@/types/api';

export async function getActivitiesList() {
  const response = await apiClient.get<ApiSuccessResponse<Record<string, unknown>>>(
    '/api/v1/marketing-team-member/activities',
  );
  return response.data;
}

export async function getKlaviyoPerformance() {
  const response = await apiClient.get<ApiSuccessResponse<Record<string, unknown>>>(
    '/api/v1/marketing-team-member/klaviyo/performance',
  );
  return response.data;
}

export async function getKlaviyoPerformanceNotifications() {
  const response = await apiClient.get<ApiSuccessResponse<Record<string, unknown>>>(
    '/api/v1/marketing-team-member/klaviyo/performance/notifications',
  );
  return response.data;
}

export async function getAuditLog() {
  const response = await apiClient.get<ApiSuccessResponse<Record<string, unknown>>>(
    '/api/v1/marketing-team-member/audit-log',
  );
  return response.data;
}

export async function getPerformanceMetrics() {
  const response = await apiClient.get<ApiSuccessResponse<Record<string, unknown>>>(
    '/api/v1/marketing-team-member/performance-metrics',
  );
  return response.data;
}

export async function getHistoricalManagement() {
  const response = await apiClient.get<ApiSuccessResponse<Record<string, unknown>>>(
    '/api/v1/marketing-team-member/historical-management',
  );
  return response.data;
}

export async function getPerformanceData() {
  const response = await apiClient.get<ApiSuccessResponse<Record<string, unknown>>>(
    '/api/v1/marketing-content-calendar/performance-data',
  );
  return response.data;
}

export async function getCampaignCode(activityId: string) {
  const response = await apiClient.get<ApiSuccessResponse<Record<string, unknown>>>(
    `/api/v1/marketing-team-member/campaign-code/${activityId}`,
  );
  return response.data;
}

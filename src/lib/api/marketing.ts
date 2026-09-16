import type { AxiosRequestConfig } from 'axios'

import { api } from '@/lib/api/client'
import type {
  ActivityListResponse,
  AuditLogListResponse,
  CampaignCodeResponse,
  HistoricalManagementResponse,
  KlaviyoNotificationsResponse,
  KlaviyoPerformanceResponse,
  PerformanceDataResponse,
  PerformanceMetricsResponse,
} from '@/types/api'

export interface YearQueryParams {
  year?: number
  page?: number
  limit?: number
}

export interface ActivitiesQueryParams extends YearQueryParams {
  search?: string
  category?: string
  activity_type?: string
  status?: string
  month?: number
}

export async function listActivities(
  params: ActivitiesQueryParams = {},
  config?: AxiosRequestConfig,
): Promise<ActivityListResponse> {
  const response = await api.get<ActivityListResponse>(
    '/api/v1/marketing-team-member/activities',
    { ...config, params },
  )
  return response.data
}

export async function getAuditLog(
  params: { activity_id?: string; action?: string; page?: number; limit?: number } = {},
  config?: AxiosRequestConfig,
): Promise<AuditLogListResponse> {
  const response = await api.get<AuditLogListResponse>(
    '/api/v1/marketing-team-member/audit-log',
    { ...config, params },
  )
  return response.data
}

export async function getKlaviyoPerformance(
  params: YearQueryParams & { campaign_code?: string } = {},
  config?: AxiosRequestConfig,
): Promise<KlaviyoPerformanceResponse> {
  const response = await api.get<KlaviyoPerformanceResponse>(
    '/api/v1/marketing-team-member/klaviyo/performance',
    { ...config, params },
  )
  return response.data
}

export async function getKlaviyoNotifications(
  params: { limit?: number } = {},
  config?: AxiosRequestConfig,
): Promise<KlaviyoNotificationsResponse> {
  const response = await api.get<KlaviyoNotificationsResponse>(
    '/api/v1/marketing-team-member/klaviyo/performance/notifications',
    { ...config, params },
  )
  return response.data
}

export async function getPerformanceMetrics(
  params: YearQueryParams & { campaign_code?: string } = {},
  config?: AxiosRequestConfig,
): Promise<PerformanceMetricsResponse> {
  const response = await api.get<PerformanceMetricsResponse>(
    '/api/v1/marketing-team-member/performance-metrics',
    { ...config, params },
  )
  return response.data
}

export async function getHistoricalManagement(
  params: {
    year?: number
    view?: string
    category?: string
    activity_type?: string
  } = {},
  config?: AxiosRequestConfig,
): Promise<HistoricalManagementResponse> {
  const response = await api.get<HistoricalManagementResponse>(
    '/api/v1/marketing-team-member/historical-management',
    { ...config, params },
  )
  return response.data
}

export async function getPerformanceData(
  params: YearQueryParams & { campaign_code?: string } = {},
  config?: AxiosRequestConfig,
): Promise<PerformanceDataResponse> {
  const response = await api.get<PerformanceDataResponse>(
    '/api/v1/marketing-content-calendar/performance-data',
    { ...config, params },
  )
  return response.data
}

export async function getCampaignCode(
  activityId: string,
  config?: AxiosRequestConfig,
): Promise<CampaignCodeResponse> {
  const response = await api.get<CampaignCodeResponse>(
    `/api/v1/marketing-team-member/campaign-code/${activityId}`,
    config,
  )
  return response.data
}

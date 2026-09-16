export interface ApiSuccessEnvelope<T> {
  success: true
  message: string
  data: T
}

export interface ApiErrorEnvelope {
  success: false
  message: string
  error: {
    code: string
    details?: Array<{ field: string; message: string }> | null
  }
}

export interface AuthUser {
  id: string
  email: string
  username: string
  role: 'marketing_team_member'
}

export interface LoginRequest {
  email_or_username: string
  password: string
}

export interface LoginData {
  access_token: string
  refresh_token: string
  token_type: 'bearer'
  user: AuthUser
}

export type LoginResponse = ApiSuccessEnvelope<LoginData>

export interface ForgotPasswordRequest {
  email: string
}

export type ForgotPasswordResponse = ApiSuccessEnvelope<Record<string, never>>

export interface ActivityTypeField {
  name: string
  label: string
  required: boolean
  max_length: number
}

export interface ActivityTypeOption {
  value: string
  label: string
  category: string
  color: string
  fields: ActivityTypeField[]
}

export interface ActivityOut {
  id: string
  title: string
  date: string
  type: string
  activity_type: string
  description: string | null
  notes: string | null
  details: string | null
  additional_info: string | null
  category: string
  campaign_code: string
  status: 'pending' | 'published' | 'archived'
  color: string
  organization: string
  role: string
  created_by: string
  created_at: string
  updated_at: string
}

export interface CalendarData {
  year: number
  month: number | null
  week_start: 'monday'
  today: string
  organization: string
  role: string
  activity_types: ActivityTypeOption[]
  activities: ActivityOut[]
}

export type CalendarResponse = ApiSuccessEnvelope<CalendarData>

export interface ActivityCreateRequest {
  title: string
  activity_date: string
  activity_type: string
  details?: string | null
  additional_info?: string | null
  category?: string | null
  status?: string | null
}

export interface ActivityCreateData extends ActivityOut {
  activity_types: ActivityTypeOption[]
}

export type ActivityCreateResponse = ApiSuccessEnvelope<ActivityCreateData>

export interface ActivityUpdateRequest {
  title?: string | null
  activity_date?: string | null
  activity_type?: string | null
  details?: string | null
  additional_info?: string | null
  category?: string | null
  status?: string | null
  updated_at?: string | null
}

export type ActivityGetResponse = ApiSuccessEnvelope<ActivityOut>
export type ActivityUpdateResponse = ApiSuccessEnvelope<ActivityOut>
export type ActivityDeleteResponse = ApiSuccessEnvelope<Record<string, never>>

export interface PaginatedListData<T> {
  items: T[]
  page: number
  limit: number
  total: number
  description?: string
}

export type ActivityListResponse = ApiSuccessEnvelope<PaginatedListData<ActivityOut>>

export interface AuditLogEntry {
  id: string
  activity_id: string | null
  action: string
  performed_by: string
  performed_at: string
  details: string | null
}

export type AuditLogListResponse = ApiSuccessEnvelope<PaginatedListData<AuditLogEntry>>

export interface KlaviyoPerformanceItem {
  campaign_code: string
  activity_title: string
  activity_date: string
  open_rate: number | null
  click_rate: number | null
  revenue: number | null
}

export interface KlaviyoPerformanceData extends PaginatedListData<KlaviyoPerformanceItem> {
  retrieval_status: string
  message?: string
}

export type KlaviyoPerformanceResponse = ApiSuccessEnvelope<KlaviyoPerformanceData>

export interface KlaviyoNotification {
  id: string
  message: string
  created_at: string
  read: boolean
}

export type KlaviyoNotificationsResponse = ApiSuccessEnvelope<{
  items: KlaviyoNotification[]
  description?: string
}>

export interface PerformanceMetricItem {
  campaign_code: string
  activity_title: string
  activity_date: string
  metric_type: string
  value: number | null
}

export interface PerformanceMetricsData {
  metrics: PerformanceMetricItem[]
  page: number
  limit: number
  total: number
  retrieval_status: string
  description?: string
  export_status?: string
  error_message?: string | null
}

export type PerformanceMetricsResponse = ApiSuccessEnvelope<PerformanceMetricsData>

export interface HistoricalCalendarSnapshot {
  year: number
  activities: ActivityOut[]
}

export interface HistoricalManagementData {
  current_year: number
  previous_year: number
  view: string
  current_calendar: HistoricalCalendarSnapshot
  previous_calendar: HistoricalCalendarSnapshot
  description?: string
  organization: string
  role: string
}

export type HistoricalManagementResponse = ApiSuccessEnvelope<HistoricalManagementData>

export interface PerformanceDataItem {
  campaign_code: string
  activity_title: string
  activity_date: string
  metric_value: number | null
}

export interface PerformanceDataList extends PaginatedListData<PerformanceDataItem> {
  retrieval_status: string
}

export type PerformanceDataResponse = ApiSuccessEnvelope<PerformanceDataList>

export interface CampaignCodeData {
  activity_id: string | null
  campaign_code: string
  code: string
  activity_details: ActivityOut | null
  description?: string
}

export type CampaignCodeResponse = ApiSuccessEnvelope<CampaignCodeData>

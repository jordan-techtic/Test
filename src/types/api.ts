export type ActivityStatus = "pending" | "published" | "archived";

export interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
}

export interface ErrorDetail {
  field: string;
  message: string;
}

export interface ApiError {
  success: false;
  message: string;
  error: {
    code: string;
    details?: ErrorDetail[];
  };
}

export interface LoginRequest {
  email_or_username: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  role: string;
}

export interface LoginData {
  access_token: string;
  refresh_token: string;
  token_type: "bearer";
  user: AuthUser;
}

export type LoginResponse = ApiSuccess<LoginData>;

export interface ForgotPasswordRequest {
  email: string;
}

export type ForgotPasswordResponse = ApiSuccess<Record<string, never>>;

export interface ActivityTypeField {
  id: string;
  name: string;
  field_type: string;
  required: boolean;
  options?: Record<string, unknown>[];
  extra?: Record<string, unknown>;
}

export interface ActivityTypeOption {
  id: string;
  name: string;
  fields: ActivityTypeField[];
}

export interface ActivityOut {
  id: string;
  user_id: string;
  activity_type_id: string;
  activity_type_name: string;
  scheduled_date: string;
  status: ActivityStatus;
  extra: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CalendarData {
  activities: ActivityOut[];
  activity_types: ActivityTypeOption[];
  current_month: string;
}

export interface ActivityListData {
  items: ActivityOut[];
  page: number;
  limit: number;
  total: number;
  description: string;
}

export interface AuditLogItem {
  id: string;
  activity_id?: string | null;
  user_id: string;
  action: string;
  extra: Record<string, unknown>;
  created_at: string;
}

export interface AuditLogListData {
  items: AuditLogItem[];
  page: number;
  limit: number;
  total: number;
  description: string;
}

export interface PerformanceItem {
  id: string;
  activity_id: string;
  extra: Record<string, unknown>;
}

export interface PerformanceData {
  items: PerformanceItem[];
  page: number;
  limit: number;
  total: number;
  retrieval_status: string;
  description: string;
  message: string;
}

export interface NotificationItem {
  id: string;
  extra: Record<string, unknown>;
}

export interface NotificationListData {
  items: NotificationItem[];
  description: string;
}

export interface PerformanceMetricItem {
  extra: Record<string, unknown>;
}

export interface PerformanceMetricsData {
  metrics: PerformanceMetricItem[];
  page: number;
  limit: number;
  total: number;
  retrieval_status: string;
  description: string;
  message: string;
}

export interface HistoricalEntry {
  extra: Record<string, unknown>;
}

export interface HistoricalCalendarsData {
  entries: HistoricalEntry[];
  description: string;
}

export interface CampaignCodeData {
  extra: Record<string, unknown>;
}

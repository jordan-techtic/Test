export type ActivityStatus = "pending" | "published" | "archived";

export interface SuccessEnvelope<T> {
  success: true;
  message: string;
  data: T;
}

export interface ErrorDetail {
  field?: string;
  message?: string;
}

export interface ErrorBody {
  code: string;
  details?: ErrorDetail[] | Record<string, unknown>;
}

export interface ErrorEnvelope {
  success: false;
  message: string;
  error: ErrorBody;
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

export interface LoginRequest {
  email_or_username: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ActivityTypeField {
  name: string;
  label: string;
  required: boolean;
  max_length: number;
}

export interface ActivityTypeOption {
  value: string;
  label: string;
  category: string;
  color: string;
  fields: ActivityTypeField[];
}

export interface ActivityOut {
  id: string;
  title: string;
  date: string;
  type: string;
  activity_type: string;
  description: string | null;
  notes: string | null;
  details: string | null;
  additional_info: string | null;
  category: string;
  campaign_code: string;
  status: ActivityStatus;
  color: string;
  organization: string;
  role: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface ActivityCreateData extends ActivityOut {
  activity_types: ActivityTypeOption[];
}

export interface CalendarData {
  year: number;
  month: number | null;
  week_start: "monday";
  today: string;
  organization: string;
  role: string;
  activity_types: ActivityTypeOption[];
  activities: ActivityOut[];
}

export interface ActivityCreateRequest {
  title: string;
  activity_date: string;
  activity_type: string;
  details?: string | null;
  additional_info?: string | null;
  category?: string | null;
  status?: string | null;
}

export interface ActivityUpdateRequest {
  title?: string | null;
  activity_date?: string | null;
  activity_type?: string | null;
  details?: string | null;
  additional_info?: string | null;
  category?: string | null;
  status?: string | null;
  updated_at?: string | null;
}

export interface ActivityRescheduleRequest {
  id: string;
  date: string;
  updated_at?: string | null;
}

export interface ActivityListData {
  items: ActivityOut[];
  page: number;
  limit: number;
  total: number;
  description: string;
}

export interface ActivityListQuery {
  search?: string;
  category?: string[];
  activity_type?: string[];
  status?: string;
  year?: number;
  month?: number;
  date_from?: string;
  date_to?: string;
  sort?: string;
  page?: number;
  limit?: number;
  format?: "json" | "pdf";
}

export interface CalendarQuery {
  year?: number;
  month?: number;
  category?: string[];
  activity_type?: string[];
}

export interface AuditLogItem {
  id: string;
  activity_id: string | null;
  title: string | null;
  user_id: string;
  action: string;
  description: string;
  changes: Record<string, unknown> | null;
  created_at: string | null;
}

export interface AuditLogListData {
  items: AuditLogItem[];
  page: number;
  limit: number;
  total: number;
  description: string;
}

export interface AuditLogQuery {
  activity_id?: string;
  action?: string;
  page?: number;
  limit?: number;
}

export const apiPaths = {
  login: "/api/v1/marketing-team-member/login",
  forgotPassword: "/api/v1/marketing-team-member/forgot-password",
  calendar: "/api/v1/marketing-team-member/calendar",
  activities: "/api/v1/marketing-team-member/activities",
  activity: "/api/v1/marketing-team-member/activities/{id}",
  reschedule: "/api/v1/marketing-team-member/activities/reschedule",
  auditLog: "/api/v1/marketing-team-member/audit-log",
  klaviyoPerformance: "/api/v1/marketing-team-member/klaviyo/performance",
  klaviyoPerformanceNotifications:
    "/api/v1/marketing-team-member/klaviyo/performance/notifications",
  performanceMetrics: "/api/v1/marketing-team-member/performance-metrics",
  historicalManagement: "/api/v1/marketing-team-member/historical-management",
  performanceData: "/api/v1/marketing-content-calendar/performance-data",
  campaignCode: "/api/v1/marketing-team-member/campaign-code/{activity_id}",
} as const;

export function activityPath(id: string): string {
  return `/api/v1/marketing-team-member/activities/${id}`;
}

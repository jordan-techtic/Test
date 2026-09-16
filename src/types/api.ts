export type ActivityStatus = "pending" | "published" | "archived";

export type ActivityTypeValue =
  | "email_send"
  | "sms_send"
  | "blog_post"
  | "social_post"
  | "product_focus"
  | "seasonal_focus";

export interface ErrorDetail {
  field: string;
  message: string;
}

export interface ErrorBody {
  code: string;
  details?: ErrorDetail[] | unknown;
}

export interface ErrorEnvelope {
  success: false;
  message: string;
  error: ErrorBody;
}

export interface SuccessEnvelope<T> {
  success: true;
  message: string;
  data: T;
}

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  role: string;
}

export interface LoginRequest {
  email_or_username: string;
  password: string;
}

export interface LoginData {
  access_token: string;
  refresh_token: string;
  token_type: "bearer";
  user: AuthUser;
}

export type LoginResponse = SuccessEnvelope<LoginData>;

export interface ForgotPasswordRequest {
  email: string;
}

export type ForgotPasswordResponse = SuccessEnvelope<Record<string, never>>;

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

export type CalendarResponse = SuccessEnvelope<CalendarData>;

export interface ActivityCreateRequest {
  title: string;
  activity_date: string;
  activity_type: string;
  details?: string | null;
  additional_info?: string | null;
  category?: string | null;
  status?: string | null;
}

export type ActivityCreateData = ActivityOut & { activity_types: ActivityTypeOption[] };
export type ActivityCreateResponse = SuccessEnvelope<ActivityCreateData>;

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

export type ActivityGetResponse = SuccessEnvelope<ActivityOut>;
export type ActivityUpdateResponse = SuccessEnvelope<ActivityOut>;
export type ActivityDeleteResponse = SuccessEnvelope<Record<string, never>>;

export interface CalendarQuery {
  year?: number;
  month?: number;
  category?: string;
  activity_type?: string;
}

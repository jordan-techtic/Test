export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorDetail {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error: {
    code: string;
    details?: ApiErrorDetail[];
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  role: 'marketing_team_member';
}

export interface LoginRequest {
  email_or_username: string;
  password: string;
}

export interface LoginData {
  access_token: string;
  refresh_token: string;
  token_type: 'bearer';
  user: AuthUser;
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

export interface Activity {
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
  status: string;
  color: string;
  organization: string;
  role: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface ActivityCreateData extends Activity {
  activity_types?: ActivityTypeOption[];
}

export interface CalendarData {
  year: number;
  month?: number | null;
  week_start: 'monday';
  today: string;
  organization: string;
  role: string;
  activity_types: ActivityTypeOption[];
  activities: Activity[];
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

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

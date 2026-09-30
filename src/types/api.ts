export interface ApiSuccessEnvelope<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorEnvelope {
  success: false;
  message: string;
  error: {
    code: string;
    details?: Record<string, string[]> | null;
  };
  path: string;
  timestamp: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponseData {
  id: string;
  name: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | null;
  token: string;
  accessToken: string;
  refreshToken?: string;
  tokenType: string;
}

export type LoginResponse = ApiSuccessEnvelope<LoginResponseData>;

export interface SignupRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  terms_accepted: true;
  phone?: string;
}

export interface RegisteredUserData {
  id: string;
  name: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  email_verified: boolean;
  phone?: string | null;
}

export type SignupResponse = ApiSuccessEnvelope<RegisteredUserData>;

export interface ProfileData {
  id: string;
  name: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number?: string | null;
  phone?: string | null;
  bio?: string | null;
  description?: string | null;
  time_zone?: string | null;
  street?: string | null;
  country?: string | null;
  state?: string | null;
  city?: string | null;
  zip?: string | null;
  address?: string | null;
  profile: Record<string, unknown>;
  address_details: {
    street?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
    country?: string | null;
  };
  image?: string | null;
  password?: null;
  link?: string | null;
  error?: unknown;
}

export type ProfileResponse = ApiSuccessEnvelope<ProfileData>;

export interface UpdateProfileRequest {
  first_name: string;
  last_name: string;
  email: string;
  mobile_number?: string | null;
  phone?: string | null;
  bio?: string | null;
  time_zone?: string | null;
  street?: string | null;
  country?: string | null;
  state?: string | null;
  city?: string | null;
  zip?: string | null;
  image?: string | null;
  link?: string | null;
  description?: string | null;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export type ChangePasswordResponse = ApiSuccessEnvelope<Record<string, never>>;

export interface DashboardAnalyticsMetrics {
  content_generated: number;
  downloads: number;
  current_ai_credits: number;
  total_ai_credits: number;
  remaining_ai_credits: number;
}

export interface DashboardProfile {
  id: string;
  full_name: string;
  email: string;
  phone?: string | null;
}

export interface DashboardAnnouncement {
  id: string;
  announcement_title: string;
  announcement_content: string;
  title: string;
  message: string;
  description: string;
  full_name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface DashboardContentCalendarItem {
  id: string;
  title: string;
  date: string;
  content: string;
  description: string;
  full_name: string;
  phone: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DashboardOverviewData {
  profile: DashboardProfile;
  analytics: {
    id: string;
    status: string;
    description: string;
    analytics_data: DashboardAnalyticsMetrics;
    full_name: string;
    email: string;
    phone?: string | null;
  };
  announcements: DashboardAnnouncement[];
  content_calendar: DashboardContentCalendarItem[];
  status: string;
  description: string;
}

export type DashboardOverviewResponse = ApiSuccessEnvelope<DashboardOverviewData>;

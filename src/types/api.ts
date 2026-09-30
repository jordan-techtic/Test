export interface ApiSuccessEnvelope<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorEnvelope {
  success: false;
  message: string;
  error: { code: string; details?: Record<string, string[]> | null };
  path: string;
  timestamp: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthTokenData {
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

export type LoginResponse = ApiSuccessEnvelope<AuthTokenData>;

export interface SignupRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  password: string;
  terms_accepted: boolean;
}

export interface RegisteredUserData {
  id: string;
  name: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | null;
  email_verified: boolean;
}

export type SignupResponse = ApiSuccessEnvelope<RegisteredUserData>;

export interface DashboardAnalyticsMetrics {
  content_generated: number;
  downloads: number;
  current_ai_credits: number;
  total_ai_credits: number;
  remaining_ai_credits: number;
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
  link?: string | null;
  status: string;
  error: null;
  created_at: string;
  updated_at: string;
}

export interface DashboardOverviewData {
  profile: { id: string; full_name: string; email: string; phone?: string | null };
  analytics: {
    id: string;
    status: string;
    description: string;
    link?: unknown | null;
    error: null;
    analytics_data: DashboardAnalyticsMetrics;
    full_name: string;
    email: string;
    phone?: string | null;
  };
  announcements: DashboardAnnouncement[];
  content_calendar: unknown[];
  status: string;
  error?: null;
  link?: unknown | null;
  description: string;
}

export type DashboardOverviewResponse = ApiSuccessEnvelope<DashboardOverviewData>;

export interface ProfileAddressDetails {
  street?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  country?: string | null;
}

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
  address_details: ProfileAddressDetails;
  image?: string | null;
  password?: null;
  link?: string | null;
  error?: null;
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

export const AUTH_TOKEN_KEY = 'agentwise_access_token';

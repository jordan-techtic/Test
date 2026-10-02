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

export interface AuthTokenData {
  id: string;
  name: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: unknown | null;
  token: string;
  accessToken: string;
  refreshToken?: string;
  tokenType: string;
}

export type LoginResponse = ApiSuccessEnvelope<AuthTokenData>;

export interface ProfileAddressDetails {
  street?: unknown | null;
  city?: unknown | null;
  state?: unknown | null;
  zip?: unknown | null;
  country?: unknown | null;
}

export interface ProfileData {
  id: string;
  name: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number?: unknown | null;
  phone?: unknown | null;
  bio?: unknown | null;
  time_zone?: unknown | null;
  street?: unknown | null;
  country?: unknown | null;
  state?: unknown | null;
  city?: unknown | null;
  zip?: unknown | null;
  address_details?: ProfileAddressDetails;
}

export type ProfileResponse = ApiSuccessEnvelope<ProfileData>;

export interface DashboardAnalyticsMetrics {
  content_generated: number;
  downloads: number;
  current_ai_credits: number;
  total_ai_credits: number;
  remaining_ai_credits: number;
}

export interface DashboardOverviewData {
  profile: { id: string; full_name: string; email: string; phone?: unknown | null };
  analytics: {
    id: string;
    status: string;
    description: string;
    link?: unknown | null;
    error?: unknown | null;
    analytics_data: DashboardAnalyticsMetrics;
    full_name: string;
    email: string;
    phone?: unknown | null;
  };
  announcements: unknown[];
  content_calendar: unknown[];
  status: string;
  error?: unknown | null;
  link?: unknown | null;
  description: string;
}

export type DashboardOverviewResponse = ApiSuccessEnvelope<DashboardOverviewData>;

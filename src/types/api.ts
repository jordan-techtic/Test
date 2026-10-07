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
  phone?: unknown | null;
  token: string;
  accessToken: string;
  refreshToken?: string;
  tokenType: string;
}

export type LoginResponse = ApiSuccessEnvelope<AuthTokenData>;

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
  link?: unknown | null;
  status: string;
  error?: unknown | null;
  created_at: string;
  updated_at: string;
}

export interface ContentCalendarEntry {
  id: string;
  title: string;
  date: string;
  content: string;
  description: string;
  full_name: string;
  phone: string;
  link?: unknown | null;
  error?: unknown | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
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
  announcements: DashboardAnnouncement[];
  content_calendar: ContentCalendarEntry[];
  status: string;
  error?: unknown | null;
  link?: unknown | null;
  description: string;
}

export type DashboardOverviewResponse = ApiSuccessEnvelope<DashboardOverviewData>;

export interface ProfileSummary {
  bio: string;
  description: string;
  image: string;
  name: string;
}

export interface ProfileAddressDetails {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
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
  profile?: ProfileSummary;
  address_details?: ProfileAddressDetails;
  image?: string | null;
  link?: string | null;
  error?: unknown | null;
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

export interface AiCreditUsageItem {
  id: string;
  user: string;
  usage: number;
  limit: number;
}

export interface AiCreditUsageListData {
  ai_credit_usage: AiCreditUsageItem[];
  full_name: string;
  phone: string | null;
}

export type AiCreditUsageListResponse = ApiSuccessEnvelope<AiCreditUsageListData>;

export interface AiCreditRecordData extends AiCreditUsageItem {
  full_name: string;
  phone: string;
}

export interface CreateAiCreditRequest {
  user_id: string;
  usage: number;
  limit: number;
  full_name: string;
  phone: string;
}

export interface UpdateAiCreditRequest {
  usage?: number;
  limit?: number;
  full_name?: string;
  phone?: string;
}

export type AiCreditRecordResponse = ApiSuccessEnvelope<AiCreditRecordData>;

export interface SignupRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  terms_accepted: boolean;
  phone?: string;
}

export interface RegisteredUserData {
  id: string;
  name: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: unknown | null;
  email_verified: boolean;
}

export type SignupResponse = ApiSuccessEnvelope<RegisteredUserData>;

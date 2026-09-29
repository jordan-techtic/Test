export interface ProfileData {
  first_name?: string;
  last_name?: string;
  email?: string;
  mobile_number?: string;
  bio?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  time_zone?: string;
}

export interface ProfileEnvelope {
  success?: boolean;
  message?: string;
  data?: ProfileData;
}

export interface ProfileUpdateRequest {
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  bio: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  time_zone: string;
  password?: string;
}

export type ProfileFieldErrors = Partial<Record<keyof ProfileUpdateRequest | '_form', string>>;

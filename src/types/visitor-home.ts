export interface VisitorHomeContent {
  marketing_message: string;
  sub_heading: string;
  contact_email: string;
  privacy_policy_link: string;
  terms_of_service_link: string;
  phone: string;
  terms_accepted: boolean;
}

export interface VisitorHomeResponse {
  success: boolean;
  message: string;
  data: VisitorHomeContent;
}

import { apiRequest } from "./api-client";

type ContractWriteBody = Record<string, string | boolean> | undefined;

export function getDashboard(): Promise<unknown> {
  return apiRequest("GET", "/api/dashboard");
}

export function getUltimateMindSuggestions(): Promise<unknown> {
  return apiRequest("GET", "/api/ultimate-mind/suggestions");
}

export function getProfile(): Promise<unknown> {
  return apiRequest("GET", "/api/profile");
}

export function getAboutUs(): Promise<unknown> {
  return apiRequest("GET", "/api/about-us", { auth: false });
}

export function putProfile(body: ContractWriteBody): Promise<unknown> {
  return apiRequest("PUT", "/api/profile", { body });
}

export function postDashboardNotifications(body: ContractWriteBody): Promise<unknown> {
  return apiRequest("POST", "/api/dashboard/notifications", { body });
}

export function putDashboardSubscription(body: ContractWriteBody): Promise<unknown> {
  return apiRequest("PUT", "/api/dashboard/subscription", { body });
}

export function deleteDashboardNotification(id: string): Promise<unknown> {
  return apiRequest("DELETE", `/api/dashboard/notifications/${encodeURIComponent(id)}`);
}

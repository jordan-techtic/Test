/** Locked OpenAPI paths. Join to the API origin (not a base that already ends in /api). */
export const apiPaths = {
  login: "/api/v1/marketing-team-member/login",
  forgotPassword: "/api/v1/marketing-team-member/forgot-password",
  calendar: "/api/v1/marketing-team-member/calendar",
  activities: "/api/v1/marketing-team-member/activities",
  activity: (id: string) => `/api/v1/marketing-team-member/activities/${id}`,
} as const;

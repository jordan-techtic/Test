/** Locked OpenAPI paths. Join to the API origin (not a base that already ends in /api). */
export const apiPaths = {
  login: "/api/v1/marketing-team-member/login",
  forgotPassword: "/api/v1/marketing-team-member/forgot-password",
  calendar: "/api/v1/marketing-team-member/calendar",
  activities: "/api/v1/marketing-team-member/activities",
  activity: (id: string) => `/api/v1/marketing-team-member/activities/${id}`,
  campaignCode: (activityId: string) =>
    `/api/v1/marketing-team-member/campaign-code/${activityId}`,
  klaviyoPerformance: "/api/v1/marketing-team-member/klaviyo/performance",
  klaviyoNotifications: "/api/v1/marketing-team-member/klaviyo/performance/notifications",
  auditLog: "/api/v1/marketing-team-member/audit-log",
  performanceMetrics: "/api/v1/marketing-team-member/performance-metrics",
  historicalManagement: "/api/v1/marketing-team-member/historical-management",
  performanceData: "/api/v1/marketing-content-calendar/performance-data",
} as const;

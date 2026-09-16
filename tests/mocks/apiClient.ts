export const api = {
  post: jest.fn(),
  get: jest.fn(),
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() },
  },
};

export const apiPaths = {
  login: "/api/v1/marketing-team-member/login",
  forgotPassword: "/api/v1/marketing-team-member/forgot-password",
  calendar: "/api/v1/marketing-team-member/calendar",
  activities: "/api/v1/marketing-team-member/activities",
  klaviyoPerformance: "/api/v1/marketing-team-member/klaviyo/performance",
  klaviyoPerformanceNotifications:
    "/api/v1/marketing-team-member/klaviyo/performance/notifications",
  auditLog: "/api/v1/marketing-team-member/audit-log",
  performanceMetrics: "/api/v1/marketing-team-member/performance-metrics",
  historicalManagement: "/api/v1/marketing-team-member/historical-management",
  performanceData: "/api/v1/marketing-content-calendar/performance-data",
} as const;

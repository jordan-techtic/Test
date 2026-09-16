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
} as const;

import axios from "axios";
import { setupInterceptors } from "@/lib/api/interceptors";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

setupInterceptors(api);

export const apiPaths = {
  login: "/v1/marketing-team-member/login",
  forgotPassword: "/v1/marketing-team-member/forgot-password",
} as const;

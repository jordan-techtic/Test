import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuthRedirect?: boolean
  }
}

function shouldSkipAuthRedirect(config: InternalAxiosRequestConfig | undefined): boolean {
  return config?.skipAuthRedirect === true
}

import {
  clearAuth,
  dispatchUnauthorizedEvent,
  getAccessToken,
} from '@/lib/auth/storage'

let isRedirectingToLogin = false

export function setupInterceptors(api: AxiosInstance): void {
  api.interceptors.request.use((config) => {
    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status
      const code = error.response?.data?.error?.code

      if (status === 401 || code === 'UNAUTHORIZED') {
        if (!shouldSkipAuthRedirect(error.config)) {
          clearAuth()
          localStorage.removeItem('auth_user')
          dispatchUnauthorizedEvent()
          if (
            typeof window !== 'undefined' &&
            !window.location.pathname.startsWith('/login') &&
            !isRedirectingToLogin
          ) {
            isRedirectingToLogin = true
            window.location.replace('/login')
          }
        }
      }

      return Promise.reject(error)
    },
  )
}

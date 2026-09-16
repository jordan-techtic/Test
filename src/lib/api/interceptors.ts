import type { AxiosInstance } from 'axios'

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

      return Promise.reject(error)
    },
  )
}

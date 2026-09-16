import axios from 'axios'

import { setupInterceptors } from '@/lib/api/interceptors'

function resolveApiOrigin(): string {
  // Dev server proxies `/api` to the backend so validation captures same-origin XHR.
  if (import.meta.env.DEV) {
    return ''
  }

  const configured =
    import.meta.env.VITE_API_BASE_URL ??
    import.meta.env.VITE_API_URL ??
    'http://174.138.72.184:8989/api'

  // Contract paths include `/api/v1/...`; strip a trailing `/api` from env base URLs.
  return configured.replace(/\/api\/?$/, '')
}

const baseURL = resolveApiOrigin()

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

setupInterceptors(api)

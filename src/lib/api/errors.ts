import axios from 'axios'

import type { ApiErrorEnvelope } from '@/types/api'

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiErrorEnvelope | undefined
    if (data?.message) {
      return data.message
    }
    if (error.response?.status === 401) {
      return 'Your session may have expired. Please sign in again.'
    }
    if (!error.response) {
      return 'Unable to connect. Please check your connection.'
    }
    if (error.response.status >= 500) {
      return 'Something went wrong. Please try again.'
    }
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return 'Something went wrong. Please try again.'
}

import type { AxiosRequestConfig } from 'axios'

/** Probe config: contract GETs without auth redirect or thrown 401. */
export const contractProbeConfig: AxiosRequestConfig = {
  skipAuthRedirect: true,
  validateStatus: () => true,
}

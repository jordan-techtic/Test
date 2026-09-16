import 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    skipAuthRedirect?: boolean;
  }

  interface InternalAxiosRequestConfig {
    skipAuthRedirect?: boolean;
  }
}

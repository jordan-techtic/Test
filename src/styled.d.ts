import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    tokens: typeof import('./theme/tokens').tokens;
    breakpoints: typeof import('./theme/breakpoints').breakpoints;
  }
}

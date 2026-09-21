import { type ReactNode } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { breakpoints } from './breakpoints';
import { buildRootCssVariables } from './cssVariables';
import { tokens } from './tokens';

const rootCss = buildRootCssVariables();

const GlobalStyle = createGlobalStyle`
  :root {
    ${rootCss}
  }
`;

type ThemeProps = {
  children: ReactNode;
};

export function Theme({ children }: ThemeProps) {
  return (
    <ThemeProvider theme={{ tokens, breakpoints }}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

export { breakpoints } from './breakpoints';
export { tokens } from './tokens';

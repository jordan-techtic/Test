/** luna-spec-codegen: data-hook — wire API data here; do not restyle. */
import { useContext, useMemo, type ReactNode } from 'react';
import { figmaActionProps, figmaFieldProps } from './figma-bindings';
import { FigmaScreenDataContext, type FigmaScreenDataContextValue } from './figma-screen-context';
import { resolveFigmaScreen } from './resolve-screen';
import {
  DashboardScreenProvider,
  ProfileScreenProvider,
  SignInScreenProvider,
  SignUpScreenProvider,
} from './screen-providers';

export type { FigmaFieldBinding, FigmaActionBinding } from './figma-bindings';
export { figmaFieldProps, figmaActionProps };

export function FigmaScreenDataProvider({ children }: { children: ReactNode }) {
  const screen = useMemo(
    () => resolveFigmaScreen(typeof window !== 'undefined' ? window.location.pathname : '/profile'),
    [],
  );

  switch (screen) {
    case 'dashboard':
      return <DashboardScreenProvider>{children}</DashboardScreenProvider>;
    case 'sign-in':
      return <SignInScreenProvider>{children}</SignInScreenProvider>;
    case 'sign-up':
      return <SignUpScreenProvider>{children}</SignUpScreenProvider>;
    case 'profile':
    default:
      return <ProfileScreenProvider>{children}</ProfileScreenProvider>;
  }
}

export function useFigmaScreenData(): FigmaScreenDataContextValue {
  const ctx = useContext(FigmaScreenDataContext);
  if (!ctx) {
    throw new Error('useFigmaScreenData must be used within FigmaScreenDataProvider');
  }
  return ctx;
}

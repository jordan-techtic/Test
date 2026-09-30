export type FigmaScreenKind = 'dashboard' | 'sign-in' | 'sign-up' | 'profile';

export function resolveFigmaScreen(pathname: string): FigmaScreenKind {
  if (pathname.startsWith('/dashboard')) return 'dashboard';
  if (pathname.startsWith('/sign-in') || pathname === '/login') return 'sign-in';
  if (pathname.startsWith('/sign-up')) return 'sign-up';
  if (pathname.startsWith('/profile')) return 'profile';
  return 'profile';
}

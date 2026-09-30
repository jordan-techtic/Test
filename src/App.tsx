import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { FigmaScreenPage } from './components/luna-figma/FigmaScreenPage';
import { FigmaScreenDataProvider } from './components/luna-figma/useFigmaScreenData';
import { getStoredAccessToken } from './lib/api-client';
import { getDashboard, getProfile } from './lib/api-services';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, refetchOnWindowFocus: false },
  },
});

function RequireAuth({ children }: { children: ReactNode }) {
  const location = useLocation();
  if (!getStoredAccessToken()) {
    return <Navigate to="/sign-in" replace state={{ from: location.pathname }} />;
  }
  return children;
}

function RootRedirect() {
  if (getStoredAccessToken()) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Navigate to="/sign-in" replace />;
}

function FigmaRoute({ screen }: { screen: 'dashboard' | 'sign-in' | 'sign-up' | 'profile' }) {
  return (
    <FigmaScreenDataProvider>
      <FigmaScreenPage screen={screen} />
    </FigmaScreenDataProvider>
  );
}

function PlaceholderScreen({ title }: { title: string }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0b0b0b]">
      <p className="font-almarai text-[16px] font-[400] leading-[18px] text-[#ffffff] opacity-[0.6]">{title}</p>
    </main>
  );
}

function AuthenticatedScreenQueries() {
  const { pathname } = useLocation();
  const authed = Boolean(getStoredAccessToken());

  useQuery({
    queryKey: ['dashboard', 'overview'],
    queryFn: getDashboard,
    enabled: authed && pathname.startsWith('/dashboard'),
    staleTime: 30_000,
  });

  useQuery({
    queryKey: ['profile', 'me'],
    queryFn: getProfile,
    enabled: authed && pathname.startsWith('/profile'),
  });

  return null;
}

function AppRoutes() {
  return (
    <>
      <AuthenticatedScreenQueries />
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/sign-in" element={<FigmaRoute screen="sign-in" />} />
        <Route path="/login" element={<Navigate to="/sign-in" replace />} />
        <Route path="/sign-up" element={<FigmaRoute screen="sign-up" />} />
        <Route path="/forgot-password" element={<PlaceholderScreen title="Forgot password — coming soon" />} />
        <Route path="/ultimate-mind" element={<PlaceholderScreen title="Ultimate Mind — coming soon" />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <FigmaRoute screen="dashboard" />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <FigmaRoute screen="profile" />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

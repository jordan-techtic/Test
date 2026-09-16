import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { RootLayout } from '@/components/RootLayout';
import { AppShell } from '@/components/layout/AppShell';
import { AnnualMarketingCalendarPage } from '@/pages/AnnualMarketingCalendarPage';
import { LoginPage } from '@/pages/LoginPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { PlaceholderPage } from '@/pages/PlaceholderPage';
import { ServerErrorPage } from '@/pages/ServerErrorPage';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <AppShell />,
            children: [
              {
                path: '/',
                element: <AnnualMarketingCalendarPage />,
              },
              {
                path: '/calendar',
                element: <AnnualMarketingCalendarPage />,
              },
              {
                path: '/protected',
                element: <PlaceholderPage />,
              },
            ],
          },
        ],
      },
      {
        path: '/404',
        element: <NotFoundPage />,
      },
      {
        path: '/500',
        element: <ServerErrorPage />,
      },
      {
        path: '*',
        element: <Navigate to="/404" replace />,
      },
    ],
  },
]);

import { createBrowserRouter, Navigate } from 'react-router-dom'

import { GuestRoute } from '@/components/GuestRoute'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { RootRedirect } from '@/components/RootRedirect'
import { AppShell } from '@/components/layout/AppShell'
import { CalendarPage } from '@/pages/CalendarPage'
import { LoginPage } from '@/pages/LoginPage'
import { NotFound } from '@/pages/NotFound'
import { ServerError } from '@/pages/ServerError'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    ),
  },
  {
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/calendar',
        element: <CalendarPage />,
      },
    ],
  },
  {
    path: '/',
    element: <RootRedirect />,
  },
  {
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '/500',
    element: <ServerError />,
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
])

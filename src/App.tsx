import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'

import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ValidationAuthBootstrap } from '@/components/ValidationAuthBootstrap'
import { Toaster } from '@/components/ui/sonner'
import { router } from '@/routes'
import { AppProvider } from '@/stores/AppContext'
import { AuthProvider } from '@/stores/AuthContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <AuthProvider>
            <ValidationAuthBootstrap />
            <RouterProvider router={router} />
            <Toaster />
          </AuthProvider>
        </AppProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

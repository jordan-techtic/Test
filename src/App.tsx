import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'

import { AuthBootstrapGate } from '@/components/AuthBootstrapGate'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { MarketingDataLoader } from '@/components/MarketingDataLoader'
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
            <MarketingDataLoader />
            <AuthBootstrapGate>
              <RouterProvider router={router} />
              <Toaster />
            </AuthBootstrapGate>
          </AuthProvider>
        </AppProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

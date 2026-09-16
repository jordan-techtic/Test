import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ValidationAuthBootstrap } from '@/components/ValidationAuthBootstrap';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { router } from '@/routes';
import { AppProvider } from '@/stores/AppContext';
import { AppLayoutProvider } from '@/stores/AppLayoutProvider';
import { AuthProvider } from '@/stores/AuthProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export function AppProviders() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayoutProvider>
        <AuthProvider>
          <ValidationAuthBootstrap />
          <AppProvider>
            <TooltipProvider>
              <ErrorBoundary>
                <RouterProvider router={router} />
                <Toaster richColors closeButton />
              </ErrorBoundary>
            </TooltipProvider>
          </AppProvider>
        </AuthProvider>
      </AppLayoutProvider>
    </QueryClientProvider>
  );
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App';
import { Theme } from '@/theme';
import ErrorBoundary from '@/components/layout/ErrorBoundary';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import '@/lib/api/interceptor';
import '@/index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <Theme>
      <ErrorBoundary>
        <TooltipProvider>
          <App />
          <Toaster />
        </TooltipProvider>
      </ErrorBoundary>
    </Theme>
  </StrictMode>,
);

import { useEffect } from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import AppRouter from '@/routes';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { UNAUTHORIZED_EVENT } from '@/lib/auth/session';

function UnauthorizedRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    function onUnauthorized() {
      navigate('/', { replace: true });
    }
    window.addEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
  }, [navigate]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <UnauthorizedRedirect />
      <div className="flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-[8px] focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
        >
          Skip to main content
        </a>
        <Header />
        <div className="flex min-h-0 flex-1">
          <Sidebar />
          <main id="main-content" className="min-w-0 flex-1 p-4 md:p-6">
            <AppRouter />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

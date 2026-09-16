import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { MarketingResourcesPrefetch } from '@/components/MarketingResourcesPrefetch';
import { setupApiInterceptors } from '@/lib/api/interceptors';
import { useAuth } from '@/stores/AuthProvider';

export function RootLayout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    setupApiInterceptors(() => {
      logout();
      navigate('/login', { replace: true });
    });
  }, [logout, navigate]);

  return (
    <>
      <MarketingResourcesPrefetch />
      <Outlet />
    </>
  );
}

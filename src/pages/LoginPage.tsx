import { useEffect } from 'react';

import { FigmaLoginPage } from '@/components/luna-figma/FigmaLoginPage';

export default function LoginPage() {
  useEffect(() => {
    document.title = 'Sign In | Agentwise';
  }, []);

  return <FigmaLoginPage />;
}

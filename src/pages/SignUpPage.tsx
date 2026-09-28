import { useEffect } from 'react';

import { FigmaSignUpPage } from '@/components/luna-figma/FigmaSignUpPage';

export default function SignUpPage() {
  useEffect(() => {
    document.title = 'Sign Up | Agentwise';
  }, []);

  return <FigmaSignUpPage />;
}

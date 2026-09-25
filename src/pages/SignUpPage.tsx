import { useEffect } from 'react';

import { FigmaScreenPage } from '../components/luna-figma/FigmaScreenPage';

export default function SignUpPage() {
  useEffect(() => {
    document.title = 'Sign Up | Agentwise';
  }, []);

  return <FigmaScreenPage />;
}

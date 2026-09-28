import { useEffect } from 'react';

import { FigmaScreenPage } from '@/components/luna-figma/FigmaScreenPage';

export default function HomePage() {
  useEffect(() => {
    document.title = 'Agentwise';
  }, []);

  return <FigmaScreenPage />;
}

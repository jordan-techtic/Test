import { useEffect } from 'react';

import { FigmaHomePage } from '../components/luna-figma/FigmaHomePage';
import { useVisitorHome } from '../hooks/useVisitorHome';

export default function HomePage() {
  const { status, data, error } = useVisitorHome();

  useEffect(() => {
    document.title = 'Agentwise';
  }, []);

  return (
    <FigmaHomePage
      visitorHome={data}
      apiStatus={status}
      apiError={error}
    />
  );
}

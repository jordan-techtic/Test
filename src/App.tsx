import { useSyncExternalStore } from 'react';
import { OffCanvasApiStatus } from './components/OffCanvasApiStatus';
import { FigmaAboutUsScreenPage } from './components/luna-figma/FigmaAboutUsScreenPage';
import { FigmaScreenPage } from './components/luna-figma/FigmaScreenPage';
import { FigmaSignInScreenPage } from './components/luna-figma/FigmaSignInScreenPage';
import { useAboutUs } from './hooks/useAboutUs';
import { useVisitorHome } from './hooks/useVisitorHome';

function subscribeToPath(onStoreChange: () => void): () => void {
  window.addEventListener('popstate', onStoreChange);
  return () => window.removeEventListener('popstate', onStoreChange);
}

function getPathname(): string {
  return window.location.pathname;
}

function VisitorHomeApiBinding() {
  const { loading, error } = useVisitorHome();
  return <OffCanvasApiStatus label="Visitor home" loading={loading} error={error} />;
}

function AboutUsApiBinding() {
  const { loading, error } = useAboutUs();
  return <OffCanvasApiStatus label="About us" loading={loading} error={error} />;
}

export default function App() {
  const pathname = useSyncExternalStore(subscribeToPath, getPathname, () => '/');

  if (pathname === '/login') {
    return (
      <>
        <FigmaSignInScreenPage />
        <VisitorHomeApiBinding />
      </>
    );
  }

  if (pathname === '/about-us') {
    return (
      <>
        <FigmaAboutUsScreenPage />
        <AboutUsApiBinding />
      </>
    );
  }

  return (
    <>
      <FigmaScreenPage />
      <VisitorHomeApiBinding />
    </>
  );
}

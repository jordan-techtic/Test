import { useSyncExternalStore } from 'react';
import { AboutUsPage } from './api/about-us';
import { OffCanvasApiStatus } from './components/OffCanvasApiStatus';
import { FigmaFrameShell } from './components/luna-figma/FigmaFrameShell';
import { FigmaScreenPage } from './components/luna-figma/FigmaScreenPage';
import { FigmaSection_n_2270_14191 } from './components/luna-figma/FigmaSection_n_2270_14191';
import { FigmaSection_n_2270_14193 } from './components/luna-figma/FigmaSection_n_2270_14193';
import { FigmaSection_n_2270_14699 } from './components/luna-figma/FigmaSection_n_2270_14699';
import { FigmaSection_n_2270_16773 } from './components/luna-figma/FigmaSection_n_2270_16773';
import { FigmaSection_n_2295_3500 } from './components/luna-figma/FigmaSection_n_2295_3500';
import { FigmaSection_n_2295_3505 } from './components/luna-figma/FigmaSection_n_2295_3505';
import { FigmaSection_n_2729_13112 } from './components/luna-figma/FigmaSection_n_2729_13112';
import { FigmaSection_n_3330_1780 } from './components/luna-figma/FigmaSection_n_3330_1780';
import { FigmaSection_n_3361_6461 } from './components/luna-figma/FigmaSection_n_3361_6461';
import { FigmaSection_n_3654_11564 } from './components/luna-figma/FigmaSection_n_3654_11564';
import { FigmaSection_n_4008_20203 } from './components/luna-figma/FigmaSection_n_4008_20203';
import { FigmaSection_n_632_836 } from './components/luna-figma/FigmaSection_n_632_836';
import { FigmaSection_n_856_1700 } from './components/luna-figma/FigmaSection_n_856_1700';
import { FigmaSignInScreenPage } from './components/luna-figma/FigmaSignInScreenPage';
import { useAboutUs } from './hooks/useAboutUs';
import { useVisitorHome } from './hooks/useVisitorHome';
import {
  FigmaSpecMaskGroupSection,
  FigmaSpecThreeStepsHeadline,
} from 'virtual:luna-screen-spec-emit';

const HOME_FRAME_HEIGHT = 6943;

function subscribeToPath(onStoreChange: () => void): () => void {
  window.addEventListener('popstate', onStoreChange);
  return () => window.removeEventListener('popstate', onStoreChange);
}

function getPathname(): string {
  return window.location.pathname;
}

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function VisitorHomeApiBinding() {
  const { loading, error } = useVisitorHome();
  return <OffCanvasApiStatus label="Visitor home" loading={loading} error={error} />;
}

function AboutUsApiBinding() {
  const { loading, error } = useAboutUs();
  return <OffCanvasApiStatus label="About us" loading={loading} error={error} />;
}

function FigmaHomeScreenPage() {
  return (
    <div className="relative flex w-full flex-col" style={{ backgroundColor: '#0b0b0b' }}>
      <main className="relative z-10 flex w-full flex-col">
        <FigmaFrameShell frameWidth={1920} frameHeight={HOME_FRAME_HEIGHT} nodeId="2241:1459">
          <FigmaSection_n_3361_6461 />
          <FigmaSection_n_3330_1780 />
          <FigmaSection_n_4008_20203 />
          <FigmaSection_n_632_836 />
          <FigmaSection_n_856_1700 />
          <FigmaSection_n_2295_3500 />
          <FigmaSpecMaskGroupSection />
          <FigmaSpecThreeStepsHeadline />
          <FigmaSection_n_2270_14191 />
          <FigmaSection_n_2270_14193 />
          <FigmaSection_n_2270_14699 />
          <FigmaSection_n_3654_11564 />
          <FigmaSection_n_2295_3505 />
          <FigmaSection_n_2729_13112 />
          <FigmaSection_n_2270_16773 />
        </FigmaFrameShell>
      </main>
    </div>
  );
}

export default function App() {
  const pathname = normalizePath(useSyncExternalStore(subscribeToPath, getPathname, () => '/'));

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
        <AboutUsPage />
        <AboutUsApiBinding />
      </>
    );
  }

  if (pathname === '/sign-up' || pathname === '/join') {
    return <FigmaScreenPage />;
  }

  if (pathname === '/') {
    return (
      <>
        <FigmaHomeScreenPage />
        <VisitorHomeApiBinding />
      </>
    );
  }

  return (
    <>
      <FigmaHomeScreenPage />
      <VisitorHomeApiBinding />
    </>
  );
}

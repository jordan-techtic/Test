import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { AboutUsPage } from './api/about-us';
import { OffCanvasApiStatus } from './components/OffCanvasApiStatus';
import { FigmaFrameShell } from './components/luna-figma/FigmaFrameShell';
import { FigmaSection_n_1006_1334 } from './components/luna-figma/FigmaSection_n_1006_1334';
import { FigmaSection_n_1006_1336 } from './components/luna-figma/FigmaSection_n_1006_1336';
import { FigmaSection_n_1006_1338 } from './components/luna-figma/FigmaSection_n_1006_1338';
import { FigmaSection_n_1007_1733 } from './components/luna-figma/FigmaSection_n_1007_1733';
import { FigmaSection_n_2270_14191 } from './components/luna-figma/FigmaSection_n_2270_14191';
import { FigmaSection_n_2270_14193 } from './components/luna-figma/FigmaSection_n_2270_14193';
import { FigmaSection_n_2270_14699 } from './components/luna-figma/FigmaSection_n_2270_14699';
import { FigmaSection_n_2270_16773 } from './components/luna-figma/FigmaSection_n_2270_16773';
import { FigmaSection_n_2295_3500 } from './components/luna-figma/FigmaSection_n_2295_3500';
import { FigmaSection_n_2295_3505 } from './components/luna-figma/FigmaSection_n_2295_3505';
import { FigmaSection_n_2729_13112 } from './components/luna-figma/FigmaSection_n_2729_13112';
import { FigmaSection_n_3330_1780 } from './components/luna-figma/FigmaSection_n_3330_1780';
import { FigmaSection_n_3654_11564 } from './components/luna-figma/FigmaSection_n_3654_11564';
import { FigmaSection_n_4008_20203 } from './components/luna-figma/FigmaSection_n_4008_20203';
import { FigmaSection_n_632_836 } from './components/luna-figma/FigmaSection_n_632_836';
import { FigmaSection_n_856_1700 } from './components/luna-figma/FigmaSection_n_856_1700';
import { FigmaSignInScreenPage } from './components/luna-figma/FigmaSignInScreenPage';
import { useAboutUs } from './hooks/useAboutUs';
import { useVisitorHome } from './hooks/useVisitorHome';
import { DashboardStubPage } from './pages/DashboardStubPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { PlaceholderLegalPage } from './pages/PlaceholderLegalPage';
import type { AboutUsContent } from './types/api';
import {
  FigmaSpecFrame1618873475Section,
  FigmaSpecGroup33654419Section,
  FigmaSpecMaskGroupSection,
  FigmaSpecThreeStepsHeadline,
} from 'virtual:luna-screen-spec-emit';

const HOME_FRAME_HEIGHT = 6943;

const ABOUT_US_TEXT_BINDINGS: Array<{ nodeId: string; field: keyof AboutUsContent }> = [
  { nodeId: '572:3937', field: 'mission_statement' },
  { nodeId: '572:3934', field: 'story' },
  { nodeId: '639:2642', field: 'team_intro' },
  { nodeId: '643:3290', field: 'contact_email' },
  { nodeId: '643:2729', field: 'mission_statement' },
  { nodeId: '643:2730', field: 'story' },
];

function applyAboutUsContent(data: AboutUsContent | null): void {
  for (const binding of ABOUT_US_TEXT_BINDINGS) {
    const value = data?.[binding.field];
    if (typeof value !== 'string' || value.trim() === '') {
      continue;
    }
    const element = document.querySelector(`[data-figma-node="${binding.nodeId}"]`);
    if (!element) {
      continue;
    }
    element.textContent = value;
  }
}

function VisitorHomeApiBinding() {
  const { loading, error } = useVisitorHome();
  return <OffCanvasApiStatus label="Visitor home" loading={loading} error={error} />;
}

function AboutUsApiBinding() {
  const { data, loading, error } = useAboutUs();

  useEffect(() => {
    if (loading || error) {
      return;
    }
    applyAboutUsContent(data);
  }, [data, loading, error]);

  return <OffCanvasApiStatus label="About us" loading={loading} error={error} />;
}

function FigmaHomeScreenPage() {
  return (
    <div className="relative flex w-full flex-col" style={{ backgroundColor: '#0b0b0b' }}>
      <main className="relative z-10 flex w-full flex-col">
        <FigmaFrameShell frameWidth={1920} frameHeight={HOME_FRAME_HEIGHT} nodeId="2241:1459">
          <FigmaSpecFrame1618873475Section />
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

function FigmaSignUpScreenPage() {
  return (
    <div className="relative flex w-full flex-col" style={{ backgroundColor: '#0b0b0b' }}>
      <main className="relative z-10 flex w-full flex-col">
        <FigmaFrameShell frameWidth={1440} frameHeight={850} nodeId="1006:1333">
          <FigmaSection_n_1006_1334 />
          <FigmaSection_n_1006_1336 />
          <FigmaSection_n_1006_1338 />
          <FigmaSpecGroup33654419Section />
          <FigmaSection_n_1007_1733 />
        </FigmaFrameShell>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <FigmaHomeScreenPage />
            <VisitorHomeApiBinding />
          </>
        }
      />
      <Route path="/login" element={<FigmaSignInScreenPage />} />
      <Route
        path="/about-us"
        element={
          <>
            <AboutUsPage />
            <AboutUsApiBinding />
          </>
        }
      />
      <Route path="/sign-up" element={<FigmaSignUpScreenPage />} />
      <Route path="/join" element={<Navigate to="/sign-up" replace />} />
      <Route path="/privacy-policy" element={<PlaceholderLegalPage title="Privacy Policy" />} />
      <Route path="/terms-of-service" element={<PlaceholderLegalPage title="Terms of Service" />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/dashboard" element={<DashboardStubPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { OffCanvasApiStatus } from './components/OffCanvasApiStatus';
import { AboutUsPage } from './components/luna-figma/FigmaAboutUsScreenPage';
import { FigmaFrameShell } from './components/luna-figma/FigmaFrameShell';
import { FigmaSection_n_1007_1733 } from './components/luna-figma/FigmaSection_n_1007_1733';
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
  FigmaSpecGroup33654419Section,
  FigmaSpecMaskGroupSection,
  FigmaSpecThreeStepsHeadline,
} from 'virtual:luna-screen-spec-emit';

const HOME_FRAME_HEIGHT = 6943;

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

function FigmaSignUpScreenPage() {
  return (
    <div className="relative flex w-full flex-col" style={{ backgroundColor: '#0b0b0b' }}>
      <main className="relative z-10 flex w-full flex-col">
        <FigmaFrameShell frameWidth={1440} frameHeight={850} nodeId="frame">
          <FigmaSpecGroup33654419Section />
          <FigmaSection_n_1007_1733 />
        </FigmaFrameShell>
      </main>
    </div>
  );
}

function LegalStubPage({ title }: { title: string }) {
  return (
    <div className="relative flex min-h-[40vh] w-full flex-col items-center justify-center p-[40px]" style={{ backgroundColor: '#0b0b0b' }}>
      <h1 className="font-eb-garamond text-[48px] font-[500] capitalize text-[#ffffff]">{title}</h1>
      <p className="mt-4 font-almarai text-[18px] text-[#ffffff] opacity-[0.6]">
        Content for this page will be published here.
      </p>
      <a href="/" className="mt-8 font-almarai text-[18px] text-[#c8a47e] no-underline hover:opacity-90">
        Back to home
      </a>
    </div>
  );
}

function DashboardStubPage() {
  return (
    <div className="relative flex min-h-[40vh] w-full flex-col items-center justify-center p-[40px]" style={{ backgroundColor: '#0b0b0b' }}>
      <h1 className="font-eb-garamond text-[48px] font-[500] capitalize text-[#ffffff]">Dashboard</h1>
      <p className="mt-4 font-almarai text-[18px] text-[#ffffff] opacity-[0.6]">Sign in to access your dashboard.</p>
      <a href="/login" className="mt-8 font-almarai text-[18px] text-[#c8a47e] no-underline hover:opacity-90">
        Sign in
      </a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
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
        <Route path="/privacy-policy" element={<LegalStubPage title="Privacy Policy" />} />
        <Route path="/terms-of-service" element={<LegalStubPage title="Terms of Service" />} />
        <Route path="/forgot-password" element={<LegalStubPage title="Forgot Password" />} />
        <Route path="/dashboard" element={<DashboardStubPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

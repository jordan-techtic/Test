import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ContentLibraryProvider } from "./contentLibraryContext";
import { OffCanvasLiveRegion } from "./components/OffCanvasLiveRegion";
import { FigmaScreenPage } from "./components/luna-figma/FigmaScreenPage";
import { RequireAuth } from "./features/auth/RequireAuth";
import { ProfileFormProvider, useProfileForm } from "./features/profile/ProfileFormContext";
import { ForgotPasswordFigmaScreenPage } from "./components/luna-figma/ForgotPasswordFigmaScreenPage";
import { SignInFigmaScreenPage } from "./components/luna-figma/SignInFigmaScreenPage";
import { SignUpFigmaScreenPage } from "./components/luna-figma/SignUpFigmaScreenPage";
import { FigmaFrameShell } from "./components/luna-figma/FigmaFrameShell";
import { FigmaSection_n_3047_21238 } from "./components/luna-figma/FigmaSection_n_3047_21238";
import { FigmaSection_n_3047_21248 } from "./components/luna-figma/FigmaSection_n_3047_21248";
import { FigmaSection_n_3047_21251 } from "./components/luna-figma/FigmaSection_n_3047_21251";
import { FigmaSection_n_3047_21253 } from "./components/luna-figma/FigmaSection_n_3047_21253";
import { FigmaSection_n_3047_21332 } from "./components/luna-figma/FigmaSection_n_3047_21332";
import { FigmaSection_n_3047_21439 } from "./components/luna-figma/FigmaSection_n_3047_21439";
import { FigmaSection_n_3047_21443 } from "./components/luna-figma/FigmaSection_n_3047_21443";
import { FigmaSection_n_3047_21857 } from "./components/luna-figma/FigmaSection_n_3047_21857";
import { FigmaSection_n_3361_5525 } from "./components/luna-figma/FigmaSection_n_3361_5525";

function ContentLibraryFigmaScreenPage() {
  return (
    <ContentLibraryProvider>
      <div
        className="relative flex w-full flex-col"
        style={{ backgroundColor: "#0b0b0b" }}
      >
        <main className="relative z-10 flex w-full flex-col">
          <FigmaFrameShell frameWidth={1440} frameHeight={1043} nodeId="frame">
            <FigmaSection_n_3047_21238 />
            <FigmaSection_n_3047_21248 />
            <FigmaSection_n_3047_21251 />
            <FigmaSection_n_3047_21253 />
            <FigmaSection_n_3047_21332 />
            <FigmaSection_n_3047_21439 />
            <FigmaSection_n_3047_21443 />
            <FigmaSection_n_3047_21857 />
            <FigmaSection_n_3361_5525 />
          </FigmaFrameShell>
        </main>
      </div>
    </ContentLibraryProvider>
  );
}

function ProfileLiveRegion() {
  const { statusMessage } = useProfileForm();
  return <OffCanvasLiveRegion message={statusMessage} />;
}

function ProfileFigmaScreenPage() {
  return (
    <ProfileFormProvider>
      <ProfileLiveRegion />
      <FigmaScreenPage />
    </ProfileFormProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/content-library" replace />} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <ProfileFigmaScreenPage />
            </RequireAuth>
          }
        />
        <Route path="/sign-up" element={<SignUpFigmaScreenPage />} />
        <Route path="/sign-in" element={<SignInFigmaScreenPage />} />
        <Route path="/login" element={<Navigate to="/sign-in" replace />} />
        <Route path="/forgot-password" element={<ForgotPasswordFigmaScreenPage />} />
        <Route path="/content-library" element={<ContentLibraryFigmaScreenPage />} />
      </Routes>
    </BrowserRouter>
  );
}

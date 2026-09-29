import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { FigmaScreenPage } from "./components/luna-figma/FigmaScreenPage";
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
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/content-library" replace />} />
        <Route path="/content-library" element={<ContentLibraryFigmaScreenPage />} />
        <Route path="/forgot-password" element={<FigmaScreenPage />} />
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { FigmaScreenPage } from "./components/luna-figma/FigmaScreenPage";

function RoutePlaceholder({ title }: { title: string }) {
  return (
    <main
      className="min-h-screen bg-[#0b0b0b] text-[#ffffff] flex items-center justify-center font-almarai text-[18px]"
      aria-live="polite"
    >
      {title}
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FigmaScreenPage />} />
        <Route path="/sign-in" element={<FigmaScreenPage />} />
        <Route path="/signup" element={<RoutePlaceholder title="Sign up" />} />
        <Route path="/dashboard" element={<RoutePlaceholder title="Dashboard" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { FigmaScreenPage } from "./components/luna-figma/FigmaScreenPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FigmaScreenPage />} />
        <Route path="/sign-in" element={<FigmaScreenPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

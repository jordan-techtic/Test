import { FigmaScreenPage } from "./components/luna-figma/FigmaScreenPage";

/**
 * Luna figma routing: pathname → screen map in FigmaScreenPage (no React Router).
 * Protected GET /api/dashboard and GET /api/profile run only from useFigmaScreenData
 * when a bearer token exists in sessionStorage; missing token skips fetch until sign-in.
 */
export default function App() {
  return <FigmaScreenPage />;
}

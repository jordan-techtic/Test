import { FigmaScreenPage } from "./components/luna-figma/FigmaScreenPage";
import { getStoredAccessToken } from "./lib/api-base";

const PROTECTED_PATHS = new Set(["dashboard", "updated-dashboard", "profile"]);

function normalizePathname(): string {
  return window.location.pathname.replace(/^\/+|\/+$/g, "");
}

/**
 * Luna figma routing: pathname → screen map in FigmaScreenPage (no React Router).
 * Protected routes redirect to sign-in before the screen mounts when no bearer token exists.
 */
export default function App() {
  const path = normalizePathname();
  if (PROTECTED_PATHS.has(path) && !getStoredAccessToken()) {
    window.location.replace("/sign-in");
    return null;
  }
  return <FigmaScreenPage />;
}

/**
 * Luna generated page
 * Page: FigmaScreenPage
 * Ownership: Figma-owned layout
 * Behavior: useFigmaScreenData / figmaFieldContract
 * luna-spec-codegen: owned-layout
 */
import type { ReactElement } from "react";
import { getStoredAccessToken } from "../../lib/api/token";
import { FigmaScreenDataProvider } from "./useFigmaScreenData";
import { DashboardPage } from "./DashboardPage";
import { SignInPage } from "./SignInPage";
import { ProfilePage } from "./ProfilePage";

const routes: Record<string, () => ReactElement> = {
  "": DashboardPage,
  "dashboard": DashboardPage,
  "updated-dashboard": DashboardPage,
  "sign-in": SignInPage,
  "profile": ProfilePage
};

// Project pages linked from this design whose screens are not built yet.
const PENDING_ROUTES: ReadonlySet<string> = new Set(["content", "forgot-password", "ultimate-mind"]);

const AUTH_REQUIRED_ROUTES: ReadonlySet<string> = new Set([
  "",
  "dashboard",
  "updated-dashboard",
  "profile",
]);

function FigmaRouteNotFound({ path }: { path: string }) {
  const pending = PENDING_ROUTES.has(path);
  return (
    <main
      role="alert"
      data-figma-route-error={pending ? "pending" : "not_found"}
      data-figma-route={path}
      className="flex min-h-screen items-center justify-center p-6 text-center text-[#ffffff]"
      style={{ backgroundColor: "#0b0b0b" }}
    >
      <p className="font-almarai text-[16px] font-[400] leading-[24px] text-[#ffffff] opacity-[0.6]">
        {pending
          ? `/${path} is a page that has not been built yet.`
          : `No page exists at /${path}.`}
      </p>
    </main>
  );
}

export function FigmaScreenPage() {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
  const Screen = routes[path];
  if (!Screen) {
    return <FigmaRouteNotFound path={path} />;
  }
  if (AUTH_REQUIRED_ROUTES.has(path) && !getStoredAccessToken()) {
    return (
      <FigmaScreenDataProvider routePath="sign-in">
        <SignInPage />
      </FigmaScreenDataProvider>
    );
  }
  return (
    <FigmaScreenDataProvider routePath={path}>
      <Screen />
    </FigmaScreenDataProvider>
  );
}

/** luna-spec-codegen: owned-layout */
import type { ReactElement } from "react";
import { FigmaScreen_n_4543_3496 } from "./FigmaScreen_n_4543_3496";
import { FigmaScreen_n_1006_1333 } from "./FigmaScreen_n_1006_1333";
import { FigmaScreen_n_998_1024 } from "./FigmaScreen_n_998_1024";
import { FigmaScreen_n_3158_22053 } from "./FigmaScreen_n_3158_22053";

const routes: Record<string, () => ReactElement> = {
  dashboard: FigmaScreen_n_4543_3496,
  "updated-dashboard": FigmaScreen_n_4543_3496,
  signup: FigmaScreen_n_1006_1333,
  "sign-up": FigmaScreen_n_1006_1333,
  "sign-in": FigmaScreen_n_998_1024,
  profile: FigmaScreen_n_3158_22053,
};

export function FigmaScreenPage() {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
  const Screen = routes[path] ?? FigmaScreen_n_4543_3496;
  return <Screen />;
}

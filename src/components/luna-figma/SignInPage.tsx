/**
 * Luna generated page
 * Figma frame: 998:1024
 * Page: Sign In
 * Route: /signin
 * Ownership: Figma-owned layout
 * Behavior: useFigmaScreenData / figmaFieldContract
 * luna-spec-codegen: owned-layout
 */
import "./figma-fonts.css";
import "./figma-responsive.css";
import { FigmaFrameShell } from "./FigmaFrameShell";
import { useFigmaScreenData } from "./useFigmaScreenData";
import { Section_n_1091_231 } from "./Section_n_1091_231";
import { Section_n_1001_1326 } from "./Section_n_1001_1326";
import { Section_n_1001_1330 } from "./Section_n_1001_1330";
import { WelcomeToAgentwiseSection } from "./WelcomeToAgentwiseSection";
import { Section_n_1001_1328 } from "./Section_n_1001_1328";

export function SignInPage() {
  const screenData = useFigmaScreenData();
  return (
    <div
      data-figma-bound={screenData.bound}
      data-figma-frame="998:1024"
      className="relative flex w-full flex-col"
      style={{ backgroundColor: "#0b0b0b" }}
    >
      <main className="relative z-10 flex w-full flex-col">
        <FigmaFrameShell frameWidth={1440} frameHeight={850} nodeId="frame">
        <Section_n_1091_231 />
        <Section_n_1001_1326 />
        <Section_n_1001_1330 />
        <WelcomeToAgentwiseSection />
        <Section_n_1001_1328 />
        </FigmaFrameShell>
      </main>
    </div>
  );
}

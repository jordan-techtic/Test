/**
 * Luna generated page
 * Figma frame: 572:2518
 * Page: About Us
 * Route: /about-us
 * Ownership: Figma-owned layout
 * Behavior: useFigmaScreenData / figmaFieldContract
 * luna-spec-codegen: owned-layout
 */
import "./figma-fonts.css";
import "./figma-responsive.css";
import { FigmaFrameShell } from "./FigmaFrameShell";
import { useFigmaScreenData } from "./useFigmaScreenData";
import { PricingSection } from "./PricingSection";
import { AboutSection } from "./AboutSection";
import { Section_n_3785_1859 } from "./Section_n_3785_1859";
import { FullScaleProfessionalContentLibrarySection } from "./FullScaleProfessionalContentLibrarySection";
import { TheProblemSection } from "./TheProblemSection";
import { OurStorySection } from "./OurStorySection";
import { MeetOurTeamSection } from "./MeetOurTeamSection";

export function AboutUsPage() {
  const screenData = useFigmaScreenData();
  return (
    <div
      data-figma-bound={screenData.bound}
      data-figma-frame="572:2518"
      className="relative flex w-full flex-col"
      style={{ backgroundColor: "#0e0d0d" }}
    >
      <main className="relative z-10 flex w-full flex-col">
        <FigmaFrameShell frameWidth={1920} frameHeight={6158} nodeId="frame">
        <PricingSection />
        <AboutSection />
        <Section_n_3785_1859 />
        <FullScaleProfessionalContentLibrarySection />
        <TheProblemSection />
        <OurStorySection />
        <MeetOurTeamSection />
        </FigmaFrameShell>
      </main>
    </div>
  );
}

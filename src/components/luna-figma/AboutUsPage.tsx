/** luna-spec-codegen: owned-layout */
import "./figma-fonts.css";
import "./figma-responsive.css";
import { FigmaFrameShell } from "./FigmaFrameShell";
import { useFigmaScreenData } from "./useFigmaScreenData";
import { Section_n_3361_6461 } from "./Section_n_3361_6461";
import { Section_n_3527_5463 } from "./Section_n_3527_5463";
import { Section_n_3785_1859 } from "./Section_n_3785_1859";
import { Section_n_4008_20203 } from "./Section_n_4008_20203";
import { Section_n_632_836 } from "./Section_n_632_836";
import { Section_n_856_1700 } from "./Section_n_856_1700";
import { Section_n_863_4306 } from "./Section_n_863_4306";

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
        <Section_n_3361_6461 />
        <Section_n_3527_5463 />
        <Section_n_3785_1859 />
        <Section_n_4008_20203 />
        <Section_n_632_836 />
        <Section_n_856_1700 />
        <Section_n_863_4306 />
        </FigmaFrameShell>
      </main>
    </div>
  );
}

/** luna-spec-codegen: owned-layout */
import "./figma-fonts.css";
import { FigmaFrameShell } from "./FigmaFrameShell";
import { useFigmaScreenData } from "./useFigmaScreenData";
import { FigmaSection_n_1091_231 } from "./FigmaSection_n_1091_231";
import { FigmaSection_n_1001_1326 } from "./FigmaSection_n_1001_1326";
import { FigmaSection_n_1001_1330 } from "./FigmaSection_n_1001_1330";
import { FigmaSection_n_998_1033 } from "./FigmaSection_n_998_1033";
import { FigmaSection_n_1001_1328 } from "./FigmaSection_n_1001_1328";

export function FigmaScreen_n_998_1024() {
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
        <FigmaSection_n_1091_231 />
        <FigmaSection_n_1001_1326 />
        <FigmaSection_n_1001_1330 />
        <FigmaSection_n_998_1033 />
        <FigmaSection_n_1001_1328 />
        </FigmaFrameShell>
      </main>
    </div>
  );
}

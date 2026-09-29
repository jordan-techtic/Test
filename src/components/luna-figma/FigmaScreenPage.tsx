/** luna-spec-codegen: owned-layout */
import { FigmaFrameShell } from "./FigmaFrameShell";
import { FigmaSection_n_1091_246 } from "./FigmaSection_n_1091_246";
import { FigmaSection_n_1018_1101 } from "./FigmaSection_n_1018_1101";
import { FigmaSection_n_1018_1105 } from "./FigmaSection_n_1018_1105";
import { FigmaSection_n_1018_1107 } from "./FigmaSection_n_1018_1107";
import { FigmaSection_n_1018_1103 } from "./FigmaSection_n_1018_1103";

export function FigmaScreenPage() {
  return (
    <div
      className="relative flex w-full flex-col"
      style={{ backgroundColor: "#0b0b0b" }}
    >
      <main className="relative z-10 flex w-full flex-col">
        <FigmaFrameShell frameWidth={1440} frameHeight={850} nodeId="frame">
        <FigmaSection_n_1091_246 />
        <FigmaSection_n_1018_1101 />
        <FigmaSection_n_1018_1105 />
        <FigmaSection_n_1018_1107 />
        <FigmaSection_n_1018_1103 />
        </FigmaFrameShell>
      </main>
    </div>
  );
}

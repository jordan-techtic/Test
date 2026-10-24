/** luna-spec-codegen: owned-layout */
import "./figma-fonts.css";
import { FigmaFrameShell } from "./FigmaFrameShell";
import { FigmaOverlayCanvas } from "./FigmaOverlayCanvas";
import { FigmaSection_n_1006_1334 } from "./FigmaSection_n_1006_1334";
import { FigmaSection_n_1006_1338 } from "./FigmaSection_n_1006_1338";
import { FigmaSection_n_2779_25547 } from "./FigmaSection_n_2779_25547";
import { FigmaSection_n_1007_1733 } from "./FigmaSection_n_1007_1733";
import { FigmaSection_n_1006_1336 } from "./FigmaSection_n_1006_1336";

export function FigmaScreenPage() {
  return (
    <div
      className="relative flex w-full flex-col"
      style={{ backgroundColor: "#0b0b0b" }}
    >
      <main className="relative z-10 flex w-full flex-col">
        <FigmaFrameShell frameWidth={1440} frameHeight={850} nodeId="frame">
        <FigmaSection_n_1006_1334 />
        <FigmaSection_n_1006_1338 />
        <FigmaSection_n_2779_25547 />
        <FigmaSection_n_1007_1733 />
        <FigmaSection_n_1006_1336 />
        </FigmaFrameShell>
      </main>
      <FigmaOverlayCanvas canvasHeight={1599} frameWidth={1440} zIndex={0}>
        {null}
      </FigmaOverlayCanvas>
    </div>
  );
}

/** luna-spec-codegen: owned-layout */
import "./figma-fonts.css";
import { FigmaFrameShell } from "./FigmaFrameShell";
import { FigmaSection_n_3158_22054 } from "./FigmaSection_n_3158_22054";
import { FigmaSection_n_3158_22259 } from "./FigmaSection_n_3158_22259";
import { FigmaSection_n_3158_22262 } from "./FigmaSection_n_3158_22262";
import { FigmaSection_n_3158_22607 } from "./FigmaSection_n_3158_22607";
import { FigmaSection_n_3158_22895 } from "./FigmaSection_n_3158_22895";
import { FigmaSection_n_3158_23028 } from "./FigmaSection_n_3158_23028";

export function FigmaScreenPage() {
  return (
    <div
      className="relative flex w-full flex-col"
      style={{ backgroundColor: "#0b0b0b" }}
    >
      <main className="relative z-10 flex w-full flex-col">
        <FigmaFrameShell frameWidth={1440} frameHeight={1218} nodeId="frame">
        <FigmaSection_n_3158_22054 />
        <FigmaSection_n_3158_22259 />
        <FigmaSection_n_3158_22262 />
        <FigmaSection_n_3158_22607 />
        <FigmaSection_n_3158_22895 />
        <FigmaSection_n_3158_23028 />
        <div className="pointer-events-none absolute inset-0 z-[8]">
          <img data-figma-node="3158:22263" src="/assets/figma/3158-22263.png" alt="Dashboard/Nav/Vertical" className="box-border w-[240px] h-[840px] absolute left-[0px] top-[0px] max-w-none object-cover object-top" />
        </div>
        </FigmaFrameShell>
      </main>
    </div>
  );
}

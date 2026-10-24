/** luna-spec-codegen: owned-layout */
import { useRef, type ReactNode } from "react";

import { FRAME_WIDTH, useFrameScale } from "./useFrameScale";

interface FigmaFrameShellProps {
  frameWidth?: number;
  frameHeight: number;
  nodeId: string;
  id?: string;
  className?: string;
  marginTopPx?: number;
  children: ReactNode;
}

export function FigmaFrameShell({
  frameWidth = FRAME_WIDTH,
  frameHeight,
  nodeId,
  id,
  className = "",
  marginTopPx = 0,
  children,
}: FigmaFrameShellProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const scale = useFrameScale(frameWidth, outerRef);

  return (
    <div
      ref={outerRef}
      id={id}
      className="w-full overflow-hidden"
      style={{ height: frameHeight * scale, marginTop: marginTopPx * scale }}
    >
      <section
        data-figma-node={nodeId}
        className={`relative box-border overflow-hidden ${className}`}
        style={{
          width: frameWidth,
          height: frameHeight,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </section>
    </div>
  );
}

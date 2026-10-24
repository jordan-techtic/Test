/** luna-spec-codegen: owned-layout */
import { useRef, type ReactNode } from "react";

import { FRAME_WIDTH, useFrameScale } from "./useFrameScale";

interface FigmaOverlayCanvasProps {
  canvasHeight: number;
  frameWidth?: number;
  zIndex?: number;
  children: ReactNode;
}

export function FigmaOverlayCanvas({
  canvasHeight,
  frameWidth = FRAME_WIDTH,
  zIndex = 20,
  children,
}: FigmaOverlayCanvasProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const scale = useFrameScale(frameWidth, outerRef);

  return (
    <div
      ref={outerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex }}
    >
      <div
        className="relative"
        style={{
          width: frameWidth,
          height: canvasHeight,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}

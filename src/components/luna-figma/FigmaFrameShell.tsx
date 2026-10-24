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
  /** When false, frame children remain in the layout tree without inner overflow clipping (tall About/Home frames). */
  clipContent?: boolean;
  children: ReactNode;
}

export function FigmaFrameShell({
  frameWidth = FRAME_WIDTH,
  frameHeight,
  nodeId,
  id,
  className = "",
  marginTopPx = 0,
  clipContent = true,
  children,
}: FigmaFrameShellProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const scale = useFrameScale(frameWidth, outerRef);

  return (
    <div
      ref={outerRef}
      id={id}
      className={`w-full ${clipContent ? 'overflow-hidden' : 'overflow-visible'}`}
      style={{ height: frameHeight * scale, marginTop: marginTopPx * scale }}
    >
      <section
        data-figma-node={nodeId}
        className={`relative box-border ${clipContent ? 'overflow-hidden' : 'overflow-visible'} ${className}`}
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

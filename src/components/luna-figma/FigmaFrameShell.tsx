/**
 * Luna generated support file
 * Role: frame shell
 * Ownership: Figma-owned layout
 * luna-spec-codegen: owned-layout
 */
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
  const { scale, narrow } = useFrameScale(frameWidth, outerRef);

  return (
    <div
      ref={outerRef}
      id={id}
      className="w-full overflow-x-hidden"
      style={{
        height: narrow ? frameHeight : frameHeight * scale,
        marginTop: marginTopPx * (narrow ? 1 : scale),
      }}
    >
      <section
        data-figma-node={nodeId}
        data-figma-fluid={narrow ? "true" : undefined}
        className={`relative box-border overflow-hidden ${className}`}
        style={{
          width: narrow ? "100%" : frameWidth,
          height: frameHeight,
          ["--fw" as string]: frameWidth,
          transform: narrow ? undefined : `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </section>
    </div>
  );
}

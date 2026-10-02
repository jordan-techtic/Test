/**
 * Luna generated support file
 * Role: frame scale
 * Ownership: Figma-owned layout
 * luna-spec-codegen: owned-layout
 */
import { useEffect, useState, type RefObject } from "react";

export const FRAME_WIDTH = 1440;

/** Below this width, drop canvas scale and use fluid horizontal geometry. */
export const NARROW_FIT_MAX_WIDTH = 480;

export type FrameScaleState = { scale: number; narrow: boolean };

export function useFrameScale(
  frameWidth: number,
  outerRef: RefObject<HTMLElement | null>,
): FrameScaleState {
  const [state, setState] = useState<FrameScaleState>({ scale: 1, narrow: false });

  useEffect(() => {
    const node = outerRef.current;
    if (!node || !frameWidth) {
      return;
    }
    const apply = () => {
      const width = node.clientWidth || frameWidth;
      const narrow = width <= NARROW_FIT_MAX_WIDTH;
      // Desktop: scale the artboard to the viewport (Figma fidelity).
      // Narrow: scale=1 so type stays readable; figma-responsive.css remaps
      // left/width from --fx/--fww against --fw.
      setState({
        scale: narrow ? 1 : width / frameWidth,
        narrow,
      });
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(node);
    return () => observer.disconnect();
  }, [frameWidth, outerRef]);

  return state;
}

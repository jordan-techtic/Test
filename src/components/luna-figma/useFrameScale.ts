/** luna-spec-codegen: owned-layout */
import { useEffect, useState, type RefObject } from "react";

export const FRAME_WIDTH = 1920;

export function useFrameScale(
  frameWidth: number,
  outerRef: RefObject<HTMLElement | null>,
): number {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const node = outerRef.current;
    if (!node || !frameWidth) {
      return;
    }
    const apply = () => {
      const width = node.clientWidth || frameWidth;
      setScale(width / frameWidth);
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(node);
    return () => observer.disconnect();
  }, [frameWidth, outerRef]);

  return scale;
}

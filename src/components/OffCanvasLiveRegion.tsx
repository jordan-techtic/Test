interface OffCanvasLiveRegionProps {
  message: string;
  politeness?: 'polite' | 'assertive';
}

/** Screen-reader / off-canvas status; not inserted into Figma layout flow. */
export function OffCanvasLiveRegion({
  message,
  politeness = 'polite',
}: OffCanvasLiveRegionProps) {
  if (message.length === 0) {
    return null;
  }

  return (
    <div
      className="sr-only"
      role="status"
      aria-live={politeness}
      aria-atomic="true"
    >
      {message}
    </div>
  );
}

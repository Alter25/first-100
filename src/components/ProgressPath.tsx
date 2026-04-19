import { useEffect, useRef, useState } from "react";

const STEP_SIZE = 72;
const VERTICAL_SPACING = 72;
const PADDING_TOP = 32;
const X_OFFSETS = [0, 0.35, 0.70, 0.35, 0, -0.35, -0.70, -0.35];

interface Props {
  total: number;
  completedUpTo: number;
}

function buildPath(count: number, width: number): string {
  const cx = width / 2;
  const r = STEP_SIZE / 2;
  const points = Array.from({ length: count }, (_, i) => {
    const x = cx + X_OFFSETS[i % 8] * STEP_SIZE;
    const y = PADDING_TOP + r + i * VERTICAL_SPACING;
    return `${x},${y}`;
  });
  return `M ${points.join(" L ")}`;
}

export default function ProgressPath({ total, completedUpTo }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);
  const [width, setWidth] = useState(0);
  const [progressLen, setProgressLen] = useState(0);
  const [totalLen, setTotalLen] = useState(0);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const svgHeight = PADDING_TOP + STEP_SIZE / 2 + (total - 1) * VERTICAL_SPACING + STEP_SIZE / 2 + PADDING_TOP;
  const fullPath = width > 0 ? buildPath(total, width) : "";
  const partialPath = width > 0 && completedUpTo > 0 ? buildPath(completedUpTo, width) : "";

  useEffect(() => {
    if (!progressPathRef.current) return;
    const len = progressPathRef.current.getTotalLength();
    setProgressLen(len);
    setTotalLen(len);
  }, [partialPath]);

  return (
    <div ref={wrapperRef} className="absolute inset-0 pointer-events-none">
      {width > 0 && (
        <svg
          width={width}
          height={svgHeight}
          className="absolute top-0 left-0"
          aria-hidden="true"
        >
          {/* Background path */}
          <path
            d={fullPath}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="8 8"
          />
          {/* Progress path */}
          {completedUpTo > 0 && (
            <path
              ref={progressPathRef}
              d={partialPath}
              fill="none"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={totalLen}
              strokeDashoffset={totalLen - progressLen}
            />
          )}
        </svg>
      )}
    </div>
  );
}

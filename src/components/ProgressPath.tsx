const HALF_DIAG = (72 / 2) * Math.SQRT2; // ≈ 50.9px — center to tip of rotated 72px square

interface StepPos { cx: number; cy: number; }

interface Props {
  positions: StepPos[];
  completedUpTo: number;
  width: number;
  height: number;
}

/** Builds segments BETWEEN buttons: bottom_tip(i) → top_tip(i+1) */
function buildSegments(positions: StepPos[], from: number, to: number): string {
  const segs: string[] = [];
  for (let i = from; i < to - 1; i++) {
    const bot = `${positions[i].cx.toFixed(1)},${(positions[i].cy + HALF_DIAG).toFixed(1)}`;
    const top = `${positions[i + 1].cx.toFixed(1)},${(positions[i + 1].cy - HALF_DIAG).toFixed(1)}`;
    segs.push(`M ${bot} L ${top}`);
  }
  return segs.join(" ");
}

export default function ProgressPath({ positions, completedUpTo, width, height }: Props) {
  if (width === 0 || positions.length < 2) return null;

  const bgPath = buildSegments(positions, 0, positions.length);
  const progressPath = buildSegments(positions, 0, completedUpTo);

  return (
    <div className="absolute top-0 left-0 w-full pointer-events-none">
      <svg width={width} height={height} className="absolute top-0 left-0" aria-hidden="true">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="progressGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Background: dotted line between all steps */}
        <path
          d={bgPath}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray="3 14"
        />

        {/* Progress shadow for depth */}
        {completedUpTo > 1 && (
          <path
            d={progressPath}
            fill="none"
            stroke="rgba(0,0,0,0.25)"
            strokeWidth={8}
            strokeLinecap="round"
          />
        )}

        {/* Progress line with glow */}
        {completedUpTo > 1 && (
          <path
            d={progressPath}
            fill="none"
            stroke="url(#progressGrad)"
            strokeWidth={5}
            strokeLinecap="round"
            filter="url(#glow)"
          />
        )}
      </svg>
    </div>
  );
}

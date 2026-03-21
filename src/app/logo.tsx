export function Logo({ size = 40, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/*
        Design concept: Two overlapping arcs forming C & F
        - Left arc (C) = "Common" — community, connection
        - Right arc opening forward (F) = "Future" — progress, forward motion
        - The overlap = "&" — partnership, shared vision
        - Negative space creates a forward-pointing opening
      */}
      {/* C arc - larger, grounding */}
      <path
        d="M58 16A38 38 0 1 0 58 84"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* F arc - smaller, forward-leaning */}
      <path
        d="M42 24A30 30 0 0 1 42 76"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Center dot - the "&" point of connection */}
      <circle cx="50" cy="50" r="4" fill={color} />
    </svg>
  );
}

export function LogoFull({ height = 32, color = "currentColor" }: { height?: number; color?: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <Logo size={height} color={color} />
      <div style={{ fontSize: height * 0.38, lineHeight: 1.1, color, letterSpacing: "-0.02em" }} className="font-bold">
        Common Future
        <span className="font-light opacity-50">&nbsp;&&nbsp;Co.</span>
      </div>
    </div>
  );
}

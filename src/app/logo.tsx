export function Logo({ size = 40, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/*
        Refined concept: Two precisely balanced arcs
        - Left arc (C) = open circle, community
        - Right arc (F) = counter-arc, forward momentum
        - The gap between them = the connection point, "&"
        - Clean, geometric, balanced proportions
      */}
      {/* C arc — 270° open circle, opening to the right */}
      <path
        d="M62 18.5A36 36 0 1 0 62 81.5"
        stroke={color}
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      {/* F arc — tighter counter-curve, forward-facing */}
      <path
        d="M38 28A26 26 0 0 1 38 72"
        stroke={color}
        strokeWidth="5.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LogoFull({ height = 32, color = "currentColor" }: { height?: number; color?: string }) {
  return (
    <div className="flex items-center gap-2">
      <Logo size={height} color={color} />
      <div style={{ fontSize: height * 0.36, lineHeight: 1.1, color, letterSpacing: "-0.01em" }} className="font-bold">
        Common Future
        <span className="font-light opacity-40">&nbsp;&&nbsp;Co.</span>
      </div>
    </div>
  );
}

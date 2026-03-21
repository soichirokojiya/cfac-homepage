export function Logo({ size = 40, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer hexagon shape - represents "Common" / community */}
      <path
        d="M60 8L108 32V80L60 112L12 80V32L60 8Z"
        stroke={color}
        strokeWidth="4"
        fill="none"
      />
      {/* Inner arrow pointing forward - represents "Future" / progress */}
      <path
        d="M42 60H78M78 60L64 46M78 60L64 74"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LogoFull({ height = 32, color = "currentColor" }: { height?: number; color?: string }) {
  const scale = height / 40;
  return (
    <div className="flex items-center gap-2">
      <Logo size={height} color={color} />
      <div style={{ fontSize: height * 0.4, lineHeight: 1.2, color }} className="font-bold tracking-tight">
        <span>Common Future</span>
        <span className="font-normal opacity-60"> & Co.</span>
      </div>
    </div>
  );
}

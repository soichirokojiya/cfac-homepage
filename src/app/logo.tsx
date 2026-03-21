export function Logo({ size = 40, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Concept A: 解放 — The Release
          円が上方へ解き放たれる瞬間。
          開口部＝解放された可能性。 */}
      <path
        d="M68 22A32 32 0 1 0 68 78"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M68 22L74 16"
        stroke={color}
        strokeWidth="5"
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

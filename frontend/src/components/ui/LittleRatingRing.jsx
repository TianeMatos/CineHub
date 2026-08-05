export function LittleRatingRing({ value, size = 50 }) {
  const r = size / 2 - 5;
  const circ = 2 * Math.PI * r;
  const filled = (value / 10) * circ;
  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg className="-rotate-90" width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#ffffff0d" strokeWidth="3.5" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#fbbf24" strokeWidth="3.5"
          strokeDasharray={`${filled} ${circ}`} strokeLinecap="round" />
      </svg>
      <span className="absolute text-sm font-bold text-[#fbbf24]">{value}</span>
    </div>
  );
}
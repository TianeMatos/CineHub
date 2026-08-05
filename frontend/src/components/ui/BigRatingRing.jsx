export function BigRatingRing({ value }) {
  const pct = (value / 10) * 100;
  const r = 38;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" width="112" height="112">
        <circle cx="56" cy="56" r={r} fill="none" stroke="#ffffff10" strokeWidth="4" />
        <circle
          cx="56" cy="56" r={r} fill="none"
          stroke="#fbbf24" strokeWidth="4"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="text-center p-4">
        <p className="text-lg font-bold text-[#fbbf24] leading-none">{value.toFixed(1)}</p>
        <p className="text-[10px] text-gray-400 leading-tight mt-0.5">/ 10</p>
      </div>
    </div>
  );
}
export const RankBadge = ({ rank }) => {
  const isTop3 = rank <= 3;
  const medals = ["🥇", "🥈", "🥉"];
  if (isTop3) {
    return (
      <div className="w-10 shrink-0 flex items-center justify-center">
        <span className="text-2xl leading-none">{medals[rank - 1]}</span>
      </div>
    );
  }
  return (
    <div className="w-10 shrink-0 flex items-center justify-center">
      <span className="text-lg font-bold text-gray-500 dark:text-gray-400 tabular-nums">{rank}</span>
    </div>
  );
}
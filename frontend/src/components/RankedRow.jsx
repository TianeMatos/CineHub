import { Link } from 'react-router';
import { useGenreMedia } from '../hooks/useGenresMedia';
import { RankBadge } from './ui/RankBadge'
import { Star } from 'lucide-react';

export const RankedRow = ({ item, rank }) => {
  const { genres } = useGenreMedia(item.mediaType, item.genreIds);

  return (
    <Link
      to={`/movie/${item.id}`}
      className="group flex items-center gap-4 px-4 py-3 rounded-xl border border-transparent hover:border-[#fbbf24]/20 hover:bg-[#fbbf24]/5 transition-all duration-200"
    >
      <RankBadge rank={rank} />

      <div className="w-14 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-white/5">
        <img
          src={item.posterUrl}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/56x80/1a1a1a/666?text=?"; }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-[#fbbf24] transition-colors truncate leading-snug">
          {item.title}
        </h3>
        <div className="flex items-center gap-x-2 mt-1 flex-wrap">
          <span className="text-sm text-gray-400">{item.releaseDate}</span>
          <span className="w-1 h-1 rounded-full bg-gray-400" />
          {genres && genres.slice(0, 2).map((genre, i) => (
            <span key={`genre-${i}`} className="text-sm text-gray-400">{genre?.name.trim() + ((i + 1) < genres.length ? "," : "")}</span>
          ))}
        </div>
        <p className="text-xs text-gray-400/60 mt-2">{item.voteCount} votos</p>
      </div>

      <div className="shrink-0 flex items-center gap-1.5 bg-black/40 border border-[#fbbf24]/30 px-3 py-1.5 rounded-lg">
        <Star className="w-3.5 h-3.5 text-[#fbbf24] fill-[#fbbf24]" />
        <span className="text-sm font-bold text-[#fbbf24] tabular-nums">{item.rating.toFixed(1)}</span>
      </div>
    </Link>
  );
}
import { Film, Tv, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { dateFormat } from "../utils/dateTimeFormat"

export function SearchDropdown({ results, query, onClose, onViewAll }) {
  const navigate = useNavigate();

  const handleClick = (media) => {
    onClose();
    navigate(`/${media.mediaType}/${media.id}`);
  };

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden">

      <ul>
        {results.map((media) => (
          <li key={`${media.mediaType}-${media.id}`}>
            <button
              onClick={() => handleClick(media)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
            >
              {/* Poster */}
              <img
                src={media.posterUrl}
                alt={media.title}
                className="w-10 h-12 object-cover rounded shrink-0 bg-gray-800"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{media.title}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {media.mediaType === "movie"
                    ? <Film size={10} className="text-gray-500" />
                    : <Tv size={10} className="text-gray-500" />
                  }
                  <span className="text-xs text-gray-500">
                    {media.mediaType === "movie" ? "Filme" : "Série"} · {dateFormat(media.releaseDate)}
                  </span>
                </div>
              </div>

              {/* Rating */}
              {media.rating > 0 && (
                <span className="text-xs text-[#fbbf24] shrink-0">★ {media.rating}</span>
              )}
            </button>
          </li>
        ))}
      </ul>

      {/* Ver todos */}
      <button
        onClick={onViewAll}
        className="w-full flex items-sata justify-center gap-0 px-4 py-3 border-t border-white/5 text-sm text-[#fbbf24] hover:bg-white/5 transition-colors"
      >
        <span className="text-center">
          Ver todos os resultados para <strong >{query}</strong> <ArrowRight className="inline" size={14}  />
        </span>
      </button>

    </div>
  );
}
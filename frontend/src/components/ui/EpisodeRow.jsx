import { ChevronDown, Clock, Star } from "lucide-react";
import { useState } from "react";
import { ImageCard } from "./ImageCard";

export function EpisodeRow({ ep }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded((v) => !v)}
      className="p-4 hover:bg-white/4 transition-colors cursor-pointer group select-none"
    >

      <div className="flex items-center gap-3 sm:gap-4">
        <span className="w-6 text-center text-sm sm:text-base font-semibold text-gray-400 group-hover:text-[#fbbf24] transition-colors tabular-nums shrink-0">
          {ep.number}
        </span>

        {ep.stillPath && (
          <div className="hidden sm:block w-24 aspect-video rounded-lg overflow-hidden bg-white/5 shrink-0 border border-white/10">
            <ImageCard
              src={ep.stillPath}
              alt={ep.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h4 className="text-sm sm:text-base font-medium text-white group-hover:text-[#fbbf24] transition-colors truncate">
            {ep.title}
          </h4>
          <span className="text-xs text-gray-400 sm:hidden flex items-center gap-1 mt-0.5">
            <Clock className="w-3 h-3 text-gray-500" />
            {ep.duration}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 shrink-0">
          <Clock className="w-3.5 h-3.5 text-gray-500" />
          <span>{ep.duration}</span>
        </div>

        {ep.rating && (
          <div className="flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-300 shrink-0 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
            <Star className="w-3.5 h-3.5 text-[#fbbf24] fill-[#fbbf24]" />
            <span>{typeof ep.rating === "number" ? ep.rating.toFixed(1) : ep.rating}</span>
          </div>
        )}

        <div className="p-1 rounded-lg text-gray-400 group-hover:text-white transition-colors shrink-0">
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              expanded ? "rotate-180 text-[#fbbf24]" : ""
            }`}
          />
        </div>
      </div>

      {expanded && (
        <div className="mt-3 pl-9 sm:pl-10 pr-2 animate-fadeIn">
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed bg-white/2 p-3 rounded-lg border border-white/5">
            {ep.synopsis || ep.overview || "Nenhuma sinopse disponível para este episódio."}
          </p>
        </div>
      )}
    </div>
  );
}
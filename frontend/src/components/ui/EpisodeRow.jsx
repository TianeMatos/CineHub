import { ChevronDown, Clock, Star } from "lucide-react";
import { useState } from "react";

export function EpisodeRow({ ep }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="relative flex flex-wrap items-center gap-4 sm:gap-6 px-4 py-4 rounded-xl hover:bg-white/4 transition-colors group cursor-pointer"
      onClick={() => setExpanded((v) => !v)}
    >
      <div className="shrink-0 w-5 text-right pt-0.5">
        <span className="text-white tabular-nums text-lg">{ep.number}</span>
      </div>

      <div className="flex-col sm:flex-1 min-w-0">
        <p className="font-medium text-sm lg:text-lg text-gray-200 group-hover:text-[#fbbf24] transition-colors leading-snug">
          {ep.title}
        </p>
        {expanded && (
          <p className={`text-sm text-gray-400 mt-1 leading-relaxed transition-all ${expanded ? "" : "line-clamp-1"}`}>
            {ep.synopsis || "Sem descrição disponível."}
          </p>
        )}
      </div>

      <div className="shrink-0 flex items-center gap-1 text-gray-400 pl-2 pt-0.5 self-center">
        <Clock className="w-3.5 h-3.5" />
        <span className="text-sm">{ep.duration}</span>
      </div>

      <div className="shrink-0 flex items-center gap-1 text-gray-400 pl-2 pr-8 pt-0.5 self-center">
        <Star className="w-5 h-5 text-[#fbbf24]" />
        <span className="text-sm">{ep.rating}</span>
      </div>
      <div className={`absolute top-5 right-4 text-gray-400 pt-0.5 items-center self-center`}>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </div>
    </div>
  );
}
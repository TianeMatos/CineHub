import { useState } from "react";
import {
  ChevronDown,
  Tv,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";
import { yearFormat } from "../utils/dateTimeFormat";
import { useFetchMedia } from "../hooks/useFetchMedia";
import { LoadingScreen } from "./ui/LoadingScreen";
import { ErrorScreen } from "./ui/ErrorScreen";
import { EpisodeRow } from "./ui/EpisodeRow";

export function EpisodesSection({
  seriesId,
  numberEpisodes,
  numberSeasons,
  seasons = [],
}) {
  const [activeSeason, setActiveSeason] = useState(1);
  const [episodesOpen, setEpisodesOpen] = useState(true);

  const {
    data: currentSeason,
    loading,
    error,
  } = useFetchMedia(`/${seriesId}/${activeSeason}`);

  const validSeasons = seasons.filter((s) => s.seasonNumber !== 0);

  return (
    <section className="bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300">

      <button
        onClick={() => setEpisodesOpen((prev) => !prev)}
        className="w-full flex items-center justify-between p-5 sm:p-6 bg-linear-to-r from-white/3 to-transparent hover:bg-white/6 transition-all cursor-pointer border-b border-white/5"
      >
        <div className="flex items-center gap-4">
          <div className="bg-[#fbbf24]/10 p-3 rounded-xl border border-[#fbbf24]/20 hidden sm:block">
            <Tv className="w-6 h-6 text-[#fbbf24]" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Episódios
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-gray-300 border border-white/10 font-medium">
                {numberSeasons} {numberSeasons === 1 ? "Temporada" : "Temporadas"}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              {numberEpisodes} episódios no total
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 hidden sm:inline">
            {episodesOpen ? "Ocultar" : "Expandir"}
          </span>
          <div className="p-2 rounded-lg bg-white/5 border border-white/10">
            <ChevronDown
              className={`w-5 h-5 text-gray-300 transition-transform duration-300 ${
                episodesOpen ? "rotate-180 text-[#fbbf24]" : ""
              }`}
            />
          </div>
        </div>
      </button>

      {episodesOpen && (
        <div className="p-4 sm:p-6 space-y-6">

          {validSeasons.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block px-1">
                Selecione a Temporada
              </span>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
                {validSeasons.map((s) => {
                  const isActive = s.seasonNumber === activeSeason;
                  return (
                    <button
                      key={s.seasonNumber}
                      onClick={() => setActiveSeason(s.seasonNumber)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all shrink-0 cursor-pointer snap-start border ${
                        isActive
                          ? "bg-[#fbbf24] text-black border-[#fbbf24] shadow-lg shadow-[#fbbf24]/20 font-semibold scale-[1.02]"
                          : "bg-white/5 hover:bg-white/10 text-gray-300 border-white/10"
                      }`}
                    >
                      <span>Temporada {s.seasonNumber}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-md ${
                          isActive
                            ? "bg-black/20 text-black font-bold"
                            : "bg-white/10 text-gray-400"
                        }`}
                      >
                        {s.episodeCount} ep.
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {loading && (
            <div className="py-12">
              <LoadingScreen />
            </div>
          )}

          {error && (
            <div className="py-8">
              <ErrorScreen />
            </div>
          )}

          {!loading && !error && currentSeason && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white/2 border border-white/5 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#fbbf24]" />
                    <h3 className="text-lg font-bold text-white">
                      Temporada {activeSeason}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
                    {currentSeason.overview ||
                      "Nenhuma sinopse disponível para esta temporada."}
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0 shrink-0">
                  {currentSeason.airDate && (
                    <span className="flex items-center gap-1.5 text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                      <Calendar className="w-3.5 h-3.5 text-[#fbbf24]" />
                      {yearFormat(currentSeason.airDate)}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                    <Layers className="w-3.5 h-3.5 text-[#fbbf24]" />
                    {currentSeason.episodes?.length || 0} Episódios
                  </span>
                </div>
              </div>

              <div className="divide-y divide-white/5 bg-black/20 rounded-xl border border-white/5 overflow-hidden">
                {currentSeason.episodes?.map((ep) => (
                  <EpisodeRow key={ep.id || ep.number} ep={ep} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
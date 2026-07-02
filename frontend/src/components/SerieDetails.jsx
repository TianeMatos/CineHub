import { useState } from "react";
import { ImageCard } from "./ui/ImageCard";
import { ArrowLeft, Check, ChevronDown, Clock, Link, Play, Plus, Star, Tv } from "lucide-react";
import { MediaCarousel } from "./MediaCarousel";

function EpisodeRow({ ep, isWatched, onToggle }) {
  return (
    <div className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group">
      <div className="shrink-0 w-8 h-8 flex items-center justify-center">
        <button
          onClick={() => onToggle(ep.number)}
          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
            isWatched
              ? "bg-[#fbbf24] border-[#fbbf24]"
              : "border-white/20 hover:border-[#fbbf24]/60"
          }`}
        >
          {isWatched && <Check className="w-3.5 h-3.5 text-black" />}
        </button>
      </div>

      <div className="shrink-0 w-8 text-center">
        <span className="text-gray-500 tabular-nums">{ep.number}</span>
      </div>

      <div className="flex-1 min-w-0">
        <p className={`font-medium leading-snug transition-colors ${isWatched ? "text-gray-500 line-through" : "text-gray-900 group-hover:text-[#fbbf24]"}`}>
          {ep.title}
        </p>
        <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{ep.synopsis}</p>
      </div>

      <div className="shrink-0 flex items-center gap-1 text-gray-500">
        <Clock className="w-3.5 h-3.5" />
        <span className="text-sm">{ep.duration}</span>
      </div>

      <button className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[#fbbf24] text-black p-1.5 rounded-full">
        <Play className="w-3.5 h-3.5 fill-black" />
      </button>
    </div>
  );
}

export function SeriesDetails({ details }) {

  const [activeSeason, setActiveSeason] = useState(details.seasons_data.length);
  const [seasonDropdownOpen, setSeasonDropdownOpen] = useState(false);
  const [watchedEps, setWatchedEps] = useState({});

  const currentSeason = details.seasons_data.find((s) => s.number === activeSeason) || details.seasons_data[0];
  const totalEps = details.seasons_data.reduce((acc, s) => acc + s.episodes.length, 0);
  const watchedCount = Object.values(watchedEps).filter(Boolean).length;

  function toggleEpisode(epNumber) {
    setWatchedEps((prev) => ({ ...prev, [`s${activeSeason}e${epNumber}`]: !prev[`s${activeSeason}e${epNumber}`] }));
  }

  const statusColor = details.status === "Em exibição" ? "text-green-400 bg-green-400/10" : "text-gray-500 bg-white/10";

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <ImageCard
            src={details.backdrop}
            alt={details.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-black/30" />
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/series" className="inline-flex items-center gap-2 text-gray-900 hover:text-[#fbbf24] transition-colors pt-8 mb-8">
            <ArrowLeft className="w-5 h-5" />
            Séries
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-end h-[calc(100%-8rem)]">
            <div className="w-52 shrink-0 hidden md:block">
              <div className="relative overflow-hidden rounded-xl aspect-2/3 bg-muted shadow-2xl ring-1 ring-white/10">
                <ImageCard src={details.poster} alt={details.title} className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="flex-1 pb-8">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 ${statusColor}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${details.status === "Em exibição" ? "bg-green-400" : "bg-muted-foreground"}`} />
                  {details.status}
                </span>
                <span className="bg-[#fbbf24] text-black px-3 py-1 rounded-md font-medium text-sm">{details.year}</span>
                <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-md">
                  <Star className="w-4 h-4 text-[#fbbf24] fill-[#fbbf24]" />
                  <span className="font-medium">{details.rating}/10</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                  <Tv className="w-4 h-4" />
                  {details.seasons} temporadas · {totalEps} episódios
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-3 text-gray-900 leading-tight">{details.title}</h1>
              <p className="text-lg text-gray-500 mb-5">{details.genre[0]}</p>
              <p className="text-gray-300 mb-8 max-w-2xl leading-relaxed">{details.synopsis}</p>

              <div className="flex flex-wrap gap-3 mb-8">
                <button className="flex items-center gap-2 bg-[#fbbf24] hover:bg-[#f59e0b] text-black px-8 py-3 rounded-lg font-medium transition-colors">
                  <Play className="w-5 h-5 fill-black" />
                  Assistir Agora
                </button>
                <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-gray-900 px-8 py-3 rounded-lg font-medium transition-colors border border-white/20">
                  <Plus className="w-5 h-5" />
                  Minha Lista
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-xl">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Criador</p>
                  <p className="text-gray-900 font-medium">{details.crew[0]}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Elenco Principal</p>
                  <p className="text-gray-900 text-sm">{details.cast.slice(0, 3).join(", ")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Episodes section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Episódios</h2>
              {watchedCount > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  {watchedCount} assistido{watchedCount !== 1 ? "s" : ""}
                </p>
              )}
            </div>

            {/* Season selector */}
            <div className="relative">
              <button
                onClick={() => setSeasonDropdownOpen((v) => !v)}
                className="flex items-center gap-3 bg-[#1f1f1f] hover:bg-[#2a2a2a] border border-white/10 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
              >
                <Tv className="w-4 h-4 text-[#fbbf24]" />
                Temporada {activeSeason}
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${seasonDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {seasonDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-xl overflow-hidden z-20">
                  {details.seasons_data.map((s) => (
                    <button
                      key={s.number}
                      onClick={() => { setActiveSeason(s.number); setSeasonDropdownOpen(false); }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${
                        s.number === activeSeason ? "text-[#fbbf24] font-medium" : "text-gray-900"
                      }`}
                    >
                      <span>Temporada {s.number}</span>
                      <span className="text-xs text-gray-500">{s.year} · {s.episodes.length} ep.</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Progress bar */}
          {watchedCount > 0 && (
            <div className="mb-6">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Progresso da temporada {activeSeason}</span>
                <span>{currentSeason.episodes.filter((ep) => watchedEps[`s${activeSeason}e${ep.number}`]).length}/{currentSeason.episodes.length} ep.</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#fbbf24] rounded-full transition-all duration-500"
                  style={{ width: `${(currentSeason.episodes.filter((ep) => watchedEps[`s${activeSeason}e${ep.number}`]).length / currentSeason.episodes.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Season header */}
          <div className="flex items-center gap-3 mb-2 px-4">
            <p className="text-sm text-gray-500">
              Temporada {currentSeason.number} · {currentSeason.year} · {currentSeason.episodes.length} episódios
            </p>
          </div>

          {/* Episode list */}
          <div className="divide-y divide-white/5">
            {currentSeason.episodes.map((ep) => (
              <EpisodeRow
                key={ep.number}
                ep={ep}
                isWatched={!!watchedEps[`s${activeSeason}e${ep.number}`]}
                onToggle={toggleEpisode}
              />
            ))}
          </div>
        </div>

        Similar series
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 px-12">Séries Similares</h2>
          <MediaCarousel movies={details.similar} />
        </section>
      </main>
    </div>
  );
}
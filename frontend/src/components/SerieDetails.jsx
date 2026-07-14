import { useState } from "react";
import { ImageCard } from "./ui/ImageCard";
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  MonitorPlay,
  Play,
  Star,
  ThumbsUp,
  TrendingUp,
  Tv,
  Users,
} from "lucide-react";
import { MediaCarousel } from "./MediaCarousel";
import { dateFormat, runtimeFormat } from "../utils/dateTimeFormat";
import { RatingRing } from "./ui/RatingRing";
import { EpisodeRow } from "./ui/EpisodeRow";
import { useFetchMedia } from "../hooks/useFetchMedia";
import { LoadingScreen } from "./ui/LoadingScreen";
import { ErrorScreen } from "./ui/ErrorScreen";
import { TrailerModal } from "./ui/TrailerModal";
import { Link } from "react-router"

// ─── Page ─────────────────────────────────────────────────────────────────────

export function SeriesDetails({ details }) {
  const [activeSeason, setActiveSeason] = useState(1);
  const [seasonDropdownOpen, setSeasonDropdownOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [episodesOpen, setEpisodesOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: currentSeason,
    loading,
    error,
  } = useFetchMedia(`/${details.id}/${activeSeason}`);

  const totalEps = details.numberEpisodes;
  const statusColor =
    details.inProduction === true
      ? "text-green-400 bg-green-400/10"
      : "text-gray-400 bg-white/10";

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative min-h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <ImageCard
            src={details.backdropUrl}
            alt={details.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-black/30" />
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <Link to="/series"
            className="inline-flex items-center gap-2 text-white hover:text-[#fbbf24] transition-colors pt-4 mb-6 sm:mb-4 "
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-center h-[calc(100%-8rem)]">
            <div className="w-64 shrink-0 hidden md:block">
              <div className="relative overflow-hidden rounded-xl aspect-2/3 bg-muted shadow-2xl ring-1 ring-white/10">
                <ImageCard
                  src={details.posterUrl}
                  alt={details.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1 pb-4">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span
                  className={`text-xs font-medium px-2 sm:px-2.5 py-1 rounded-full flex items-center gap-1.5 ${statusColor}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${details.status === "Returning Series" ? "bg-green-400" : "bg-gray-500"}`}
                  />
                  {details.status === "Returning Series"
                    ? "Em Exibição"
                    : "Finalizada"}
                </span>
                <span className="bg-[#fbbf24] text-black px-2.5 sm:px-3 py-1 rounded-md font-bold sm:font-medium text-xs sm:text-sm">
                  {dateFormat(details.releaseDate)}
                </span>
                <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2.5 sm:px-3 py-1 rounded-md">
                  <Star className="w-4 h-4 text-[#fbbf24] fill-[#fbbf24]" />
                  <span className="font-medium">{details.rating}/10</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-6xl font-bold mb-3 text-white leading-tight">
                {details.title}
              </h1>
              <p className="text-sm sm:text-lg text-gray-400 mb-5">
                {details.genres && details.genres.map((g) => g.name).join(", ")}
              </p>
              <p className="text-white text-sm sm:text-lg mb-5 max-w-2xl leading-relaxed">
                {details.overview}
              </p>
              
              {details.tagline && (
                <p className="mb-8 text-sm sm:text-lg italic text-[#fbbf24]">
                  "{details.tagline}"
                </p>
              )}

              <div className="flex flex-wrap gap-3 mb-4 sm:mb-8">
                <button onClick={() => setIsModalOpen(true)} className={`flex items-center gap-2 bg-[#fbbf24] hover:bg-[#f59e0b] text-black sm:text-base px-4 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium transition-colors ${details.video && "cursor-pointer"}`}>
                  <Play className="w-4 w-sm-5 h-4 h-sm-5 fill-black" />
                  {details.video ?  "Assistir Vídeo"  : "Sem Vídeo Disponível"}
                </button>
                {details.video && <TrailerModal key={details.video.name} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} videoKey={details.video.key} />}

                 {/* Not Implemented Yet  */}
                <button
                  onClick={() => setLiked((v) => !v)}
                  className={`flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium border transition-colors ${liked ? "bg-[#fbbf24]/15 border-[#fbbf24]/30 text-[#fbbf24]" : "bg-white/8 border-white/12 text-white/80 hover:bg-white/12"}`}
                >
                  <ThumbsUp
                    className={`w-4 h-4 ${liked ? "fill-[#fbbf24]" : ""}`}
                  />
                  {liked ? "Curtido" : "Curtir"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-14 space-y-16">
        {/* Stats strip */}
        <div className="grid place-content-center grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            {
              icon: Users,
              label: "Elenco",
              value: `${details.cast.length} atores`,
              sub: "principais",
            },
            {
              icon: Tv,
              label: "Episódios",
              value: totalEps,
              sub: `em ${details.numberSeasons} temporadas`,
            },
            {
              icon: TrendingUp,
              label: "Popularidade",
              value: Math.round(details.popularity),
              sub: "Índice do TMDB",
            },
            {
              icon: MonitorPlay,
              label: "Emissora",
              value: `${details.network}`,
            },
          ].map(({ icon: Icon, label, value, sub }) => (
            <div
              key={label}
              className="bg-[#141414] border border-white/6 rounded-2xl px-5 py-4 flex items-center gap-4"
            >
              <div className="bg-[#fbbf24]/10 rounded-xl p-2.5 shrink-0">
                <Icon className="w-5 h-5 text-[#fbbf24]" />
              </div>
              <div>
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-sm font-semibold text-white">{value}</p>
                <p className="text-xs text-gray-400">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Rating + details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 place-content-center">
          {/* Score */}
          <div className="bg-[#141414] border border-white/6 rounded-2xl p-4 sm:p-6 mx-2 flex flex-col items-center justify-center gap-2">
            <RatingRing value={details.rating} />
            <p className="text-sm text-gray-400 text-center">
              Nota média baseada em
              <br />
              {details.votes} avaliações
            </p>
          </div>

          {/* Details */}
          <div className="col-span-1 sm:col-span-2 bg-[#141414] border border-white/6 rounded-2xl p-4 sm:p-6 mx-2">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Ficha técnica
            </h3>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {[
                { label: "Criador", value: details.crew[0].name },
                { label: "Duração", value: `${details.type === "movie" ? runtimeFormat(details.runtime) : Math.round(details.episodeRunTime) + " por episódio"}` },
                { label: "País de origem", value: details.country },
                { label: "Idioma original", value: details.language },
                {
                  label: "Classificação indicativa",
                  value: details.contentRating.rating || "",
                },
                {
                  label: "Status",
                  value:
                    details.inProduction === true ? "Em Exibição" : "Terminada",
                },
                {
                  label: "Estreia",
                  value: new Date(details.releaseDate).toLocaleDateString("BR"),
                },
                {
                  label: "Último episódio",
                  value: new Date(details.lastAirDate).toLocaleDateString("BR"),
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between border-b border-white/5 pb-2"
                >
                  <span className="text-sm text-gray-400">{label}</span>
                  <span className="text-sm text-white font-medium text-right ml-4">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cast */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-7 px-4 sm:px-12">
            Elenco Principal
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 ">
            {details.cast.map((actor) => (
              <div
                key={actor.name}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#1f1f1f] mb-3 ring-1 ring-white/10 group-hover:ring-[#fbbf24]/30 transition-all">
                  <img
                    src={actor.photo}
                    alt={actor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>

                <p className="text-sm font-medium text-white">{actor.name}</p>

                <p className="text-xs text-gray-400">{actor.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Episodes */}
        {loading && <LoadingScreen />}
        {error && <ErrorScreen />}
        {currentSeason && (
          <section className="border border-white/10 rounded-2xl overflow-hidden mx-3 sm:mx-10">
            <button
              onClick={() => setEpisodesOpen((prev) => !prev)}
              className="w-full flex items-center justify-between p-6 hover:bg-white/4 transition-colors cursor-pointer"
            >
              <div className="text-left">
                <h2 className="text-2xl font-bold text-white">Episódios</h2>

                <p className="text-sm text-gray-400 mt-1">
                  {details.numberEpisodes} episódios • {details.numberSeasons}{" "}
                  temporadas
                </p>
              </div>

              <ChevronDown
                className={`transition-transform duration-300 ${
                  episodesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {episodesOpen && (
              <>
                {details.numberSeasons < 6 ? (
                  <div className="flex gap-0.5 border-b border-white/8 mb-3 overflow-x-auto overflow-y-hidden px-6">
                    {details.seasons.map(
                      (s) =>
                        s.seasonNumber !== 0 && (
                          <button
                            key={s.seasonNumber}
                            onClick={() => setActiveSeason(s.seasonNumber)}
                            className={`px-2.5 py-2.5 text-sm font-medium transition-all cursor-pointer whitespace-nowrap border-b-2 -mb-px ${
                              s.seasonNumber === activeSeason
                                ? "text-[#fbbf24] border-[#fbbf24]"
                                : "text-gray-400 border-transparent hover:text-white"
                            }`}
                          >
                            T{s.seasonNumber}
                            <span className="ml-1.5 text-xs opacity-50">
                              {s.episodeCount}
                            </span>
                          </button>
                        ),
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col justify-between gap-5 px-6 pb-4 mt-2">
                    <div className="relative shrink-0 self-end pr-5">
                      <button
                        onClick={() => setSeasonDropdownOpen((v) => !v)}
                        className="text-end flex items-center gap-3 bg-[#1f1f1f] hover:bg-[#2a2a2a] border border-white/10 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                      >
                        <Calendar className="w-4 h-4 text-[#fbbf24]" />
                        Temporada {activeSeason}
                        <ChevronDown
                          className={`w-4 h-4 text-gray-400 transition-transform ${seasonDropdownOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {seasonDropdownOpen && (
                        <div className="absolute right-0 top-full mt-2 w-56 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-20">
                          {details?.seasons?.map(
                            (s) =>
                              s.seasonNumber !== 0 && (
                                <button
                                  key={s.seasonNumber}
                                  onClick={() => {
                                    setActiveSeason(s.seasonNumber);
                                    setSeasonDropdownOpen(false);
                                  }}
                                  className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-white/5 ${
                                    s.seasonNumber === activeSeason
                                      ? "text-[#fbbf24] font-medium bg-[#fbbf24]/5"
                                      : "text-white"
                                  }`}
                                >
                                  <span>Temporada {s.seasonNumber}</span>
                                  <span className="text-xs text-gray-400">
                                    {dateFormat(s.airDate)} -{" "}
                                    {s.episodeCount} ep.
                                  </span>
                                </button>
                              ),
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div className="px-6 py-4 border-be-2 border-gray-400">
                  <h3 className="text-lg font-semibold text-white">
                    Temporada {activeSeason} - {dateFormat(currentSeason.airDate)}
                  </h3>

                  <p className="text-sm text-gray-400 mt-2 ml-1 leading-relaxed">
                    {currentSeason.overview || "Sem descrição disponível."}
                  </p>
                </div>
                <div className="divide-y divide-white/5 mt-2">
                  {currentSeason.episodes.map((ep) => (
                    <EpisodeRow key={ep.number} ep={ep} />
                  ))}
                </div>
              </>
            )}
          </section>
        )}

        {/* Similar */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-7 px-4 sm:px-12">
            Séries Similares
          </h2>
          <MediaCarousel
            key={`recommendations-tv`}
            items={details?.recommendations}
          />
        </section>
      </main>
    </div>
  );
}

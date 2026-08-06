import { useState } from "react";
import { ImageCard } from "./ui/ImageCard";
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  Film,
  PenLine,
  Play,
  TrendingUp,
  Tv,
} from "lucide-react";
import { MediaCarousel } from "./MediaCarousel";
import { dateFormat, yearFormat } from "../utils/dateTimeFormat";
import { BigRatingRing } from "./ui/BigRatingRing";
import { EpisodeRow } from "./ui/EpisodeRow";
import { useFetchMedia } from "../hooks/useFetchMedia";
import { LoadingScreen } from "./ui/LoadingScreen";
import { ErrorScreen } from "./ui/ErrorScreen";
import { TrailerModal } from "./ui/TrailerModal";
import { useNavigate } from "react-router";
import { ScrollToTop } from "./ui/ScrollToTop";
import { ProviderBadges } from "./ui/ProviderBadges";

export function SeriesDetails({ details }) {
  const [activeSeason, setActiveSeason] = useState(1);
  const [seasonDropdownOpen, setSeasonDropdownOpen] = useState(false);
  // const [liked, setLiked] = useState(false);
  const [episodesOpen, setEpisodesOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const {
    data: currentSeason,
    loading,
    error,
  } = useFetchMedia(`/${details.id}/${activeSeason}`);

  const totalEps = details.numberEpisodes;

  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <div className="relative min-h-[70vh] pb-6 w-full overflow-hidden">
        <div className="absolute inset-0">
          <ImageCard
            src={details.backdropUrl}
            alt={details.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/60 to-black/40" />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-8">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="inline-flex items-center gap-2 text-gray-900 dark:text-white hover:text-[#fbbf24] transition-colors py-6 mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>

          <div className="flex flex-col md:flex-row gap-8 items-center h-[calc(100%-8rem)]">
            <div className="w-64 shrink-0 hidden md:block">
              <div className="relative overflow-hidden rounded-xl aspect-2/3 bg-gray-500/10 shadow-2xl ring-1 ring-white/10">
                <ImageCard
                  src={details.posterUrl}
                  alt={details.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1 pb-4">
              <h1 className="text-3xl sm:text-6xl font-bold mb-3 text-white leading-tight">
                {details.title}
              </h1>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                {details.genres &&
                  details.genres.map((g) => (
                    <span
                      key={g.id}
                      className="text-sm border border-white/23 bg-black/30 text-white/80 px-3 py-1 rounded-full hover:bg-white/20 transition-colors ease-out"
                    >
                      {g.name}
                    </span>
                  ))}

                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border ${
                    details.status === "Returning Series"
                      ? "bg-green-800/75 border-green-300/65 text-green-300"
                      : "bg-orange-800/75 border-orange-300/65 text-white/80"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${details.status === "Em exibição" ? "bg-green-300" : "bg-orange-300"}`}
                  />
                  {details.status === "Returning Series"
                    ? "Em Exibição"
                    : "Finalizada"}
                </span>
              </div>

              <p className="text-white text-sm sm:text-lg mb-4 max-w-2xl leading-relaxed">
                {details.overview}
              </p>

              {details.tagline && (
                <p className="mb-6 text-sm sm:text-lg italic text-[#fbbf24]">
                  "{details.tagline}"
                </p>
              )}

              <div className="flex flex-wrap gap-3 mb-4 sm:mb-8">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className={`flex items-center gap-2 text-xs sm:text-base px-3 sm:px-4 py-3 sm:py-4 rounded-lg font-medium transition-colors ${details.video ? "bg-[#fbbf24] hover:bg-[#f59e0b] text-black cursor-pointer" : "bg-gray-400 text-black"}`}
                >
                  <Play className="w-4 w-sm-5 h-4 h-sm-5 fill-black" />
                  {details.video ? "Assistir Vídeo" : "Sem Vídeo Disponível"}
                </button>
                {details.video && (
                  <TrailerModal
                    key={details.video.name}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    videoKey={details.video.key}
                  />
                )}

                {/* Not Implemented Yet  */}
                {/* <button
                  onClick={() => setLiked((v) => !v)}
                  className={`flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium border transition-colors ${liked ? "bg-[#fbbf24]/15 border-[#fbbf24]/30 text-[#fbbf24]" : "bg-white/8 border-white/12 text-white/80 hover:bg-white/12"}`}
                >
                  <ThumbsUp
                    className={`w-4 h-4 ${liked ? "fill-[#fbbf24]" : ""}`}
                  />
                  {liked ? "Curtido" : "Curtir"}
                </button> */}
              </div>
              <ProviderBadges providers={details.providers} />
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        <section className="flex flex-wrap justify-evenly items-center gap-4 px-4 md:px-6">
          {[
            {
              icon: Calendar,
              label: "Ano De Lançamento",
              value: yearFormat(details.releaseDate),
            },
            {
              icon: Tv,
              label: "Episódios",
              value: `${totalEps} ep.`,
              sub: `em ${details.numberSeasons} temporadas`,
            },
            {
              icon: TrendingUp,
              label: "Popularidade",
              value: Math.round(details.popularity),
              sub: "Índice do TMDB",
            },
            {
              icon: PenLine,
              label: "Criador(es)",
              value: details?.createdBy ?? "Não Informado",
            },
          ].map(({ icon: Icon, label, value, sub }) => (
            <div
              key={label}
              className="bg-[#141414] border border-white/6 rounded-2xl px-5 py-4 flex items-center gap-6 w-full sm:w-60 max-h-20"
            >
              <div className="bg-[#fbbf24]/10 rounded-xl p-2.5 shrink-0">
                <Icon className="w-5 h-5 text-[#fbbf24]" />
              </div>
              <div>
                <p className="text-xs uppercase text-gray-400">{label}</p>
                <p className="text-sm font-semibold text-white">{value}</p>
                <p className="text-xs text-gray-400">{sub}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="flex flex-wrap gap-4 md:gap-6 justify-center mx-2 sm:mx-4 md:mx-6">
          <div className="flex-1 bg-[#141414] border border-white/6 rounded-2xl p-4 sm:p-6 mx-2 flex flex-col items-center justify-center gap-2 min-w-56">
            <BigRatingRing value={details.rating} />
            <p className="text-sm text-gray-400 text-center">
              Nota média baseada em
              <br />
              {details.votes} avaliações
            </p>
          </div>

          <div className="flex-2 bg-[#141414] border border-white/6 rounded-2xl py-6 px-4 sm:px-6 mx-2 min-w-fit md:min-w-xl">
            <div className="flex items-center gap-2 mb-6">
              <Film className="w-4 h-4 text-[#fbbf24]" />
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                Ficha técnica
              </h3>
            </div>
            {console.log(details.createdBy)}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 sm:gap-x-7 gap-y-3">
              {[
                {
                  label: "Duração",
                  value: `${Math.round(details.episodeRunTime) + "min por episódio"}`,
                },
                { label: "País de origem", value: details.country },
                { label: "Idioma original", value: details.language },
                {
                  label: "Classificação indicativa",
                  value: details.contentRating.rating
                    ? details.contentRating.rating
                    : "Não Informado",
                },
                {
                  label: "Status",
                  value:
                    details.inProduction === true ? "Em Exibição" : "Terminada",
                },
                {
                  label: "Estreia",
                  value: dateFormat(details.releaseDate),
                },
                {
                  label: "Último episódio",
                  value: dateFormat(details.lastAirDate),
                },
                { label: "Emissora", value: details.network },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className={`flex items-baseline justify-between border-b border-white/5 text-sm py-2 my-1`}
                >
                  <span className="text-gray-400 font-medium">{label}</span>
                  <span className="rounded-full font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-7 px-4 sm:px-12">
            Elenco Principal
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mx-2">
            {details.cast.map((actor) => (
              <div
                key={actor.name}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-15 h-15 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-[#1f1f1f] mb-3 ring-1 ring-white/10 group-hover:ring-[#fbbf24]/30 transition-all">
                  <img
                    src={actor.photo}
                    alt={actor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>

                <p className="text-sm font-medium text-white px-2">
                  {actor.name}
                </p>

                <p className="text-xs text-gray-400 px-2">{actor.role}</p>
              </div>
            ))}
          </div>
        </section>

        {loading && <LoadingScreen />}
        {error && <ErrorScreen />}
        {currentSeason && (
          <section className="border border-white/10 rounded-2xl overflow-hidden mx-3 sm:mx-12">
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
                                    {yearFormat(s.airDate)} - {s.episodeCount}{" "}
                                    ep.
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
                    Temporada {activeSeason} -{" "}
                    {yearFormat(currentSeason.airDate)}
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

        <section>
          <h2 className="text-2xl font-bold text-white mb-7 px-4 sm:px-12">
            Séries Similares
          </h2>
          <MediaCarousel
            key={`recommendations-tv`}
            items={details.recommendations}
          />
        </section>
      </main>
    </div>
  );
}

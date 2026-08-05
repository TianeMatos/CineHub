import { useNavigate } from "react-router";
import { ImageCard } from "./ui/ImageCard";
import { ArrowLeft, Play, Film, Calendar, Timer, TriangleAlert } from "lucide-react";
import { MediaCarousel } from "./MediaCarousel";
import { dateFormat, runtimeFormat, yearFormat, } from "../utils/dateTimeFormat";
import { TrailerModal } from "./ui/TrailerModal";
import { useState } from "react";
import { ScrollToTop } from "./ui/ScrollToTop";
import { LittleRatingRing } from "./ui/LittleRatingRing"

export const MovieDetails = ({ details }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <div className="relative h-min-[70vh] pb-6 w-full overflow-hidden">
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
            onClick={() => { navigate(-1); }}
            className="inline-flex items-center gap-2 text-gray-900 dark:text-white hover:text-[#fbbf24] transition-colors py-6 mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>

          <div className="flex flex-col md:flex-row gap-8 items-center h-[calc(100%-8rem)]">
            {/* Poster */}
            <div className="w-64 shrink-0 hidden md:block">
              <div className="relative overflow-hidden rounded-xl aspect-2/3 bg-gray-500/10 shadow-2xl ring-1 ring-white/10">
                <ImageCard
                  src={details.posterUrl}
                  alt={details.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Info */}
            <div className="flex-1 pb-4">
              <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-white">
                {details.title}
              </h1>

              <div className="flex flex-wrap gap-2 mb-4">
                {details.genres &&
                  details.genres.map((g) => (
                    <span
                      key={g.id}
                      className="text-xs sm:text-sm border border-white/23 bg-black/30 text-white/80 px-3 py-1 rounded-full hover:bg-white/20 transition-colors ease-out"
                    >
                      {g.name}
                    </span>
                  ))}
              </div>

              <p className="text-white text-sm sm:text-lg mb-5 max-w-2xl">
                {details.overview}
              </p>

              {details.tagline && (
                <p className="mb-8 text-sm sm:text-lg italic text-[#fbbf24]">
                  "{details.tagline}"
                </p>
              )}

              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className={`flex items-center gap-2 bg-[#fbbf24] hover:bg-[#f59e0b] text-black px-8 py-3 rounded-lg font-medium transition-colors ${details.video && "cursor-pointer"}`}
                >
                  <Play className="w-5 h-5 fill-black" />
                  {details.video
                    ? "Assistir Trailer"
                    : "Sem Trailer Disponível"}
                </button>
                {details.video && (
                  <TrailerModal
                    key={details.video.name}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    videoKey={details.video.key}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        <section className="grid place-content-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 md:px-6">
          {[
            { icon: LittleRatingRing, label: "Avaliação", value: `${details.rating} / 10`, sub: `${details.votes} votos` },
            { icon: Timer, label: "Duração", value: runtimeFormat(details.runtime), },
            { icon: TriangleAlert, label: "Classificação Indicativa", value: `${details.contentRating ? details.contentRating.release_dates[0].certification : "Não Informado"}`},
            { icon: Calendar, label: "Ano De Lançamento", value: yearFormat(details.releaseDate) },
          ].map(({ icon: Icon, label, value, sub }) => (
            <div key={label}
              className="bg-[#141414] border border-white/6 rounded-2xl px-4 py-4 flex items-center gap-4">
              <div className="bg-[#fbbf24]/10 rounded-xl p-2 shrink-0">
                <Icon className="w-4 h-4 text-[#fbbf24]" value={details.rating} />
              </div>
              <div>
                <p className="text-xs uppercase text-gray-400">{label}</p>
                <p className="text-sm font-semibold text-white">{value}</p>
                <p className="text-xs text-gray-400">{sub}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="bg-[#141414] border border-white/6 rounded-2xl p-6 md:p-8 mx-4 sm:mx-6">
          <div className="flex items-center gap-2 mb-6">
            <Film className="w-4 h-4 text-[#fbbf24]" />
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
              Ficha Técnica
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-5">
            {[
              { label: "Diretor", value: details.director?.name },
              { label: "Roteiro", value: details.screenplay?.name || "Não Informado" },
              {
                label: "Data de lançamento",
                value: dateFormat(details.releaseDate),
              },
              { label: "País de origem", value: details.country },
              { label: "Idioma original", value: details.language },
              { label: "Orçamento", value: details.budget },
              { label: "Bilheteria", value: details.boxOffice },
              { label: "Estúdio(s)", value: details.productionCompanies },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-1">
                  {label}
                </p>
                <p className="text-sm font-medium text-white ">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-7 px-4 sm:px-12">
            Elenco Principal
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
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

                <p className="text-sm font-medium text-white">{actor.name}</p>

                <p className="text-xs text-gray-400">{actor.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white my-7 px-4 sm:px-12">
            Títulos Similares
          </h2>
          <MediaCarousel
            key={`recommendations-tv`}
            items={details.recommendations}
          />
        </section>
      </main>
    </div>
  );
};

import { useNavigate } from "react-router";
import { ImageCard } from "./ui/ImageCard";
import {
  ArrowLeft,
  Play,
  Film,
} from "lucide-react";
import { MediaCarousel } from "./MediaCarousel";
import {
  currencyFormat,
  dateFormat,
} from "../utils/dateTimeFormat";
import { TrailerModal } from "./ui/TrailerModal";
import { useState } from "react";
import { ScrollToTop } from "./ui/ScrollToTop";
import { BigRatingRing } from "./ui/BigRatingRing";
import { DetailStatGrid } from "./DetailStatGrid";

export const MovieDetails = ({ details }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const statsData = {
    budget: details.budget,
    boxOffice: details.boxOffice,
    releaseYear: details.releaseDate,
    runtime: details.runtime,
    popularity: details.popularity,
  };

  // TODO -> Refactore: Rever o que pode ser componente

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
            onClick={() => {
              navigate(-1);
            }}
            className="inline-flex items-center gap-2 text-sm sm:text-base text-white hover:text-[#fbbf24] transition-colors py-4 sm:py-6 mb-2 sm:mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
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

            <div className="flex-1 pb-2 sm:pb-4">
              <h1 className="text-3xl sm:text-5xl font-bold mb-6 text-white">
                {details.title}
              </h1>

              <div className="flex flex-wrap gap-2 mb-6">
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

              <div className="flex flex-wrap gap-4 mb-6">
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
              {/* <ProviderBadges providers={details.providers} /> */}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-2 sm:px-6 py-12 space-y-16">
        
        <DetailStatGrid stats={statsData} />

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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 sm:gap-x-7 gap-y-3">
              {[
                { label: "Diretor", value: details.director?.name },
                {
                  label: "Roteiro",
                  value: details.screenplay?.name || "Não Informado",
                },
                { label: "País de origem", value: details.country },
                { label: "Idioma original", value: details.language },
                { label: "Orçamento", value: currencyFormat(details.budget) },
                {
                  label: "Bilheteria",
                  value: currencyFormat(details.boxOffice),
                },
                {
                  label: "Data de lançamento",
                  value: dateFormat(details.releaseDate),
                },
                {
                  label: "Classificação indicativa",
                  value: details.contentRating.rating
                    ? details.contentRating.rating
                    : "Não Informado",
                },
                { label: "Estúdio", value: details.productionCompanies },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className={`flex items-center justify-between border-b border-white/5 pb-2 text-xs sm:text-sm`}
                >
                  <span className="text-gray-400">{label}</span>
                  <span className={`px-3 py-1 rounded-full font-semibold`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
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

                <p className="text-sm font-medium text-white px-2">
                  {actor.name}
                </p>

                <p className="text-xs text-gray-400 px-2">{actor.role}</p>
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

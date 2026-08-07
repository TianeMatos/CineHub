import { useNavigate } from "react-router";
import { ImageCard } from "../ui/ImageCard";
import { useState } from "react";
import { ArrowLeft, Play } from "lucide-react";
import { TrailerModal } from "../ui/TrailerModal";
import { ProviderBadges } from "../ui/ProviderBadges";

export const MediaDetailsHero = ({ details, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative min-h-130 lg:min-h-150 pb-4 w-full overflow-hidden g-[#0d0d0d] text-white">
      {/* Backdrop */}
      <div className="absolute inset-0 z-0">
        <ImageCard
          src={details.backdropUrl}
          alt={details.title}
          className="w-full h-full object-cover object-top opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent w-full md:w-3/4" />
        <div className="absolute inset-0 bg-linear-to-t from-[#0d0d0d] via-transparent to-transparent" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-8">
        {/* Botão de Voltar */}
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="inline-flex items-center gap-2 text-sm sm:text-base text-white/65 hover:text-[#fbbf24] transition-colors py-2 my-2 sm:my-4 cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
          Voltar
        </button>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Poster */}
          <div className="w-48 lg:w-64 shrink-0 hidden md:block mt-4">
            <div className="w-48 lg:w-60 shrink-0 hidden md:block rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              {" "}
              <ImageCard
                src={details.posterUrl}
                alt={details.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Bloco de Conteúdo */}
          <div className="flex-1 space-y-5 max-w-3xl">
            {/* Título */}
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight text-white">
              {details.title}
            </h1>

            {/* Linha de Metadados + Gêneros */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
              {children?.badges}

              <div className="flex flex-wrap gap-2 pt-1">
                {details.genres?.map((g) => (
                  <span
                    key={g.id}
                    className="text-xs sm:text-sm px-3 py-1 rounded-full bg-black/40 border border-white/10 text-gray-300"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Sinopse */}
            <p className="text-gray-300 text-sm sm:text-lg leading-relaxed">
              {details.overview}
            </p>

            {/* Tagline */}
            {details.tagline && (
              <p className="text-sm sm:text-lg italic text-[#fbbf24]/90">
                "{details.tagline}"
              </p>
            )}

            {/* Botões de Ação */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-medium text-sm transition-all shadow-lg shadow-[#fbbf24]/20 hover:scale-[1.02] ${details.video && "cursor-pointer"}`}
              >
                <Play className="w-5 h-5 fill-black" />
                {details.video ? "Assistir Trailer" : "Sem Trailer Disponível"}
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

            {/* Seção Onde Assistir */}
            {details.providers?.length > 0 && (
              <div className="pt-4 border-t border-white/10 mt-6">
                <span className="text-xs uppercase tracking-wider text-gray-400 font-medium block mb-2">
                  Disponível em
                </span>
                <ProviderBadges providers={details.providers} />
              </div>
            )}

            {/* Slot para conteúdo extra específico de cada tipo */}
            {children?.extra}
          </div>
        </div>
      </div>
    </div>
  );
};

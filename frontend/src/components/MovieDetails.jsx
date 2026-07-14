import { Link } from "react-router";
import { ImageCard } from "./ui/ImageCard";
import { ArrowLeft, Clock, Play, Star } from "lucide-react";
import { MediaCarousel } from "./MediaCarousel";
import { runtimeFormat, dateFormat } from "../utils/dateTimeFormat";
import { TrailerModal } from "./ui/TrailerModal";
import { useState } from "react";
import { ScrollToTop } from "./ui/ScrollToTop";

export const MovieDetails = ({ details }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <div className="relative h-min-[80vh] pb-6 w-full overflow-hidden">
        <div className="absolute inset-0">
          <ImageCard
            src={details?.backdropUrl}
            alt={details?.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/65 to-black/50" />
          <div className="absolute inset-0 bg-linear-to-t from-black/95 via-transparent to-transparent" />
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-900 dark:text-white hover:text-[#fbbf24] transition-colors pt-8 mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-center h-[calc(100%-8rem)]">
            <div className="w-64 shrink-0">
              <div className="relative overflow-hidden rounded-lg aspect-2/3 bg-gray-100 dark:bg-white/5 shadow-2xl">
                <ImageCard
                  src={details?.posterUrl}
                  alt={details?.title}
                  className="w-full h-full object-cover"
                />
              </div>
                <p className="text-[#fbbf24] font-semibold font-serif text-center text-lg capitalize pt-5">{details.tagline}</p>
            </div>

            <div className="flex-1 pb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#fbbf24] text-black px-3 py-1 rounded-md font-medium text-sm">
                  {dateFormat(details?.releaseDate)}
                </span>
                <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-md">
                  <Star className="w-4 h-4 text-[#fbbf24] fill-[#fbbf24]" />
                  <span className="font-medium">{details?.rating}/10</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{details?.runtime && runtimeFormat(details?.runtime)}</span>
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
                {details?.title}
              </h1>

              <p className="text-lg text-gray-400 mb-6">
                {details?.genres && details.genres.map((genre, i) => (
                  <span key={`genre-${i}`}>{genre?.name.trim() + ((i + 1) < details.genres.length ? ", " : "")}</span>
                ))}
              </p>
              

              <p className="text-gray-300 mb-8 max-w-3xl leading-relaxed">
                {details?.overview}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <button onClick={() => setIsModalOpen(true)} className={`flex items-center gap-2 bg-[#fbbf24] hover:bg-[#f59e0b] text-black px-8 py-3 rounded-lg font-medium transition-colors ${details.videos && "cursor-pointer"}`}>
                  <Play className="w-5 h-5 fill-black" />
                  {details.videos ?  "Assistir Trailer" : "Sem Trailer Disponível"}
                </button>
                {details.videos && <TrailerModal key={details.videos.name} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} videoKey={details.videos.key} />}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                <div>
                  <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Diretor</h3>
                  <p className="text-gray-900 dark:text-white font-medium">{details.crew.name}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Elenco Principal</h3>
                  <p className="text-gray-900 dark:text-white">
                    {details.cast.map((c) => ( c?.name?.trim() )).join(", ")}
                  </p> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 px-12 py-3">Títulos Similares</h2>
          <MediaCarousel medias={details.recommendations} />
        </section>
      </main>
    </div>
  );
}
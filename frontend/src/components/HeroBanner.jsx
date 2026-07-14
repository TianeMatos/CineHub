import { Play, Info, Star } from "lucide-react";
import { ImageCard } from "./ui/ImageCard";
import { Link } from "react-router";
import { useState } from "react";
import { TrailerModal } from "./ui/TrailerModal";
import { useMediaTrailer } from "../hooks/useMediaTrailer";
import { dateFormat } from "../utils/dateTimeFormat";

export const HeroBanner = ({ id, title, overview, rating, releaseDate, backdropUrl, mediaType }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: trailer, loading, getTrailer } = useMediaTrailer();

  function handlePlayClick() {
    setIsModalOpen(true);
    getTrailer(mediaType, id);
  }

  return (
    <div className="relative h-[70vh] min-h-500px w-full overflow-hidden">
      <div className="absolute inset-0">
        <ImageCard src={backdropUrl} alt={title} className={"w-full h-full object-cover "} />
        <div className="absolute inset-0 bg-linear-to-r from-black via-transparent to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#fbbf24] text-black px-3 py-1 rounded-md font-medium text-sm">
              Em Destaque
            </span>
            <div className="flex items-center gap-1 bg-black/55 backdrop-blur-sm px-2 py-1 rounded-md">
              <Star className="w-4 h-4 text-[#fbbf24] fill-[#fbbf24]" />
              <span className="font-medium">{rating}</span>
            </div>
            <span className="text-gray-500 dark:text-gray-400">{dateFormat(releaseDate)}</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
            {title}
          </h1>

          <p className="text-lg text-gray-300 mb-8 line-clamp-3">
            {overview}
          </p>

          <div className="flex flex-wrap gap-4">
            <div>
              <button onClick={handlePlayClick} className={`flex items-center gap-2 bg-[#fbbf24] hover:bg-[#f59e0b] text-black px-8 py-3 rounded-lg font-medium transition-colors cursor-pointer`}>
                <Play className="w-5 h-5 fill-black" /> 
                {loading ? "Carregando..." : "Assistir Trailer"}
              </button>
              {isModalOpen && trailer && (<TrailerModal key={trailer.name} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} videoKey={trailer.key} />)}
            </div>

            <Link to={`/${mediaType}/${id}`} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-gray-900 dark:text-white px-8 py-3 rounded-lg font-medium transition-colors border border-white/20">
              <Info className="w-5 h-5" />
              Mais Informações
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

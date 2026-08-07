import { Play, Info, Star } from "lucide-react";
import { ImageCard } from "../ui/ImageCard";
import { Link } from "react-router";
import { useState } from "react";
import { TrailerModal } from "../ui/TrailerModal";
import { yearFormat } from "../../utils/dateTimeFormat";
import { apiClient } from "../../services/api";

export const HeroBanner = ({ id, title, overview, rating, releaseDate, backdropUrl, mediaType }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handlePlayClick() {
    if (trailerKey) {
      setIsModalOpen(true);
      return;
    }

    try {
      setLoading(true);
      const { data } = await apiClient.get(`/${mediaType}/${id}/trailer`);
      
      setTrailerKey(data?.key);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erro ao buscar trailer:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative h-[60vh] sm:h-[70vh] min-h-96 w-full overflow-hidden">
      <div className="absolute inset-0">
        <ImageCard src={backdropUrl} alt={title} className={"w-full h-full object-cover object-top"} />
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-[#fbbf24] text-black px-3 py-1 rounded-md font-medium text-sm">
              Em Destaque
            </span>
            <div className="flex items-center gap-1 bg-black/55 backdrop-blur-sm px-2 py-1 rounded-md">
              <Star className="w-4 h-4 text-[#fbbf24] fill-[#fbbf24]" />
              <span className="font-medium">{rating}</span>
            </div>
            <span className="text-[#fbbf24] font-medium">{yearFormat(releaseDate)}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
            {title}
          </h1>

          <p className="text-lg text-gray-300 mb-6 line-clamp-3">
            {overview}
          </p>

          <div className="flex flex-wrap gap-4">
            <div>
              <button onClick={handlePlayClick} className={`flex items-center gap-2 bg-[#fbbf24] hover:bg-[#f59e0b] text-black px-6 sm:px-8 py-3 rounded-lg font-medium transition-colors cursor-pointer`}>
                <Play className="w-5 h-5 fill-black" /> 
                {loading ? "Carregando..." : "Assistir Trailer"}
              </button>
              {isModalOpen && (<TrailerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} videoKey={trailerKey} />)}
            </div>

            <Link to={`/${mediaType}/${id}`} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 sm:px-8 py-3 rounded-lg font-medium transition-colors border border-white/20">
              <Info className="w-5 h-5" />
              Mais Informações
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

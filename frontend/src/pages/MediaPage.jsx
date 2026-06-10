import { MediaCard } from "../components/MediaCard";
import { Filter } from "lucide-react";
import { LoadingScreen } from "../components/ui/LoadingScreen";
import { useState } from "react";
import { ErrorScreen } from "../components/ui/ErrorScreen";
import { useMoveiMedia } from "../hooks/useMediaPage";

export function MediaPage({ mediaType, title, description }) {
  const [selectedGenre, setSelectedGenre] = useState({ id: "all", name: "Todos" });
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [currentPage, setCurrentPage] = useState(1);

  const genreParam = selectedGenre.id !== "all" ? `&genre=${selectedGenre.id}` : "";
  const mediaEndpoint = `/${mediaType}/discover?page=${currentPage}&sortBy=${sortBy}${genreParam}`;
  const genreEndpoint = `/${mediaType}/genres`

  const { mediaData, genres, loading, error } = useMoveiMedia(mediaEndpoint, genreEndpoint);
  const totalPages = mediaData?.dataInfo?.totalPages
    ? Math.min(mediaData?.dataInfo?.totalPages, mediaData?.dataInfo?.totalPages)
    : 1;

  if (loading) return <LoadingScreen key={`LoadingScreen`} />;
  if (error) return <ErrorScreen key={`ErrorScreen`} message={error} />;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex items-center gap-2 bg-[#1f1f1f] rounded-lg px-4 py-3 flex-1">
          <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-transparent border-none outline-none w-full text-sm text-gray-900 dark:text-white cursor-pointer"
          >
            <option value="popularity.desc" className="bg-[#1f1f1f]">
              Ordenar por: Mais Populares
            </option>
            <option value="vote_average.desc" className="bg-[#1f1f1f]">
              Ordenar por: Melhor Avaliados
            </option>
            <option value="primary_release_date.desc" className="bg-[#1f1f1f]">
              Ordenar por: Mais Recentes
            </option>
          </select>
        </div>
      </div>

      {/* //* Genre */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scroll-smooth scrollbar-thin scrollbar-thumb-[#fbbf24] scrollbar-track-[#1f1f1f]">
        {[{ id: "all", name: "Todos" }, ...genres].map((genre) => (
          <button
            key={genre.id}
            onClick={() => {
              setSelectedGenre(genre);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 mb-1 rounded-lg whitespace-nowrap transition-colors ${
              genre.id === selectedGenre.id
                ? "bg-[#fbbf24] text-black"
                : "bg-[#1f1f1f] text-gray-900 dark:text-white hover:bg-[#2a2a2a]"
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* //* Pagination + Data */}
      {mediaData?.results?.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {mediaData?.results.map((media) => (
            <MediaCard key={`${media.mediaType}-${media.id}`} {...media} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Nenhum filme encontrado para este gênero.
          </p>
        </div>
      )}

      {/* //* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-4 py-2 bg-[#1f1f1f] hover:bg-[#2a2a2a] text-gray-900 dark:text-white rounded-lg transition-colors"
            >
              Anterior
            </button>
            
            <span className="text-sm text-gray-400 px-2">
              Página <b>{currentPage}</b> de {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-4 py-2 bg-[#1f1f1f] hover:bg-[#2a2a2a] text-gray-900 dark:text-white rounded-lg transition-colors"
            >
              Próximo
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

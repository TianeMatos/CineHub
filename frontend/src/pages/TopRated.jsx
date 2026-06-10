import { useState } from "react";
import { Trophy, TrendingUp, Film, Tv } from "lucide-react";
import { useTopRatedMedia } from "../hooks/useTopRatedMedia";
import { LoadingScreen } from "../components/ui/LoadingScreen";
import { ErrorScreen } from "../components/ui/ErrorScreen";
import { RankedRow } from "../components/RankedRow";
import { Pagination } from "../components/ui/Pagination";

export function TopRated() {
  const [activeTab, setActiveTab] = useState("movies");
  const [moviePage, setMoviePage] = useState(1);
  const [seriesPage, setSeriesPage] = useState(1);
  
  const { topRatedMovies, topRatedSeries, loading, error } = useTopRatedMedia(moviePage, seriesPage);
  
  if (loading) return <LoadingScreen key={`LoadingScreen`} />
  if (error) return  <ErrorScreen key={`ErrorScreen`} message={error} />
  
  const page = activeTab === "movies" ? moviePage : seriesPage;
  const data = activeTab === "movies" ? topRatedMovies : topRatedSeries;
  const setPage = activeTab === "movies" ? setMoviePage : setSeriesPage;
  const totalPages = 5;
  const pageItems = data;
  const globalOffset = (page - 1) * 20;

  function handleTabChange(tab) {
    setActiveTab(tab);
  }

  function handlePageChange(p) {
    setPage(p);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/*//* Header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="bg-linear-to-br from-[#fbbf24] to-[#f59e0b] p-3 rounded-xl">
          <Trophy className="w-8 h-8 text-black" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-white mb-1">Melhor Avaliados</h1>
          <p className="text-gray-400">Os títulos com as melhores avaliações de todos os tempos</p>
        </div>
      </div>

      {/*//* Info banner */}
      <div className="bg-linear-to-r from-[#fbbf24]/10 to-transparent rounded-2xl p-5 border border-[#fbbf24]/20 mb-8 flex items-start gap-3">
        <TrendingUp className="w-5 h-5 text-[#fbbf24] mt-0.5 shrink-0" />
        <p className="text-sm text-gray-400">
          Seleção baseada em avaliações de críticos e público, atualizada semanalmente.
          <span className="block">
            Todos os títulos possuem avaliação acima de <span className="text-[#fbbf24] font-medium">8.5/10</span>.
          </span>
        </p>
      </div>

      {/*//* Tabs */}
      <div className="flex gap-1 p-1 bg-secondary rounded-xl mb-6 w-fit">
        <button
          onClick={() => handleTabChange("movies")}
          className={`flex items-center cursor-pointer gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === "movies"
              ? "bg-[#fbbf24] text-black shadow-sm"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Film className="w-4 h-4" />
          Filmes
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === "movies" ? "bg-black/20 text-black" : "bg-white/5 text-gray-400"}`}>
            {topRatedMovies.length * totalPages}
          </span>
        </button>
        <button
          onClick={() => handleTabChange("series")}
          className={`flex items-center cursor-pointer gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === "series"
              ? "bg-[#fbbf24] text-black shadow-sm"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Tv className="w-4 h-4" />
          Séries
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === "series" ? "bg-black/20 text-black" : "bg-white/5 text-gray-400"}`}>
            {topRatedSeries.length * totalPages}
          </span>
        </button>
      </div>

      {/*//* Range label */}
      <p className="text-xs text-gray-400/60 mb-3 px-1">
        Exibindo #{globalOffset + 1}–#{globalOffset + pageItems.length} de {data.length * totalPages} títulos
      </p>

      {/*//* Ranked list */}
      <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row md:grid-flow-col grid-rows-none md:grid-rows-10 gap-x-6 gap-y-1">
        {pageItems?.map((item, index) => (
          <RankedRow key={item.id} item={item} rank={globalOffset + index + 1} />
        ))}
      </div>

      {/*//* Pagination */}
      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </main>
  );
}
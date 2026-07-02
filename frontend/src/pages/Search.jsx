import { useSearchParams } from "react-router";
import { Search } from "lucide-react";
import { MediaCard } from "../components/MediaCard";
import { ErrorScreen } from "../components/ui/ErrorScreen";
import { LoadingScreen } from "../components/ui/LoadingScreen";
import { useFetchMedia } from "../hooks/useFetchMedia";
import { Pagination } from "../components/ui/Pagination";

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const currentPage = Number(searchParams.get("page")) || 1;

  const url = query.trim() ? `/search?q=${encodeURIComponent(query)}&page=${currentPage}` : null;
  const { data: searchData, loading, error } = useFetchMedia(url);

  const totalPages = searchData?.dataInfo?.totalPages ?? 1;
  const results = searchData?.results ?? [];
  const totalResults = searchData?.dataInfo?.totalResults ?? 0;
  const hasQuery = query.trim().length > 0;

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} />;

  function handlePageChange(p) {
    setSearchParams({ q: query, page: p})

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Type filter - Maybe implement */}
      {/* {hasQuery && (
        <div className="flex gap-2 mb-8">
          {[
            { value: "all", label: "Tudo", count: results.length },
            { value: "movie", label: "Filmes", count: movies.length, icon: Film },
            { value: "series", label: "Séries", count: series.length, icon: Tv },
          ].map(({ value, label, count, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setTypeFilter(value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                typeFilter === value
                  ? "bg-[#fbbf24] text-black"
                  : "bg-[#1f1f1f] text-muted-foreground hover:text-foreground"
              }`}
            >
              {Icon && <Icon className="w-4 h-4" />}
              {label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${typeFilter === value ? "bg-black/20 text-black" : "bg-muted"}`}>
                {count}
              </span>
            </button>
          ))}
        </div>
      )} */}

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">
          Resultados para <span className="text-[#fbbf24]">"{query}"</span>
        </h1>
        {totalResults > 0 && (
          <p className="text-gray-500 text-sm mt-1">
            {totalResults.toLocaleString("pt-BR")} títulos encontrados
          </p>
        )}
      </div>

      {/* Results */}
      {hasQuery && results.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Search className="w-12 h-12 text-muted-foreground/30 mb-4" />
          <p className="text-lg font-medium text-foreground mb-2">Nenhum resultado para "{query}"</p>
          <p className="text-sm text-muted-foreground">Tente outros termos ou navegue pelos gêneros</p>
        </div>
      ) : (
        <div className="space-y-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {results.map((item) => (
              <MediaCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      )}

      <Pagination page={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
    </main>
  );
}
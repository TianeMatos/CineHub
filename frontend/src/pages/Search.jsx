import { useSearchParams } from "react-router";
import { Film, Search, Tv } from "lucide-react";
import { MediaCard } from "../components/MediaCard";
import { ErrorScreen } from "../components/ui/ErrorScreen";
import { LoadingScreen } from "../components/ui/LoadingScreen";
import { useFetchMedia } from "../hooks/useFetchMedia";
import { Pagination } from "../components/ui/Pagination";
import { useState } from "react";


export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const currentPage = Number(searchParams.get("page")) || 1;
  const [typeFilter, setTypeFilter] = useState("all"); // all | movie | series

  const url = query.trim() ? `/search?q=${encodeURIComponent(query)}&page=${currentPage}` : null;
  const { data, loading, error } = useFetchMedia(url);

  const totalPages = data?.dataInfo?.totalPages ?? 1;
  const results = data?.results ?? [];
  const totalResults = data?.dataInfo?.totalResults ?? 0;
  const hasQuery = query.trim().length > 0;

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} />;

  function handlePageChange(p) {
    setSearchParams({ q: query, page: p})

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  }

  const movies = results.filter((r) => r.mediaType === "movie");
  const series = results.filter((r) => r.mediaType === "series");

  // TODO: Talvez implementar o filtro por tipo, mexendo tambem na paginação
  const displayedMedias = typeFilter === "all" 
  ? results 
  : typeFilter === "movie" ? movies : series;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Type filter */}
      {hasQuery && (
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
      )}

      {/* Empty state — no query yet */}
      {/* {!hasQuery && (
        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-4">Pesquisas populares</p>
          <div className="flex flex-wrap gap-2 mb-12">
            {POPULAR.map((tag) => (
              <button
                key={tag}
                onClick={() => { setInputValue(tag); }}
                className="px-4 py-2 bg-[#1f1f1f] hover:bg-[#2a2a2a] text-foreground rounded-lg text-sm transition-colors border border-white/5"
              >
                {tag}
              </button>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mb-4">Em destaque</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {ALL_ITEMS.sort((a, b) => b.rating - a.rating).slice(0, 12).map((item) => (
              <MediaCard key={item.id} {...item} />
            ))}
          </div>
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
          {/* Movies section */}
          {/* {(typeFilter === "all" || typeFilter === "movie") && movies.length > 0 && (
            <section>
              {typeFilter === "all" && (
                <div className="flex items-center gap-2 mb-4">
                  <Film className="w-4 h-4 text-[#fbbf24]" />
                  <h2 className="font-semibold text-foreground">Filmes</h2>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{movies.length}</span>
                </div>
              )}
            </section>
          )} */}

          {/* Series section */}
          {/* {(typeFilter === "all" || typeFilter === "series") && series.length > 0 && (
            <section>
              {typeFilter === "all" && (
                <div className="flex items-center gap-2 mb-4">
                  <Tv className="w-4 h-4 text-[#fbbf24]" />
                  <h2 className="font-semibold text-foreground">Séries</h2>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{series.length}</span>
                </div>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {series.map((item) => (
                  <MediaCard key={item.id} {...item} />
                ))}
              </div>
            </section>
          )} */}
        </div>
      )}

      <Pagination page={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
    </main>
  );
}
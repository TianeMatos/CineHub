import { HeroBanner } from "../components/HeroBanner";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { useHomeMedia } from "../hooks/useHomeMedia";
import { LoadingScreen } from "../components/ui/LoadingScreen";
import { ErrorScreen } from "../components/ui/ErrorScreen";
import { MediaCarousel } from "../components/MediaCarousel";

// TODO: implementar a busca, SearchPage... - Metade
// TODO: Consertar a estrutura dos hooks e paginas
// TODO: Implementar o componente Pagination

export const Home = () => {
  const { loading, error, trendings, topRated, featuredMedia } = useHomeMedia();

  if (loading) return <LoadingScreen key={`LoadingScreen`} />
  if (error) return  <ErrorScreen key={`ErrorScreen`} message={error} />
  
  return (
    <>
      <HeroBanner key={`featuredMedia-${featuredMedia?.id}`} {...featuredMedia} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Em Alta</h2>
            <Link to={`/movies`} className="flex items-center gap-2 text-[#fbbf24] hover:text-[#f59e0b] transition-colors">
              Ver Todos
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
          <MediaCarousel key={`trendings`} medias={trendings} />
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Melhores Avaliados</h2>
            <Link to={`/topRated`} className="flex items-center gap-2 text-[#fbbf24] hover:text-[#f59e0b] transition-colors">
              Ver Todos
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
          <MediaCarousel key={`topRated`} medias={topRated} />
        </section>

        <section className="bg-linear-to-r from-[#fbbf24]/10 to-transparent rounded-2xl p-8 md:p-12 border border-[#fbbf24]/20">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Descubra Mais de 10.000 Filmes e Séries
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Explore nossa vasta coleção de filmes e séries. Encontre informações detalhadas, avaliações, trailers e muito mais.
            </p>
            <Link to="/movies" className="inline-block bg-[#fbbf24] hover:bg-[#f59e0b] text-black px-6 py-3 rounded-lg font-medium transition-colors">
              Explorar Catálogo de Filmes
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

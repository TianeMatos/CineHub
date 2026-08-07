import { HeroBanner } from "../components/layout/HeroBanner";
import { Link } from "react-router";
import { useHomeMedia } from "../hooks/useHomeMedia";
import { LoadingScreen } from "../components/ui/LoadingScreen";
import { ErrorScreen } from "../components/ui/ErrorScreen";
import { MediaSection } from "../components/MediaSection";

// TODO -> FIX: trendings mistura filmes e séries mas o "Ver Todos" vai só pra /movies
// TODO -> FIX: comprimento dos badges nas pages details 
// TODO -> FIX: igualar a estrutura da page de filmes e series, deixar o layout mais estruturado
// TODO -> FIX: melhorar o badge de status da serie

export function Home() {
  const { loading, error, trendings, featuredMedia, popularMovies, popularSeries } = useHomeMedia();

  if (loading) return <LoadingScreen />
  if (error) return <ErrorScreen message={error} />
  console.log(featuredMedia)
  
  return (
    <>
      <HeroBanner key={`featuredMedia-${featuredMedia?.id}`} {...featuredMedia} />

      <main className="max-w-11/12 mx-auto px-2 sm:px-4 lg:px-10 py-12 space-y-16">
        <MediaSection title={"Em Alta"} href={"/movies"} items={trendings} />
        <MediaSection title={"Series Populares"} href={"/series"} items={popularSeries} />
        <MediaSection title={"Filmes Populares"} href={"/movies"} items={popularMovies} />

        <section className="bg-linear-to-r from-[#fbbf24]/10 to-transparent rounded-2xl p-8 md:p-12 border border-[#fbbf24]/20">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Descubra Mais de 10.000 Filmes e Séries
            </h2>
            <p className="text-gray-400 mb-6">
              Explore nossa vasta coleção de filmes e séries. Encontre informações detalhadas, avaliações, trailers e muito mais.
            </p>
            <Link to="/movies" className="inline-block bg-[#fbbf24] hover:bg-[#f59e0b] text-black px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium transition-colors">
              Explorar Catálogo de Filmes
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

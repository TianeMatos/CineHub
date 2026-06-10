import { useFetchMedia } from "./useFetchMedia";
import { useTopRatedMedia } from "./useTopRatedMedia";

export const useHomeMedia = () => {
  const { data: trendingMovies, error: errTM, loading: loadTM } = useFetchMedia('/movie/trendings');
  const { data: trendingSeries, error: errTS, loading: loadTS } = useFetchMedia('/tv/trendings');
  const { topRatedMovies, topRatedSeries, error: errTR, loading: loadTR } = useTopRatedMedia(1, 1)

  const loading = loadTM || loadTS || loadTR;
  const error = errTM || errTS || errTR;

  const allTrendings = [...(trendingMovies ?? []), ...(trendingSeries ?? [])];
  const allTopRated = [...(topRatedMovies.slice(0, 10) ?? []), ...(topRatedSeries.slice(0, 10) ?? [])];

  const trendings = allTrendings.sort((a, b) => b.popularity - a.popularity);
  const topRated = allTopRated.sort((a, b) => b.rating - a.rating);
  const featuredMedia = trendings?.[0];

  return { loading, error, trendings, topRated, featuredMedia }
}
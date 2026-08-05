import { useFetchMedia } from "./useFetchMedia";

export function useTopRatedMedia(moviePage, seriesPage) {
  const { data: moviesData, loading: loadM, error: errM } = useFetchMedia(`/movie/topRated?page=${moviePage}`);
  const { data: seriesData, loading: loadS, error: errS } = useFetchMedia(`/tv/topRated?page=${seriesPage}`);

  return {
    topRatedMovies: moviesData || [],
    topRatedSeries: seriesData || [],
    loading: loadM || loadS,
    error: errM || errS,
  };
}
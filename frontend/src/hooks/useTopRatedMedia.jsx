import { useFetchMedia } from "./useFetchMedia";

export function useTopRatedMedia(moviePage, seriesPage) {
  const { data: moviesData, loading: loadM, error: errM } = useFetchMedia(`/movie/topRated?voteAverage=8.5&page=${moviePage}`);
  const { data: seriesData, loading: loadS, error: errS } = useFetchMedia(`/tv/topRated?voteAverage=8.5&page=${seriesPage}`);

  return {
    topRatedMovies: moviesData || [],
    topRatedSeries: seriesData || [],
    loading: loadM || loadS,
    error: errM || errS,
  };
}
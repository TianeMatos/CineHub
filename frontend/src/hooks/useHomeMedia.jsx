import { useFetchMedia } from "./useFetchMedia";

export const useHomeMedia = () => {
  const { data: trendingMovies, error: errTM, loading: loadTM } = useFetchMedia('/movie/trendings');
  const { data: trendingSeries, error: errTS, loading: loadTS } = useFetchMedia('/tv/trendings');
  const { data: popularMovies, error: errPM, loading: loadPM } = useFetchMedia('/movie/popular');
  const { data: popularSeries, error: errPS, loading: loadPS } = useFetchMedia('/tv/popular');

  const loading = loadTM || loadTS || loadPM || loadPS;
  const error = errTM || errTS || errPM || errPS;

  const allTrendings = [...(trendingMovies ?? []), ...(trendingSeries ?? [])];
  const trendings = allTrendings.sort((a, b) => b.popularity - a.popularity);
  const featuredMedia = trendings?.[0];

  return { loading, error, trendings, featuredMedia, popularMovies, popularSeries }
}
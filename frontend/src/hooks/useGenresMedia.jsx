import { useFetchMedia } from "./useFetchMedia";

export const useGenreMedia = (mediaType, genreIds) => {
  const { data, error, loading } = useFetchMedia(`${mediaType}/genres`);

  const genreMapped = genreIds.map((genreId) => {
    return data?.find((genre) => genre.id === genreId)
  })

  return { 
    genres: genreMapped || [], 
    loading, 
    error 
  }
}
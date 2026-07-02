import { useFetchMedia } from "./useFetchMedia";

export const useExploreMedia = (mediaEndpoint, genreEndpoint) => {
  const { data: mediaData, error: errM, loading: loadM } = useFetchMedia(mediaEndpoint);
  const { data: genreData, error: errGL, loading: loadGL } = useFetchMedia(genreEndpoint);

  const loading = loadM || loadGL;
  const error = errM || errGL;

  return { 
    mediaData: mediaData || { results: [], dataInfo: [] }, 
    genres: genreData || [], 
    loading, 
    error 
  }
}
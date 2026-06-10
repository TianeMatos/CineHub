import { useFetchMedia } from "./useFetchMedia";
import { useMediaTrailer } from "./useMediaTrailer";

export const useMediaDetails = (mediaType, id) => {
  const { data: details, loading: loadD, error: errD } = useFetchMedia(`/${mediaType}/${id}/details`);
  const { data: similar, loading: loadS, error: errS } = useFetchMedia(`/${mediaType}/${id}/similar`);
  const { data: credits, loading: loadC, error: errC } = useFetchMedia(`/${mediaType}/${id}/credits`);
  const { data: trailer, loading: loadT, error: errT } = useMediaTrailer(mediaType, id);

  return { 
    details,
    similar,
    trailer,
    credits, 
    loading: loadD || loadS || loadT || loadC, 
    error: errD || errS || errT || errC
  }
}
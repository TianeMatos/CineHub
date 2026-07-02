import { useFetchMedia } from "./useFetchMedia";
import { useMediaTrailer } from "./useMediaTrailer";

export const useMediaDetails = (mediaType, id) => {
  const { data: details, loading, error } = useFetchMedia(`/${mediaType}/${id}/details`);
  // const { data: similar, loading: loadS, error: errS } = useFetchMedia(`/${mediaType}/${id}/similar`);
  // const { data: credits, loading: loadC, error: errC } = useFetchMedia(`/${mediaType}/${id}/credits`);
  // const { data: trailer, loading: loadT, error: errT } = useMediaTrailer(mediaType, id);
  console.log(details)
  return { 
    details,
    loading,
    error
  }
}
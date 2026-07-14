import { useFetchMedia } from "./useFetchMedia";

export const useMediaDetails = (mediaType, id) => {
  const { data: details, loading, error } = useFetchMedia(`/${mediaType}/${id}/details`);

  return { 
    details,
    loading,
    error
  }
}
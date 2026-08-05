import { useState } from "react";
import { useFetchMedia } from "./useFetchMedia";

export const useMediaTrailer = (initialMediaType = null, initialId = null) => {
  const [dynamicUrl, setDynamicUrl] = useState(null);
  const currentUrl = dynamicUrl ?? 
  (initialMediaType && initialId ? `/${initialMediaType}/${initialId}/trailer` : null);

  const { data, loading, error } = useFetchMedia(currentUrl);

  const getTrailer = (mediaType, id) => {
    if (mediaType && id) {
      setDynamicUrl(`/${mediaType}/${id}/trailer`);
    }
  };

  return { 
    data: currentUrl ? data : null, 
    loading: currentUrl ? loading : false, 
    error,
    getTrailer
  }
}
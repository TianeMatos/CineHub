import { useState, useEffect } from "react";
import { useFetchMedia } from "./useFetchMedia";

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce —> só busca 300ms depois de parar de digitar
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const url = debouncedQuery.trim() ? `/search?q=${encodeURIComponent(debouncedQuery)}&page=1` : null;
  const { data, loading, error } = useFetchMedia(url);

  const clear = () => {
    setQuery("");
    setDebouncedQuery("");
  };

  return { 
    query, 
    setQuery, 
    results: data?.results?.slice(0, 5) ?? [], 
    loading, 
    error, 
    clear 
  };
}
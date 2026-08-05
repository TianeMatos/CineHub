import { useEffect, useState } from "react";
import { apiClient } from "../services/api";

export const useFetchMedia = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function loadMedia() {
      try {
        const { data } = await apiClient.get(url);
        setData(data);
        
      } catch (err) {
        console.error("Erro capturado no React:", err);
        const mensagemDeErro = err.response?.data?.error || "Erro ao carregar os dados.";
        setError(mensagemDeErro);

      } finally {
        setLoading(false);
      }
    }

    loadMedia();
  }, [url]); 

  return { data, loading, error };
}
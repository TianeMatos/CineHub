import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    accept: 'application/json'
  },
  timeout: 10000 //10000ms = 10 segundos
});

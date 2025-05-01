// services/axios-instance.ts
import axios from "axios";
import { useSessionStore } from "../store/useAuth-store";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Añade el token a cada request
api.interceptors.request.use((config) => {
  const token = useSessionStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepta errores 401 y refresca el token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const accessToken = useSessionStore.getState().accessToken;
        const refreshResponse = await axios.post(`${import.meta.env.VITE_API_URL}/auth/getAccessTokenSeller`, null, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const newToken = refreshResponse.data.accessToken;
        const seller = useSessionStore.getState().seller!;
        useSessionStore.getState().setSession(newToken, seller);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        useSessionStore.getState().clearSession();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

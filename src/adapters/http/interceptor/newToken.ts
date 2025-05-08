import { AxiosError, InternalAxiosRequestConfig } from "axios";
import axiosClient from "../axiosClient";


let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];


const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

export async function newToken(error: AxiosError) {
  const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
  const responseData = error.response?.data as { error?: string; renovate?: boolean };

  if (error.response?.status === 401) {
    window.location.href = "/login";
    return Promise.reject(error);
  }

  if (
    error.response?.status === 403 &&
    responseData?.renovate === true &&
    !originalRequest._retry
  ) {
    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            resolve(axiosClient(originalRequest));
          },
          reject: (err: unknown) => reject(err),
        });
      });
    }

    isRefreshing = true;

    try {
      const rawSession = sessionStorage.getItem("session");
      const parsedSession = rawSession ? JSON.parse(rawSession) : null;
      const refreshToken = parsedSession?.state?.session?.refreshtoken;

      if (!refreshToken) {
        window.location.href = "/login";
        return Promise.reject(error);
      }

      const response = await axiosClient.post("/auth/getAccessTokenSeller", {
        refreshToken: sessionStorage.getItem("refreshToken"), 
      });

      const newAccessToken = response.data.accessToken;

      
      parsedSession.state.session.accesstoken = newAccessToken;
      sessionStorage.setItem("session", JSON.stringify(parsedSession));

  
      axiosClient.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
      processQueue(null, newAccessToken);
      isRefreshing = false;

    
      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return axiosClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      isRefreshing = false;
      window.location.href = "/login";
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
}

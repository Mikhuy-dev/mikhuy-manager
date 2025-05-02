import { InternalAxiosRequestConfig } from "axios";
import { useSessionStore } from "../../../store/useAuth-store";

export function addToken(req: InternalAxiosRequestConfig) {
  const token = useSessionStore.getState().accessToken;
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  req.headers["Content-Type"] = "application/json";
  return req;
}

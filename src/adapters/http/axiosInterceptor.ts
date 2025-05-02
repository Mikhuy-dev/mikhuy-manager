import axiosClient from "./axiosClient";
import { addToken } from "./interceptor/addToken";
import { newToken } from "./interceptor/newToken";

export function AxiosInterceptor() {
  axiosClient.interceptors.request.use(
    (req) => addToken(req),
    (error) => Promise.reject(error)
  );

  axiosClient.interceptors.response.use(
    (res) => res,
    async (error) => newToken(error)
  );
}

import { useEffect, useState } from "react";
import axiosClient from "../adapters/http/axiosClient";
import { useSessionStore } from "../store/useAuth-store";
import { AuthResponseEntity } from "../core/auth/entities/authresponse-entity";

export const useFetchAuthSession = () => {
  const [isLoading, setIsLoading] = useState(true);
  const setSession = useSessionStore((state) => state.setSession);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axiosClient.get<AuthResponseEntity>("/seller/getProfileSeller");
        if (data) {
          setSession(data); // Guarda sesión en Zustand
        }
      } catch (error) {
        console.error("No session started", error);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, [setSession]);

  return { isLoading };
};

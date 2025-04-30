// adapters/auth/useAuth.ts
import { useState } from "react";
import { AuthUseCases } from "../../core/auth/use-cases/auth-usecases";
import { authApi } from "../../services/auth/auth-api";
import { useSessionStore } from "./useAuth-store";

const authUseCases = new AuthUseCases(authApi);

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setSession = useSessionStore((state) => state.setSession); 
  const clearSession = useSessionStore((state) => state.clearSession);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await authUseCases.executeLogin(email, password);
      setSession(data.accesstoken, data.seller); // almacena los datos en zustand
      setError(null);
    } catch (e: any) {
      setError(e.response?.data?.message ?? e.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authUseCases.executeLogout();
      clearSession(); 
    } catch (e: any) {
      setError(e.response?.data?.message ?? e.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, login, logout };
}

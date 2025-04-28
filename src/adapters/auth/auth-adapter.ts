// adapters/auth/useAuth.ts
import { useState } from "react";
import { AuthLoginEntity } from "../../core/auth/entities/authlogin-entity";
import { AuthUseCases } from "../../core/auth/use-cases/auth-usecases";
import { authApi } from "../../services/auth/auth-api";

// Instanciamos el caso de uso con el servicio concreto
 const authUseCases = new AuthUseCases(authApi);
	export function useAuth() {
  const [user, setUser] = useState<AuthLoginEntity | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Llamamos al caso de uso en lugar del API directamente
      const data = await authUseCases.executeLogin(email, password);
      setUser(data);
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
      // Llamamos al caso de uso para logout
      await authUseCases.executeLogout();
      setUser(null);
    } catch (e: any) {
      setError(e.response?.data?.message ?? e.message);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, login, logout };
}

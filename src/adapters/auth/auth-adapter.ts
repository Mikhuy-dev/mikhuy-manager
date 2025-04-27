// adapters/auth/useAuth.ts
import { useState } from "react";
import { AuthLoginEntity } from "../../core/auth/entities/authlogin-entity";
import { authApi } from "../../services/auth/auth-api";


export function useAuth() {
  const [user, setUser] = useState<AuthLoginEntity | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
  
    setLoading(true);
    try {
      const data = await authApi.login(email, password);
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
      await authApi.logout();
      setUser(null);
    } catch (e: any) {
      setError(e.response?.data?.message ?? e.message);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, login, logout };
}

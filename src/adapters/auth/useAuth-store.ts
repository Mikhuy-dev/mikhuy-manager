import { User } from "discord-types/general";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authApi } from "../../services/auth/auth-api";

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            loading: false,
            error: null,
            login: async (email, password) => {
                set({ loading: true });
                try {
                    const userData = await authApi.login(email, password);
                    set({ user: userData, error: null });
                } catch (err: any) {
                    set({ error: err.response?.data?.message || err.message });
                } finally {
                    set({ loading: false });
                }
            },
            logout: async () => {
                set({ loading: true });
                try {
                    await authApi.logout();
                    set({ user: null, error: null });
                } catch (err: any) {
                    set({ error: err.response?.data?.message || err.message });
                } finally {
                    set({ loading: false });
                }
            }
        }),
        {
            name: 'auth-storage', // clave en el localStorage
        }
    )
);
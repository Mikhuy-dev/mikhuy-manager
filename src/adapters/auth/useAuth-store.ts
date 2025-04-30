// store/useSessionStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthLoginEntity } from '../../core/auth/entities/authlogin-entity';
import { AuthResponseEntity } from '../../core/auth/entities/authresponse-entity';

interface SessionState {
  accessToken: string | null;
  user: AuthResponseEntity | null;
  setSession: (token: string, user: AuthResponseEntity['seller']) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      setSession: (token, user) => set({ accessToken: token, user }),
      clearSession: () => set({ accessToken: null, user: null }),
    }),
    {
      name: 'session-storage', // 🔐 clave en localStorage
      storage: typeof window !== 'undefined'
        ? {
            getItem: (name) => {
              const item = localStorage.getItem(name);
              return item ? JSON.parse(item) : null;
            },
            setItem: (name, value) => {
              localStorage.setItem(name, JSON.stringify(value));
            },
            removeItem: (name) => {
              localStorage.removeItem(name);
            },
          }
        : undefined, // importante en SSR
    }
  )
);

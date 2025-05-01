// store/useSessionStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { UserEntity } from '../core/auth/entities/user-entity';

interface SessionState {
  accessToken: string | null;
  seller: UserEntity | null;
  setSession: (token: string, seller: UserEntity) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      accessToken: null,
      seller: null,
      setSession: (token, seller) => set({ accessToken: token, seller}),
      clearSession: () => set({ accessToken: null, seller: null }),
    }),
    {
      name: 'session-storage', 
      storage: typeof window !== 'undefined'
        ? {
            getItem: (name) => {
              const item = localStorage.getItem(name);
              return item ? JSON.parse(item) : null;
            },
            setItem: (name, value) => {
              sessionStorage.setItem(name, JSON.stringify(value));
            },
            removeItem: (name) => {
              sessionStorage.removeItem(name);
            },
          }
        : undefined,
    }
  )
);

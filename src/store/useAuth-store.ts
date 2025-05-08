import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthResponseEntity } from '../core/auth/entities/authresponse-entity';



interface SessionState {
  session: AuthResponseEntity | null;
  setSession: (session: AuthResponseEntity) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      session: null,
      setSession: (session: AuthResponseEntity) => set({ session }),
      clearSession: () => set({ session: null }),
    }),
    {
      name: 'session-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

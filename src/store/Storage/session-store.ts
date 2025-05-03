// src/store/useSessionStore.ts
import { create } from "zustand";

interface Seller {
  id: string;
  email: string;
  goal: string;
  phone: string;
  name?: string;
}

interface SessionState {
    accessToken: string;
    sellerId: string;
    setSession: (accessToken: string, seller: Seller) => void;
    clearSession: () => void;
  }
  
  export const useSessionStore = create<SessionState>((set) => ({
    accessToken: "",
    sellerId: "",
    setSession: (accessToken, seller) => {
      set({ accessToken, sellerId: seller.id });
    },
    clearSession: () => {
      set({ accessToken: "", sellerId: "" });
    },
  }));
  
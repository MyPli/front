import { getAccessToken } from "@/action/login";
import { create } from "zustand";

interface StoreState {
  isloggedIn: boolean;
  initialized: boolean;
  storeLogin: () => void;
  storeLogout: () => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<StoreState>((set) => ({
  isloggedIn: false,
  initialized: false,
  storeLogin: () => {
    set({ isloggedIn: true });
  },
  storeLogout: () => {
    set({ isloggedIn: false });
  },
  initializeAuth: async () => {
    const isAuthenticated = await getAccessToken();
    set({ isloggedIn: Boolean(isAuthenticated), initialized: true });
  },
}));

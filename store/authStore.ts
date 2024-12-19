import { auth } from "@/models/auth.model";
import { create } from "zustand";
interface StoreState {
  isloggedIn: boolean;
  storeLogin: () => void;
  storeLogout: () => void;
}

export const useAuthStore = create<StoreState>((set) => ({
  isloggedIn: false,
  storeLogin: () => {
    set({ isloggedIn: true });
  },
  storeLogout: () => {
    set({ isloggedIn: false });
  },
}));

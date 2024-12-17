import { create } from "zustand";

interface StoreState {
  loginModal: boolean;
  closeLoginModal: () => void;
  openLoginModal: () => void;
}

export const useLoginModalStore = create<StoreState>((set) => ({
  loginModal: false,
  openLoginModal: () => set({ loginModal: true }),
  closeLoginModal: () => set({ loginModal: false }),
}));

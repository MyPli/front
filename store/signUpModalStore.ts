import { create } from "zustand";

interface StoreState {
  signUpModal: boolean;
  closeSignUpModal: () => void;
  openSignUpModal: () => void;
}

export const useSignUpModalStore = create<StoreState>((set) => ({
  signUpModal: false,
  openSignUpModal: () => set({ signUpModal: true }),
  closeSignUpModal: () => set({ signUpModal: false }),
}));

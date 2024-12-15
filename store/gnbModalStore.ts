import { create } from "zustand";

interface StoreState {
  loginModal: boolean;
  signUpModal: boolean;
  mypageModal: boolean;

  closeLoginModal: () => void;
  openLoginModal: () => void;
  closeSignUpModal: () => void;
  openSignUpModal: () => void;
  closeMypageModal: () => void;
  openMypageModal: () => void;
}

export const useGnbModalStore = create<StoreState>((set) => ({
  loginModal: false,
  signUpModal: false,
  mypageModal: false,

  openLoginModal: () => set({ loginModal: true }),
  closeLoginModal: () => set({ loginModal: false }),

  openSignUpModal: () => set({ signUpModal: true }),
  closeSignUpModal: () => set({ signUpModal: false }),

  openMypageModal: () => set({ mypageModal: true }),
  closeMypageModal: () => set({ mypageModal: false }),
}));

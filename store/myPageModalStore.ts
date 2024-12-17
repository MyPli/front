import { create } from "zustand";

interface StoreState {
  mypageModal: boolean;
  closeMypageModal: () => void;
  openMypageModal: () => void;
}

export const useMypageModalModalStore = create<StoreState>((set) => ({
  mypageModal: false,
  openMypageModal: () => set({ mypageModal: true }),
  closeMypageModal: () => set({ mypageModal: false }),
}));

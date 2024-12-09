import { create } from "zustand";

interface StoreState {
  isOpen: boolean;
  activeSideList: () => void;
}

export const useSideStore = create<StoreState>((set) => ({
  isOpen: false,
  activeSideList: () => set((state) => ({ isOpen: !state.isOpen })),
}));

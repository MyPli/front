import { create } from "zustand";

interface StoreState {
  isOpen: boolean;
  activeSideList: () => void;
  closeSideList: () => void;
}

export const useSideListStore = create<StoreState>((set) => ({
  isOpen: false,
  activeSideList: () => set((state) => ({ isOpen: !state.isOpen })),
  closeSideList: () => set(() => ({ isOpen: false })),
}));

import { create } from "zustand";

interface StoreState {
  mypageEditModal: boolean;
  closeMypageEditModal: () => void;
  openMypageEditModal: () => void;
}

export const useMypageEditModalStore = create<StoreState>((set) => ({
  mypageEditModal: false,
  openMypageEditModal: () => set({ mypageEditModal: true }),
  closeMypageEditModal: () => set({ mypageEditModal: false }),
}));

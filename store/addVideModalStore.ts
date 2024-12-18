import { create } from "zustand";

interface StoreState {
  isAddModalOpen: boolean;
  openAddModal: () => void;
  closeAddModal: () => void;
}

export const useAddVideoModalStore = create<StoreState>((set) => ({
  isAddModalOpen: false,
  openAddModal: () => set({ isAddModalOpen: true }),
  closeAddModal: () => set({ isAddModalOpen: false }),
}));

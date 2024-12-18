import { create } from "zustand";

interface StoreState {
  isDeleteModalOpen: boolean;
  openDeleteModal: () => void;
  closeDeleteModal: () => void;
}

export const useDeletePlaylistStore = create<StoreState>((set) => ({
  isDeleteModalOpen: false,
  openDeleteModal: () => set({ isDeleteModalOpen: true }),
  closeDeleteModal: () => set({ isDeleteModalOpen: false }),
}));

import { create } from "zustand";

type UploadModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useUploadModalStore = create<UploadModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

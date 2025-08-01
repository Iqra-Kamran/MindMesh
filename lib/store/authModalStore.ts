import { create } from "zustand";

interface AuthModalStore {
  open: boolean;
  openModal: () => void;
  close: () => void;
}

export const useAuthModalStore = create<AuthModalStore>((set) => ({
  open: false,
  openModal: () => set({ open: true }),
  close: () => set({ open: false }),
}));

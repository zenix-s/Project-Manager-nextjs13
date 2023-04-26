import { create } from "zustand";

interface AsideProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAside = create<AsideProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAside;
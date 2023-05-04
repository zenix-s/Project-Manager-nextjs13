import { create } from "zustand";
import { ModalProps } from "../types";

const useTasksModal = create<ModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useTasksModal;
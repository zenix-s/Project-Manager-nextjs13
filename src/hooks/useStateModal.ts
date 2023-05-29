import { create } from "zustand";
import { ModalProps, StateProps } from "../types";


interface StateModalProps {
  isOpen: boolean;
  state: StateProps;
  setState: (state: StateProps) => void;
  onOpen: (state?: StateProps | undefined) => void;
  onClose: () => void;
}

const useStateModal = create<StateModalProps>((set) => ({
  isOpen: false,
  state: {} as StateProps,
  setState: (newState: StateProps) => set({ state: newState }),
  onOpen: (newState?: StateProps | undefined) => set({ isOpen: true, state: newState  }),
  onClose: () => set({ isOpen: false }),
}));

export default useStateModal;
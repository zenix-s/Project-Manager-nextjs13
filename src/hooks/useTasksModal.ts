import { create } from "zustand";
import { ModalProps, TaskProps } from "../types";
// export interface TaskProps {
//   id: number;
//   name: string;
//   description: string | null;
//   endDate: Date | null;
//   completed: boolean;
//   stateId: number;
//   projectId: number;
//   userId: number | null;
//   archived: boolean;
//   createdDate: Date;
// }

interface TaskModalProps {
  isOpen: boolean;
  Task: TaskProps;
  // onOpen: (Task: TaskProps) => void;
  onOpen: (Task?: TaskProps) => void;
  onClose: () => void;
}

const useTasksModal = create<TaskModalProps>((set) => ({
  isOpen: false,
  Task: {} as TaskProps,
  onOpen: (newTask?: TaskProps | undefined) => set({ isOpen: true, Task: newTask  }),
  onClose: () => set({ isOpen: false }),
}));

export default useTasksModal;

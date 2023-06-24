"use client";
import Button from "@/components/button";
import useTasksModal from "@/hooks/useTasksModal";
import NewTaskModal from "./newTaskModal";
import { TaskProps, StateProps } from "@/types";
import { VscAdd } from "react-icons/vsc";

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

interface HeaderTasksListProps {
  estados: StateProps[];
  idProject: number;
  onAddTask: ({ newTask }: { newTask: TaskProps }) => void;
}

const HeaderTasksList = ({
  estados,
  idProject,
  onAddTask,
}: HeaderTasksListProps) => {
  const TaskModal = useTasksModal();



  return (
    <div className="flex flex-row items-end justify-between gap-4 mt-2">
      <div className="w-full md:w-max">
        <NewTaskModal idProject={idProject} estados={estados} onAddTask={onAddTask} />
      </div>
      <div className="hidden sm:block">
        <button
          onClick={() => TaskModal.onOpen()}
          className="p-2 rounded-md bg-primary flex items-center gap-2"
        >
          <span>
            <VscAdd />
          </span>
          <span>Nueva tarea</span>
        </button>
      </div>
    </div>
  );
};

export default HeaderTasksList;

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
    <div className="flex flex-col items-end justify-between gap-4 lg:flex-row">
      <div className="hidden lg:block">
        <NewTaskModal idProject={idProject} estados={estados} onAddTask={onAddTask} />
      </div>
      <Button
        theme="primary"
        label="Nueva tarea"
        onClick={() => TaskModal.onOpen()}
        disabled={TaskModal.isOpen}
        icon={VscAdd}
      />
    </div>
  );
};

export default HeaderTasksList;

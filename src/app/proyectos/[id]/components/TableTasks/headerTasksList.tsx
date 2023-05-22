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

const HeaderTasksList = (
  { estados, idProject }: { estados: StateProps[]; idProject: number },
) => {
  const TaskModal = useTasksModal();

  return (
    <div className="flex items-center justify-start">
      <NewTaskModal 
        idProject={idProject}
        estados={estados}
      />
      <Button
        theme="primary"
        label="Nueva tarea avanzada"
        onClick={() => TaskModal.onOpen()}
        disabled={TaskModal.isOpen}
        icon={VscAdd}
      />
    </div>
  );
};

export default HeaderTasksList;
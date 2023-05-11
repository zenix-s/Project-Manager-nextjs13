"use client";
import Button from "@/components/button";
import useTasksModal from "@/hooks/useTasksModal";
import NewTaskModal from "./newTaskForm";
import { TaskProps, StateProps } from "@/types";
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
    </div>
  );
};

export default HeaderTasksList;
"use client";
import Button from "@/components/button";
import useTasksModal from "@/hooks/useTasksModal";
import NewTaskModal from "./newTaskModal";
import { TaskProps, StateProps } from "@/types";

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
      <button
        className="btn btn-primary"
        onClick={() => {
          TaskModal.onOpen(
            {
              id: 0,
              name: "hola mundo perro",
              description: "hola mundo gente",
              endDate: new Date(),
              completed: false,
              stateId: 6,
              projectId: idProject,
              userId: 10,
              archived: false,
              createdDate: new Date(),
            }
          );
        }}

      >
        abrete sesamo
      </button>
    </div>
  );
};

export default HeaderTasksList;
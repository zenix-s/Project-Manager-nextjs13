import { StateProps, TaskProps } from "@/types";
import TasksPerStatus from "./stats/TasksPerStatus";
import TasksCompletedvsNoCompleted from "./stats/TasksCompletedvsNoCompleted";
interface EstadisticasProjectProps {
  tareas: TaskProps[];
  estados: StateProps[];
  idProject: number;
}

const EstadisticasProject = ({
  tareas,
  estados,
  idProject,
}: EstadisticasProjectProps) => {
  return (
    <div className="flex h-full w-full flex-col p-4">
      <div className="flex w-full gap-4">
        <div className="w-1/3">
          <TasksPerStatus tareas={tareas} estados={estados} />
        </div>
        <div className="w-2/3">
          <TasksCompletedvsNoCompleted tareas={tareas} estados={estados} />
        </div>
      </div>
    </div>
  );
};

export default EstadisticasProject;

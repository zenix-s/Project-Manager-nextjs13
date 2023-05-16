import { StateProps, TaskProps } from "@/types";
import TasksPerStatus from "./stats/TasksPerStatus";
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
    <div className="p-4 w-full h-full flex">
      <div className="w-1/3">
        <TasksPerStatus
          tareas={tareas}
          estados={estados}
        />
      </div>
    </div>
  );
};

export default EstadisticasProject;

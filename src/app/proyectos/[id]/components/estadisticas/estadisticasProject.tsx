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
    <div className="p-4 w-full h-full">
      <TasksPerStatus 
        tareas={tareas}
        estados={estados}
      />
    </div>
  );
};

export default EstadisticasProject;

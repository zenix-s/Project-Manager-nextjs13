import { TareaProps, EstadoProps } from "@/types";
import IndividualTask from "./individualTask";
import HeaderTasksList from "./headerTasksList";
import NewTaskModal from "./newTaskForm";

const TableTasks = ({
  tareas,
  estados,
  idProject,
}: {
  tareas: TareaProps[];
  estados: EstadoProps[];
  idProject: number;
}) => {
  return (
    <div className="flex w-full flex-col p-4">
      <div>
        <HeaderTasksList 
          estados={estados} 
          idProject={idProject} 
        />
      </div>
      <div className="divider" />
      <div className="flex flex-col gap-2">
        {tareas.map((tarea) => {
          return (
            <IndividualTask key={tarea.id} tarea={tarea} estados={estados} />
          );
        })}
      </div>
    </div>
  );
};

export default TableTasks;

import { TareaProps, EstadoProps } from "@/types";
import IndividualTask from "./individualTask";
const TableTasks = ({
  tareas,
  estados,
}: {
  tareas: TareaProps[];
  estados: EstadoProps[];
}) => {
  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      {tareas.map((tarea) => {
        return (
          <IndividualTask
            key={tarea.id}
            tarea={tarea}
            estados={estados}
          />
        );
      })}
    </div>
  );
};

export default TableTasks;
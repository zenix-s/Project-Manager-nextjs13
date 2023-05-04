import { TareaProps, EstadoProps } from "@/types";
import IndividualTask from "./individualTask";
import HeaderTasksList from "./headerTasksList";

const TableTasks = ({
  tareas,
  estados,
}: {
  tareas: TareaProps[];
  estados: EstadoProps[];
}) => {
  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      <div>
        <HeaderTasksList />
      </div>
      <div>
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
    </div>
  );
};

export default TableTasks;
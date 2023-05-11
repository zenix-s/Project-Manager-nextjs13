import CardTarea from "./cardTarea";
import ColEstado from "./colEstado";
import NewCol from "./newCol";
import { TaskProps, StateProps } from "@/types";
const Kanban = ({
  tareas,
  estados,
}: {
  tareas: TaskProps[];
  estados: StateProps[];
}) => {
  return (
    <div className="flex h-full w-full flex-row relative">
      <div className="flex py-3 flex-row gap-4 overflow-x-auto overflow-y-hidden absolute top-0 left-0 bottom-0 right-0">
        {estados.map((estado: StateProps) => {
          return (
            <ColEstado
              key={estado.id}
              estado={estado}
              tareas={tareas.filter(
                (tarea: TaskProps) => tarea.stateId === estado.id
              )}
            />
          );
        })}
        <NewCol />
      </div>
    </div>
  );
};

export default Kanban;

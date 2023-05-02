import CardTarea from "./cardTarea";
import ColEstado from "./colEstado";
import NewCol from "./newCol";
import { TareaProps, EstadoProps } from "@/types";
const Kanban = ({
  tareas,
  estados,
}: {
  tareas: TareaProps[];
  estados: EstadoProps[];
}) => {
  return (
    <div className="flex h-full w-1/2 flex-row pt-4 overflow-scroll">
      <div className="flex flex-row gap-4">
        {estados.map((estado: EstadoProps) => {
          return (
            <ColEstado
              key={estado.id}
              estado={estado}
              tareas={tareas.filter(
                (tarea: TareaProps) => tarea.id_estado === estado.id
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

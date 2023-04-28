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
    <div className="h-full">
      <div className="flex h-full gap-4 overflow-scroll p-4">
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

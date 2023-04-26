import CardTarea from "./cardTarea";
import ColEstado from "./colEstado";
const Kanban = ({ tareas, estados }: any) => {
  return (
    <div className="h-full">
      <div className="flex h-full gap-4">
        {estados.map((estado: any) => {
          return (
            <ColEstado
              key={estado.id}
              estado={estado}
              tareas={tareas.filter(
                (tarea: any) => tarea.id_estado === estado.id
              )}
              />
          );
        })
        }
      </div>
    </div>
  );
};

export default Kanban;



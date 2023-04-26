import CardTarea from "./cardTarea";
import ColEstado from "./colEstado";
import NewCol from "./newCol";
const Kanban = ({ tareas, estados }: any) => {
  return (
    <div className="h-full">
      <div className="flex h-full gap-4 p-4 overflow-scroll">
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
        <NewCol />
      </div>
    </div>
  );
};

export default Kanban;



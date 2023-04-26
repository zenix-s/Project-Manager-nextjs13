import CardTarea from "./cardTarea";
import ColEstado from "./colEstado";
const Kanban = ({ tareas, estados }: any) => {
  return (
    <div className="h-full">
      <div className="flex h-full">
        {estados.map((estado: any) => {
          return (
            <ColEstado
              key={estado.id}
              estado={estado}
              />
          );
        })
        }
      </div>
    </div>
  );
};

export default Kanban;

import { StateProps, TaskProps } from "@/types";
import { getHexColor } from "@/actions/getColors";

interface TasksPerStatusProps {
  tareas: TaskProps[];
  estados: StateProps[];
}

const TimeToCompleteATask = ({ tareas, estados }: TasksPerStatusProps) => {
  const TimeToCompleteATask = () => {
    let time = 0;
    tareas.forEach((tarea) => {
      if (tarea.endDate !== null) {
        const createdDate = new Date(tarea.createdDate);
        const endDate = new Date(tarea.endDate);
        const diffTime = Math.abs(endDate.getTime() - createdDate.getTime());
        time += diffTime;
      }
    });
    if (time < 1 ) {
      return 0;
    }
    time = time / tareas.length / 1000 / 60 / 60 / 24;
    time = Math.round(time * 100) / 100;
    
    return time;
  };

  

  return (
    <div
      className=" justify-between flex h-full w-full items-center rounded-xl bg-slate-900 px-8 py-4"
      style={{
        boxShadow: "0px 0px 10px 0px rgba(51,65,85,0.50)",
      }}
    >
      <div className="flex flex-col text-2xl font-bold">
        <h2 className="w-full text-center text-2xl font-bold">
          Tiempo medio para completar una tarea
        </h2>
        <div>
          {TimeToCompleteATask()}
          <span> dias</span>
        </div>
      </div>
      <div>
        <div className="flex flex-col text-2xl font-bold">
          <h2 className="font-bold">Tareas sin Fecha Limite:</h2>{" "}
          {tareas.filter((task) => task.endDate === null).length}
        </div>
      </div>
      <div>
        <div className="flex flex-col text-2xl font-bold">
          <h2 className="font-bold">Tareas con Fecha Limite:</h2>{" "}
          {tareas.filter((task) => task.endDate !== null).length}
        </div>
      </div>
    </div>
  );
};

export default TimeToCompleteATask;

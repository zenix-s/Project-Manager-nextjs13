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
    time = time / tareas.length / 1000 / 60 / 60 / 24;
    time = Math.round(time * 100) / 100;
    return time;
  };

  console.log(TimeToCompleteATask());

  return (
    <div
      className=" flex h-full w-full flex-col items-center justify-center rounded-xl bg-slate-900 px-8 py-4"
      style={{
        boxShadow: "0px 0px 10px 0px rgba(51,65,85,0.50)",
      }}
    >
      <h2 className="w-full text-center text-2xl font-bold">
        Tiempo para completar una tarea
      </h2>
      <div>
        {TimeToCompleteATask()}
        <span> dias</span>
      </div>
    </div>
  );
};

export default TimeToCompleteATask;

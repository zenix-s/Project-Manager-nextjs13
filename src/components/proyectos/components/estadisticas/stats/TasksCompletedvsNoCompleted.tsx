import { StateProps, TaskProps } from "@/types";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  tareas: TaskProps[];
  estados: StateProps[];
}

const TasksCompletedvsNoCompleted = ({ tareas, estados }: Props) => {
  const data = [
    ...estados.map((estado) => {
      return {
        name: estado.name,
        value: tareas.filter((tarea) => tarea.stateId === estado.id).length,
        Completadas: tareas.filter(
          (tarea) => tarea.stateId === estado.id && tarea.completed
        ).length,
        No_Completadas
        : tareas.filter(
          (tarea) => tarea.stateId === estado.id && !tarea.completed
        ).length,
      };
    }),
  ];

  return (
    <div
      className=" flex w-full h-full flex-col items-center justify-center rounded-xl border border-white/30 px-8 py-4"
      style={{
        boxShadow: "0px 0px 10px 0px rgba(51,65,85,0.50)",
      }}
    >
      <h2 className="text-2xl font-bold">
        Tareas Completadas vs No Completadas por Estado
      </h2>
        <BarChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* <Bar dataKey="pv" stackId="a" fill="#8884d8" />
          <Bar dataKey="uv" stackId="a" fill="#82ca9d" /> */}
          <Bar dataKey="No_Completadas"  stackId="a" fill="#8884d8" />
          <Bar dataKey="Completadas" stackId="a" fill="#82ca9d" />
        </BarChart>
      
    </div>
  );
};

export default TasksCompletedvsNoCompleted;

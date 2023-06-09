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
  // const data = [
  //   {
  //     name: 'Page A',
  //     uv: 4000,
  //     pv: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: 'Page B',
  //     uv: 3000,
  //     pv: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: 'Page C',
  //     uv: 2000,
  //     pv: 9800,
  //     amt: 2290,
  //   },
  // ];

  // name = nombre del estado
  // value = cantidad de tareas en ese estado
  // completed = cantidad de tareas completadas en ese estado
  // noCompleted = cantidad de tareas no completadas en ese estado
  const data = [
    ...estados.map((estado) => {
      return {
        name: estado.name,
        value: tareas.filter((tarea) => tarea.stateId === estado.id).length,
        completed: tareas.filter(
          (tarea) => tarea.stateId === estado.id && tarea.completed
        ).length,
        noCompleted: tareas.filter(
          (tarea) => tarea.stateId === estado.id && !tarea.completed
        ).length,
      };
    }),
  ];

  return (
    <div
      className=" flex w-full flex-col items-center justify-center rounded-xl bg-slate-900 px-8 py-4"
      style={{
        boxShadow: "0px 0px 10px 0px rgba(51,65,85,0.50)",
      }}
    >
      
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
          <Bar dataKey="noCompleted"  stackId="a" fill="#8884d8" />
          <Bar dataKey="completed" stackId="a" fill="#82ca9d" />
        </BarChart>
      
    </div>
  );
};

export default TasksCompletedvsNoCompleted;

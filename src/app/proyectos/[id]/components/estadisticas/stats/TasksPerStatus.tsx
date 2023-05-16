import { StateProps, TaskProps } from "@/types";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { getHexColor } from "@/actions/getColors";

interface TasksPerStatusProps {
  tareas: TaskProps[];
  estados: StateProps[];
}

const TasksPerStatus = ({ tareas, estados }: TasksPerStatusProps) => {
  const data: any = [
    ...estados.map((estado) => {
      return {
        name: estado.name,
        value: tareas.filter((tarea) => tarea.stateId === estado.id).length,
      };
    }),
  ];
  // get the colors of the states
  const COLORS = estados.map((estado) => getHexColor(estado.color));

  return (
    <div
      className=" flex w-full flex-col items-center justify-center rounded-xl bg-slate-900 px-8 py-4"
      style={{
        boxShadow: "0px 0px 10px 0px rgba(51,65,85,0.50)",
      }}
    >
      <h2 className="text-2xl font-bold">Tareas por Estado</h2>
      <div>
        <PieChart height={300} width={300}>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            // paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry: any, index: any) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
      <div className="flex items-center justify-center">
        <div>
          {estados.map((estado) => {
            return (
              <div className="flex items-center gap-2" key={estado.id}>
                <div
                  className={`h-3 w-3 rounded-full`}
                  style={{ backgroundColor: getHexColor(estado.color) }}
                ></div>
                <p>
                  {estado.name} -{" "}
                  {
                    tareas.filter((tarea) => tarea.stateId === estado.id)
                      .length
                  }
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TasksPerStatus;

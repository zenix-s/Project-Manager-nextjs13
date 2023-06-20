import { StateProps, TaskProps } from "@/types";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { getHexColor } from "@/actions/getColors";

interface TasksPerPriorityProps {
  tareas: TaskProps[];
  estados: StateProps[];
}

const TasksPerPriority = ({ tareas, estados }: TasksPerPriorityProps) => {

  const prioridades = [
    {
      id: 0,
      name: "Sin Prioridad",
    },
    {
      id: 1,
      name: "Baja",
    },
    {
      id: 2,
      name: "Media",
    },
    {
      id: 3,
      name: "Alta",
    },
    {
      id: 4,
      name: "Urgente",
    }
  ]

  const data: any = [
    ...prioridades.map((prioridad) => {
      return {
        name: prioridad.name,
        value: tareas.filter((tarea) => tarea.priority === prioridad.id).length,
      };
    }),
  ];
  // get the colors of the states
  const COLORS = [
    "#88E0EF",
    "#3DB2FF",
    "#5463FF",
    "#F9D923",
    "#F15412",
    "#FF1818",

  ]

  return (
    <div
      className=" flex w-full h-full flex-col items-center justify-center rounded-xl border border-white/30 px-8 py-4"
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
          {prioridades.map((prioridad) => {
            return (
              <div className="flex items-center gap-2" key={prioridad.id}>
                <div
                  className={`h-3 w-3 rounded-full`}
                  style={{
                    backgroundColor: COLORS[prioridad.id],
                  }}
                ></div>
                <p>
                  {prioridad.name} -{" "}
                  {
                    tareas.filter((tarea) => tarea.priority === prioridad.id)
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

export default TasksPerPriority;

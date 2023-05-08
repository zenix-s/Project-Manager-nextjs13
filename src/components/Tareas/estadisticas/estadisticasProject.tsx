import { EstadoProps, TareaProps } from "@/types";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { getHexColor } from "@/actions/getColors";
interface EstadisticasProjectProps {
  tareas: TareaProps[];
  estados: EstadoProps[];
  idProject: number;
}



const EstadisticasProject = ({
  tareas,
  estados,
  idProject,
}: EstadisticasProjectProps) => {
  const data: any = [
    // { name: 'Group A', value: 400 },
    // { name: 'Group B', value: 300 },
    // { name: 'Group C', value: 300 },
    // { name: 'Group D', value: 200 },

    // map number of tasks by state

    ...estados.map((estado) => {
      return {
        name: estado.nombre,
        value: tareas.filter((tarea) => tarea.id_estado === estado.id).length,
      };
    }),
  ];
  // get the colors of the states
  const COLORS = estados.map((estado) => getHexColor(estado.color));
  const color = "#334155";
  return (
    <div className="p-4">
      <div className=" rounded-xl py-4 px-8 bg-slate-900"
        style={
          {
            boxShadow: "0px 0px 10px 0px rgba(51,65,85,0.50)",
          }
        }
      >
        <div>
          <PieChart width={300} height={300}>
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
                  <p>{estado.nombre} - {tareas.filter((tarea) => tarea.id_estado === estado.id).length}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstadisticasProject;

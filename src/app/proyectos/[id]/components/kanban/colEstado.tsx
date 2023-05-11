"use client";
import CardTarea from "./cardTarea";
import Button from "@/components/button";
import { VscAdd } from "react-icons/vsc";
import { TaskProps, StateProps } from "@/types";
import { getBgColor, getHexColor } from "@/actions/getColors";

const ColEstado = ({
  estado,
  tareas,
}: {
  estado: StateProps;
  tareas: TaskProps[];
}) => {
  return (
    <div className="flex h-full min-w-[350px] flex-col overflow-hidden rounded-lg bg-slate-700">
      <div
        className={` mb-4 flex justify-start p-4 text-xl text-white `}
        style={{
          backgroundColor: getHexColor(estado.color),
        }}
      >
        {estado.name}
      </div>
      <div className="flex flex-col gap-4 px-4">
        {tareas.map((tarea: any) => {
          return <CardTarea key={tarea.id} tarea={tarea} />;
        })}
      </div>
      <div className="mt-4 w-full p-4">
        <Button
          label="Agregar tarea"
          theme="accent"
          onClick={() => {}}
          fullWidth
          center
          icon={VscAdd}
        />
      </div>
    </div>
  );
};
export default ColEstado;

"use client";
import CardTarea from "./cardTarea";
import Button from "../../button";
import { VscAdd } from "react-icons/vsc";
import { TareaProps, EstadoProps } from "@/types";
import { getBgColor, getHexColor } from "@/actions/getColors";

const ColEstado = ({
  estado,
  tareas,
}: {
  estado: EstadoProps;
  tareas: TareaProps[];
}) => {
  return (
    <div
      className="flex h-full min-w-[350px] flex-col rounded-lg overflow-hidden bg-slate-700"
    >
      <div
        className={` mb-4 flex justify-start p-4 text-white text-xl `}
        style={{
          backgroundColor: getHexColor(estado.color),
        }}
      >
        {estado.nombre}
      </div>
      <div className="flex flex-col gap-4 px-4">
        {tareas.map((tarea: any) => {
          return <CardTarea key={tarea.id} tarea={tarea} />;
        })}
      </div>
      <div className="mt-4 w-full p-4">
        <Button
          label="Agregar tarea"
          theme="light"
          textColor="black"
          hoverEffect="whiter"
          onClick={() => {}}
          fullWidth
          center
          shadow
          icon={VscAdd}
        />
      </div>
    </div>
  );
};
export default ColEstado;
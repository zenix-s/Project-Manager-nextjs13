"use client";
import CardTarea from "./cardTarea";
import Button from "../button";
interface EstadoProps {
  id: number;
  nombre: string;
  id_proyecto: number;
  color: string;
}

interface TareaProps {
  id: number;
  nombre: string;
  description: string;
  endDate: Date;
  id_proyecto: number;
  id_usuario: number;
  id_estado: number;
}

const ColEstado = ({
  estado,
  tareas,
}: {
  estado: EstadoProps;
  tareas: TareaProps[];
}) => {
  console.log(tareas);
  const color = () => {
    switch (estado.color) {
      case "red":
        return "bg-red-500";
      case "emerald":
        return "bg-emerald-500";
      case "blue":
        return "bg-blue-500";
      case "yellow":
        return "bg-yellow-500";
      case "orange":
        return "bg-orange-500";
      case "green":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };
  return (
    <div
      className="flex h-full min-w-[350px] flex-col rounded-lg overflow-hidden"
      style={{
        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.25)",
      }}
    >
      <div
        className={` mb-4 flex justify-center p-4 ${color()} text-white text-2xl `}
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
          onClick={() => {}}
          fullWidth
          center
          shadow
        />
      </div>
    </div>
  );
};
export default ColEstado;

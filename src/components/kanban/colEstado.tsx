'use client'
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

const ColEstado = (
  { estado, tareas }: { estado: EstadoProps, tareas: TareaProps[] }

) => {
  console.log(tareas)
  return (
    <div className="h-full w-64 flex flex-col ">
      <div className="p-8 border-b border-black/50 mb-4 flex justify-center">
        {estado.nombre}
        </div>
      <div className="flex flex-col gap-4">
        {tareas.map((tarea: any) => {
          return (
            <CardTarea
              key={tarea.id}
              tarea={tarea}
            />
          )
        })}
      </div>
      <div className="w-full mt-4">
        <Button
          label="Agregar tarea"
          theme="dark"
          onClick={() => { }}
          fullWidth
          shadow
          center
        />
      </div>
    </div>  
  )
}
export default ColEstado
interface TareaProps {
  id: number;
  nombre: string;
  description: string;
  id_estado: number;
  endDate: Date;
  id_proyecto: number;
  id_usuario: number;
}

const CardTarea = ({ tarea }: { tarea: TareaProps }) => {
  return (
    <div className="flex flex-col gap-3">
      <div>{tarea.id}</div>
      <div>{tarea.nombre}</div>
      <div>{tarea.description}</div>
    </div>
  );
};

export default CardTarea;

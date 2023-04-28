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
    <div className="cursor-pointer select-none rounded-md bg-white p-4 shadow">
      <h3 className="font-bold">{tarea.nombre}</h3>
      <p className="mb-2 text-gray-600">{tarea.description}</p>
      <p className="text-right text-gray-600">
        {tarea.endDate.toLocaleDateString()}
      </p>
    </div> pepe
  );
};

export default CardTarea;

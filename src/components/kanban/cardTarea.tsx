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
    <div className="bg-white rounded-md p-4 shadow cursor-pointer select-none">
      <h3 className="font-bold">{tarea.nombre}</h3>
      <p className="text-gray-600 mb-2">{tarea.description}</p>
      <p className="text-gray-600 text-right">{tarea.description}</p>
    </div>
  );
};

export default CardTarea;

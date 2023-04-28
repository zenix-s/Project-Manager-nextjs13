import { TareaProps } from "@/types";

const CardTarea = ({ tarea }: { tarea: TareaProps }) => {
  return (
    <div className="bg-white rounded-md p-4 shadow cursor-pointer select-none">
      <h3 className="font-bold">{tarea.nombre}</h3>
      <p className="text-gray-600 mb-2">{tarea.description}</p>
      <p className="text-gray-600 text-right">
        {
        tarea.endDate.toLocaleDateString()
      }</p>
    </div>
  );
};

export default CardTarea;
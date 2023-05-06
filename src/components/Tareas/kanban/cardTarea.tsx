import { TareaProps } from "@/types";

const EndDateSection = ({ date }: { date: Date }) => {
  return (
    <div>
      <p className="text-right text-gray-600">{date.toLocaleDateString()}</p>
    </div>
  );
};

const CardTarea = ({ tarea }: { tarea: TareaProps }) => {
  return (
    <div className="cursor-pointer select-none rounded-md bg-white p-4 shadow">
      <div>
        <h3 className="font-bold">{tarea.nombre}</h3>
      </div>
      <div className="mb-2">
        <p className="text-gray-600">{tarea.description}</p>
      </div>
      {tarea.endDate && <EndDateSection date={tarea.endDate} />}
    </div>
  );
};

export default CardTarea;

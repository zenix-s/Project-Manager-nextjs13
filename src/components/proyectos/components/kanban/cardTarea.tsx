import { TaskProps } from "@/types";

const EndDateSection = ({ date }: { date: Date }) => {
  return (
    <div>
      <p className="text-right text-gray-600">{date.toLocaleDateString()}</p>
    </div>
  );
};

const CardTarea = ({ tarea }: { tarea: TaskProps }) => {
  return (
    <div className="cursor-pointer select-none rounded-md bg-white p-4 shadow text-black">
      <div>
        <h3 className="font-bold">{tarea.name}</h3>
      </div>
      <div className="mb-2">
        <p className="">{tarea.description}</p>
      </div>
      {tarea.endDate && <EndDateSection date={tarea.endDate} />}
    </div>
  );
};

export default CardTarea;

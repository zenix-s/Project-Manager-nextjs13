import { EstadoProps } from "@/types";
import EstadoListItem from "./EstadoListItem";
import FormNewEstado from "./FormNewEstado";

interface EstadosSectionProps {
  estados: EstadoProps[];
  idProject: number;
}

const EstadosSection = ({ estados, idProject }: EstadosSectionProps) => {
  return (
    <section className="p-4 w-full flex flex-col">
      <h2 className="text-2xl font-bold">Estados</h2>
      <div className="my-4">
        <FormNewEstado idProject={idProject} />
      </div>
      <div className="flex flex-col gap-4 mt-4 border p-4 border-white rounded-md h-96 overflow-scroll">
        {estados.map((estado) => (
          <EstadoListItem key={estado.id} estado={estado} idProject={idProject} />
        ))}
      </div>
    </section>
  );
};

export default EstadosSection;

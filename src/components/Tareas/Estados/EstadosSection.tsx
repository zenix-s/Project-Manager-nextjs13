import { EstadoProps } from "@/types";
import EstadoListItem from "./EstadoListItem";
import FormNewEstado from "./FormNewEstado";

interface EstadosSectionProps {
  estados: EstadoProps[];
  idProject: number;
}

const EstadosSection = ({ estados, idProject }: EstadosSectionProps) => {
  return (
    <section className="p-4 w-full h-full flex flex-col">
      <div className="my-4">
        <FormNewEstado idProject={idProject} />
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {estados.map((estado) => (
          <EstadoListItem key={estado.id} estado={estado} idProject={idProject} />
        ))}
      </div>
    </section>
  );
};

export default EstadosSection;

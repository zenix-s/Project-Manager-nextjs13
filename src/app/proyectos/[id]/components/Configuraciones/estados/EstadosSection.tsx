import { StateProps } from "@/types";
import EstadoListItem from "./EstadoListItem";
import FormNewEstado from "./FormNewEstado";

interface EstadosSectionProps {
  estados: StateProps[];
  idProject: number;
}

const EstadosSection = ({ estados, idProject }: EstadosSectionProps) => {
  return (
    <section className="p-4 w-full flex flex-col min-h-96">
      <div className="my-4">
        <FormNewEstado idProject={idProject} />
      </div>
      <div className="divider" />
      <div className="flex flex-col gap-4 mt-4 h-full">
        {estados.map((estado) => (
          <EstadoListItem key={estado.id} estado={estado} idProject={idProject} />
        ))}
      </div>
    </section>
  );
};

export default EstadosSection;

import { StateProps } from "@/types";
import EstadoListItem from "./EstadoListItem";
import FormNewEstado from "./FormNewEstado";

interface EstadosSectionProps {
  estados: StateProps[];
  idProject: number;
  onChangeState: ({ updatedState }: { updatedState: StateProps }) => void;
}

const EstadosSection = ({
  estados,
  idProject,
  onChangeState,
}: EstadosSectionProps) => {
  return (
    <section className="min-h-96 flex w-full flex-col p-4">
      <div className="my-4">
        <FormNewEstado idProject={idProject} />
      </div>
      <div className="divider" />
      <div className="mt-4 flex h-full flex-col gap-4">
        {estados.map((estado) => (
          <EstadoListItem
            key={estado.id}
            estado={estado}
            idProject={idProject}
            onChangeState={onChangeState}
          />
        ))}
      </div>
    </section>
  );
};

export default EstadosSection;

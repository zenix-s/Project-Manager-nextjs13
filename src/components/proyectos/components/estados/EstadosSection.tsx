import { StateProps } from "@/types";
import EstadoListItem from "./EstadoListItem";
import FormNewEstado from "./FormNewEstado";

interface EstadosSectionProps {
  estados: StateProps[];
  idProject: number;
  onChangeState: ({ updatedState }: { updatedState: StateProps }) => void;
  onDeleteState: ({ stateId }: { stateId: number }) => void;
  onAddState: ({ newState }: { newState: StateProps }) => void;
}

const EstadosSection = ({
  estados,
  idProject,
  onChangeState,
  onDeleteState,
  onAddState,
}: EstadosSectionProps) => {
  return (
    <section className="min-h-96 flex w-full flex-col p-4">
      <div className="my-4">
        <FormNewEstado 
          idProject={idProject} 
          onAddState={onAddState}
        />
      </div>
      <div className="divider" />
      <div className="mt-4 h-full w-full overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Autocompletar</th>
              <th>Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {estados.map((estado) => (
              <EstadoListItem
                key={estado.id}
                estado={estado}
                idProject={idProject}
                onChangeState={onChangeState}
                onDeleteState={onDeleteState}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default EstadosSection;

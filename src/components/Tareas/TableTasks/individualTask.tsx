import { TareaProps, EstadoProps } from "@/types";

const IndividualTask = ({
  tarea,
  estados,
}: {
  tarea: TareaProps;
  estados: EstadoProps[];
}) => {
  const onChangeEstado = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
  };

  return (
    <div className="flex w-full rounded-md border border-white/50 px-2 py-4">
      <div className="w-1/3">
        <h3>{tarea.nombre}</h3>
      </div>
      <div>
        <select onChange={onChangeEstado}>
          {estados.map((estado) => (
            <option
              key={estado.id}
              value={estado.id}
              selected={tarea.id_estado === estado.id ? true : false}
            >
              {estado.nombre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default IndividualTask;

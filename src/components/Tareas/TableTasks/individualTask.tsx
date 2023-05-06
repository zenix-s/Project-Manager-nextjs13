"use client";
import { TareaProps, EstadoProps } from "@/types";
import Select from "@/components/inputs/selector";
import { useState } from "react";

const IndividualTask = ({
  tarea,
  estados,
}: {
  tarea: TareaProps;
  estados: EstadoProps[];
}) => {
  const [loading, setLoading] = useState(false);
  const onChangeEstado = (newValue: string) => {
    setLoading(true);
    const NewTaskState = {
      ...tarea,
      id_estado: parseInt(newValue),
    };

    fetch(`http://localhost:3000/api/proyectos/tasks`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewTaskState),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const estadosOptions = estados.map((estado) => ({
    id: estado.id,
    value: estado.id,
    label: estado.nombre,
    selected: tarea.id_estado === estado.id ? true : false,
  }));

  return (
    <div className="flex w-full items-center border border-white/50 px-4 text-white">
      <div className="w-1/3">
        <h3>{tarea.nombre}</h3>
      </div>
      <div>
        {/* <Select
          idTask={tarea.id}
          values={estadosOptions}
          onChange={onChangeEstado}
        /> */}
        {loading ? (
          <div className="w-64 border border-white p-4">
            <p>loading...</p>
          </div>
        ) : (
          <Select
            idTask={tarea.id}
            values={estadosOptions}
            onChange={onChangeEstado}
          />
        )}
      </div>
    </div>
  );
};

export default IndividualTask;

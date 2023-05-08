"use client";
import { TareaProps, EstadoProps } from "@/types";
import { useState } from "react";
import { VscKebabVertical } from "react-icons/vsc";
import { useRouter } from "next/navigation";
import { getBgColor, getHexColor } from "@/actions/getColors";
const IndividualTask = ({
  tarea,
  estados,
}: {
  tarea: TareaProps;
  estados: EstadoProps[];
}) => {
  const [loading, setLoading] = useState(false);
  const [stateLoading, setStateLoading] = useState(false);
  const router = useRouter();

  const onChangeEstado = (newValue: string) => {
    setStateLoading(true);
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
        setStateLoading(false);
        router.refresh();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onDeleteTask = () => {
    setLoading(true);
    fetch(`http://localhost:3000/api/proyectos/tasks/`, {
      method: "DELETE",
      headers: {
        id_task: tarea.id.toString(),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setLoading(false);
        router.refresh();
      })
      .catch((error) => {
        console.error("Error:", error);
        router.refresh();
      });
  };

  const Estado = () => {
    const estado = estados.find((estado) => estado.id === tarea.id_estado);
    return estado;
  };

  const EstadosSelect = () => {
    return (
      <select
        defaultValue={tarea.id_estado?.toString()}
        className={`select-bordered select w-48`}
        style={{
          backgroundColor: getHexColor(Estado()?.color || "gray"),
        }}
        disabled={stateLoading}
        onChange={(e) => {
          onChangeEstado(e.target.value);
        }}
      >
        {estados.map((estado) => (
          <option
            key={estado.id}
            value={estado.id}
            className=" p-2 text-white "
            style={{
              backgroundColor: getHexColor(estado.color),
            }}
          >
            {stateLoading ? "Cargando..." : estado.nombre}
          </option>
        ))}
      </select>
    );
  };

  const LinksDropdown = () => {
    return (
      <div className="flex flex-grow justify-end">
        <div className="dropdown-bottom dropdown-end dropdown">
          <label tabIndex={0} className="btn m-1 border-none bg-transparent">
            <VscKebabVertical />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <button
                onClick={() => {
                  onDeleteTask();
                }}
              >
                Archivar
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  console.log("click");
                }}
              >
                Editar
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="relative text-white">
      <div
        className={`
        ${loading ? "flex" : "hidden"}
        absolute h-full w-full items-center justify-center bg-slate-800
      `}
      >
        loading...
      </div>
      <div className="flex w-full items-center px-4">
        <div className="w-1/3">
          <h3>{tarea.nombre}</h3>
        </div>
        <div>
          <EstadosSelect />
        </div>
        <LinksDropdown />
      </div>
    </div>
  );
};

export default IndividualTask;

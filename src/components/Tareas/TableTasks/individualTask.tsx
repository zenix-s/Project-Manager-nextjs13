"use client";
import { TareaProps, EstadoProps } from "@/types";
import { useState } from "react";
import { VscKebabVertical } from "react-icons/vsc";
import { useRouter } from "next/navigation";
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
      });
  };

  const Estado = () => {
    const estado = estados.find((estado) => estado.id === tarea.id_estado);
    return estado;
  };

  const optionBackColor = (color: string = "gray") => {
    switch (color) {
      case "red":
        return "bg-red-500";
      case "yellow":
        return "bg-yellow-500";
      case "green":
        return "bg-green-500";
      case "blue":
        return "bg-blue-500";
      case "indigo":
        return "bg-indigo-500";
      case "emerald":
        return "bg-emerald-500";
      default:
        return "bg-gray-500";
    }
  };

  const EstadosSelect = () => {
    return (
      <select
        defaultValue={tarea.id_estado?.toString()}
        className={`select-bordered select w-48
          ${stateLoading ? "bg-neutral-600" : optionBackColor(Estado()?.color)}
        `}
        disabled={stateLoading}
        onChange={(e) => {
          onChangeEstado(e.target.value);
        }}
      >
        {estados.map((estado) => (
          <option
            key={estado.id}
            value={estado.id}
            className=" !bg-neutral-600 p-2 text-white "
          >
            {stateLoading ? "Cargando..." : estado.nombre}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="relative border border-white/50 text-white">
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
      </div>
    </div>
  );
};

export default IndividualTask;
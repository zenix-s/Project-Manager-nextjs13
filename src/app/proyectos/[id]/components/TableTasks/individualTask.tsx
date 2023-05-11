"use client";
import { TaskProps, StateProps } from "@/types";
import { useState } from "react";
import { VscKebabVertical } from "react-icons/vsc";
import { useRouter } from "next/navigation";
import { getBgColor, getHexColor } from "@/actions/getColors";
import toast from "react-hot-toast";
import axios from "axios";
const IndividualTask = ({
  tarea,
  estados,
}: {
  tarea: TaskProps;
  estados: StateProps[];
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
    axios
      .put("/api/proyectos/tasks", NewTaskState)
      .then((res) => {
        console.log(res);
        setStateLoading(false);
        toast.success("Estado cambiado");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Error al cambiar el estado de la tarea");
        console.log(err);
      });
  };

  const onDeleteTask = () => {
    setLoading(true);
    axios
      .delete("/api/proyectos/tasks", {
        headers: {
          id_task: tarea.id.toString(),
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Tarea archivada");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        router.refresh();
      });
  };

  const Estado = () => {
    const estado = estados.find((estado) => estado.id === tarea.stateId);
    return estado;
  };

  const EstadosSelect = () => {
    return (
      <select
        defaultValue={tarea.stateId?.toString()}
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
            {stateLoading ? "Cargando..." : estado.name}
          </option>
        ))}
      </select>
    );
  };

  const LinksDropdown = () => {
    return (
      <div className="flex justify-end">
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
      <div className="flex w-full items-center justify-between px-4">
        <div className="flex w-full items-center justify-normal gap-12">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              defaultChecked={tarea.completed}
              className="checkbox"
            />
            <div className="w-64 overflow-scroll">
              <h3>{tarea.name}</h3>
            </div>
          </div>
          <EstadosSelect />
        </div>

        <LinksDropdown />
      </div>
    </div>
  );
};

export default IndividualTask;

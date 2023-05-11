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

  const onChangeTask = ({
    completed,
    endDate,
    stateId,
    userId,
  }: {
    completed?: boolean;
    endDate?: Date;
    stateId?: number;
    userId?: number;
  }) => {
    const newState = stateId || tarea.stateId;
    const newEndDate = endDate || tarea.endDate;
    const newUserId = userId || tarea.userId;

    setLoading(true);
    const NewTask = {
      ...tarea,
      stateId: newState,
      endDate: newEndDate,
      completed: completed,
      userId: newUserId,
    };
    axios
      .put("/api/proyectos/tasks", NewTask)
      .then((res) => {
        toast.success("Estado cambiado");
      })
      .catch((err) => {
        toast.error("Error al cambiar el estado de la tarea");
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        router.refresh();
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
        disabled={stateLoading || tarea.completed}
        onChange={(e) => {
          const newStateId = e.target.value;
          onChangeTask({
            stateId: parseInt(newStateId),
          });
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
    <div
      className={`relative text-white

        rounded-lg
    `}
    >
      <div
        className={`
        ${loading ? "flex" : "hidden"}
        absolute h-full w-full items-center justify-center 
        
      `}
      >
        loading...
      </div>
      <div
        className={`${
          loading ? "opacity-0" : ""
        } flex w-full items-center justify-between gap-4 px-4`}
      >
        <div>
          <input
            type="checkbox"
            defaultChecked={tarea.completed}
            className="checkbox"
            onChange={(e) => {
              onChangeTask({
                completed: e.target.checked,
              });
            }}
          />
        </div>
        <div
          className={`relative flex w-full items-center justify-normal gap-12 ${
            tarea.completed && "text-gray-400"
          }`}
        >
          <div
            className={`
            ${tarea.completed ? "flex" : "hidden"}
            absolute h-full w-full items-center justify-center
          `}
          >
            <div className="h-px w-full bg-white " />
          </div>
          <div className="w-56">
            <h3>{tarea.name}</h3>
          </div>

          <EstadosSelect />

          <input
            type="date"
            className="input-bordered input w-56"
            defaultValue={
              tarea.endDate
                ? new Date(tarea.endDate).toISOString().split("T")[0]
                : ""
            }
            disabled={tarea.completed}
            onChange={(e) => {
              onChangeTask({
                endDate: new Date(e.target.value),
              });
            }}
          />
        </div>
        <LinksDropdown />
      </div>
    </div>
  );
};

export default IndividualTask;

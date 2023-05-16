"use client";
import { TaskProps, StateProps } from "@/types";
import { useState } from "react";
import { VscKebabVertical, VscAccount } from "react-icons/vsc";
import { useRouter } from "next/navigation";
import { getBgColor, getHexColor } from "@/actions/getColors";
import toast from "react-hot-toast";
import axios from "axios";
import Button from "@/components/button";
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
        toast.success("Tarea archivada");
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const Estado = () => {
    const estado = estados.find((estado) => estado.id === tarea.stateId);
    return estado;
  };

  const EstadosSelect = () => {
    const [estado, setEstado] = useState(Estado()?.name || "Cargando");
    return (
      <div className="dropdown">
        <label
          tabIndex={0}
          className="btn w-48"
          style={{
            backgroundColor: getHexColor(Estado()?.color || "gray"),
          }}
        >
          {estado}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
        >
          {estados.map((estado) => (
            <li key={estado.id}>
              <button
                className="btn"
                style={{
                  backgroundColor: getHexColor(estado.color),
                }}
                onClick={() => {
                  setEstado(estado.name);
                  onChangeTask({
                    stateId: estado.id,
                  });
                }}
              >
                {estado.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
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
              <button onClick={() => {}}>Editar</button>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`relative rounded-lg

        text-white
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

          <div className="dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle btn m-1">
              <VscAccount /> {tarea.userId}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
            >
              {/* <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li> */}
              {}
            </ul>
          </div>
          <div></div>
        </div>
        <LinksDropdown />
      </div>
    </div>
  );
};

export default IndividualTask;

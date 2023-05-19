"use client";
import { TaskProps, StateProps, TeamMemberProps } from "@/types";
import { use, useState } from "react";
import {
  VscKebabVertical,
  VscAccount,
  VscEdit,
  VscTrash,
  VscInbox,
} from "react-icons/vsc";
import { useRouter } from "next/navigation";
import { getBgColor, getHexColor } from "@/actions/getColors";
import toast from "react-hot-toast";
import axios from "axios";
import Button from "@/components/button";
import useTasksModal from "@/hooks/useTasksModal";
const IndividualTask = ({
  tarea,
  estados,
  teamMembers,
}: {
  tarea: TaskProps;
  estados: StateProps[];
  teamMembers: TeamMemberProps[];
}) => {
  const [loading, setLoading] = useState(false);
  const [stateLoading, setStateLoading] = useState(false);
  const router = useRouter();
  const TaskModal = useTasksModal();

  const onChangeTask = ({
    completed,
    endDate,
    stateId,
    userId,
  }: {
    completed?: boolean;
    endDate?: Date;
    stateId?: number;
    userId?: number | null;
  }) => {
    const newState = stateId || tarea.stateId;
    const newEndDate = endDate || tarea.endDate;
    const newUserId = userId === undefined ? tarea.userId : userId;

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
        if (res.data.status === 200) {
          toast.success(res.data.message);
        }
        if (res.data.status !== 200) {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Error al cambiar el estado de la tarea");
      })
      .finally(() => {
        setLoading(false);
        router.refresh();
      });
  };

  const onDeleteTask = (
    action: "archive" | "unarchive" | "delete" = "archive"
  ) => {
    setLoading(true);
    axios
      .delete("/api/proyectos/tasks", {
        headers: {
          id_task: tarea.id.toString(),
          action: action,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          toast.success(res.data.message);
        }
        if (res.data.status !== 200) {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {})
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
          className="dropdown-content menu rounded-box mt-2 w-full bg-base-100 shadow outline outline-2 outline-slate-200"
        >
          {estados.map((estado) => (
            <li key={estado.id}>
              <button
                className=""
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
        <div className="dropdown dropdown-bottom dropdown-end">
          <label tabIndex={0} className="btn m-1 border-none bg-transparent">
            <VscKebabVertical />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box mt-2 w-52 bg-base-100 shadow"
          >
            <li>
              <Button
                label="Editar"
                theme="ghost"
                fullWidth
                onClick={() => {
                  TaskModal.onOpen(tarea);
                }}
                icon={VscEdit}
              />
            </li>
            <li>
              <Button
                label={tarea.archived ? "Desarchivar" : "Archivar"}
                theme="ghost"
                fullWidth
                onClick={() => {
                  onDeleteTask(tarea.archived ? "unarchive" : "archive");
                }}
                icon={VscInbox}
              />
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
            <label tabIndex={0} className="btn-ghost btn m-1 gap-2">
              <VscAccount />{" "}
              {tarea.userId
                ? teamMembers.find((member) => member.userId === tarea.userId)
                    ?.users.username
                : "Sin asignar"}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box w-full bg-base-100 pt-2 shadow"
            >
              <li>
                <button
                  onClick={() => {
                    onChangeTask({
                      userId: null,
                    });
                  }}
                >
                  Sin asignar
                </button>
              </li>
              {teamMembers.map((member: TeamMemberProps) => (
                <li key={member.id}>
                  <button
                    onClick={() => {
                      onChangeTask({
                        userId: member.userId,
                      });
                    }}
                  >
                    {member.users.username}
                  </button>
                </li>
              ))}
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

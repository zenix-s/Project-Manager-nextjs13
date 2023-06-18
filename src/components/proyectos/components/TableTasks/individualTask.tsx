"use client";
import { TaskProps, StateProps, TeamMemberProps } from "@/types";
import {
  MdOutlineSignalCellularAlt1Bar,
  MdOutlineSignalCellularAlt2Bar,
  MdOutlineSignalCellularAlt,
  MdPriorityHigh,
} from "react-icons/md";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { use, useState } from "react";
import {
  VscKebabVertical,
  VscAccount,
  VscEdit,
  VscTrash,
  VscInbox,
} from "react-icons/vsc";
import { getBgColor, getHexColor } from "@/actions/getColors";
import Button from "@/components/button";
import useTasksModal from "@/hooks/useTasksModal";
import { BsArchive, BsCheck, BsCircle, BsCircleFill } from "react-icons/bs";
import Link from "next/link";

const IndividualTask = ({
  tarea,
  estados,
  teamMembers,
  onChangeTask,
  onDeleteTask,
}: {
  tarea: TaskProps;
  estados: StateProps[];
  teamMembers: TeamMemberProps[];
  onChangeTask: ({ updatedTask }: { updatedTask: TaskProps }) => void;
  onDeleteTask: ({ taskId }: { taskId: number }) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const TaskModal = useTasksModal();

  const defaultDate = () => {
    try {
      if (tarea.endDate !== null) {
        return new Date(tarea.endDate).toISOString().split("T")[0];
      }
    } catch (error) {
      return "";
    }
  };

  return (
    <div className="flex items-center gap-2 border-b border-white/20 px-2">
      <div>
        <div className="flex items-center gap-4">
          {/* Seccion Completar Estado */}
          <div>
            <input
              type="checkbox"
              defaultChecked={tarea.completed}
              className="checkbox tooltip tooltip-right"
              data-tip={
                tarea.completed
                  ? "Marcar como incompleta"
                  : "Marcar como completa"
              }
              onChange={(e) => {
                onChangeTask({
                  updatedTask: {
                    ...tarea,
                    completed: e.target.checked,
                  },
                });
              }}
            />
          </div>
          {/* Indicar Prioridad de la tarea */}
          <div className="dropdown">
            <label
              tabIndex={0}
              className=" aspect-square items-center justify-center rounded-full"
            >
              {tarea.priority === 0 && <BiDotsHorizontalRounded />}
              {tarea.priority === 1 && <MdOutlineSignalCellularAlt1Bar />}
              {tarea.priority === 2 && <MdOutlineSignalCellularAlt2Bar />}
              {tarea.priority === 3 && <MdOutlineSignalCellularAlt />}
              {tarea.priority === 4 && <MdPriorityHigh />}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu mt-2 w-64 rounded-md bg-base-100 shadow outline outline-1 outline-white/30"
            >
              <li
                className={`
                  ${tarea.priority === 0 ? "bg-white/10" : ""}
                `}
              >
                <button
                  onClick={() => {
                    onChangeTask({
                      updatedTask: {
                        ...tarea,
                        priority: 0,
                      },
                    });
                  }}
                >
                  <div className="flex w-full items-center gap-2">
                    <span className="mr-2 inline-block h-5 w-5 rounded-full">
                      <BiDotsHorizontalRounded />
                    </span>
                    <span>Sin Prioridad</span>
                    <span className="flex flex-grow justify-end">
                      {tarea.priority === 0 && <BsCheck />}
                    </span>
                  </div>
                </button>
              </li>
              <li
                className={`
                  ${tarea.priority === 1 ? "bg-white/10" : ""}
                `}
              >
                <button
                  onClick={() => {
                    onChangeTask({
                      updatedTask: {
                        ...tarea,
                        priority: 1,
                      },
                    });
                  }}
                >
                  <div className="flex w-full items-center gap-2">
                    <span className="mr-2 inline-block h-5 w-5 rounded-full">
                      <MdOutlineSignalCellularAlt1Bar />
                    </span>
                    <span>Prioridad Baja</span>
                    <span className="flex flex-grow justify-end">
                      {tarea.priority === 1 && <BsCheck />}
                    </span>
                  </div>
                </button>
              </li>
              <li
                className={`
                  ${tarea.priority === 2 ? "bg-white/10" : ""}
                `}
              >
                <button
                  onClick={() => {
                    onChangeTask({
                      updatedTask: {
                        ...tarea,
                        priority: 2,
                      },
                    });
                  }}
                >
                  <div className="flex w-full items-center gap-2">
                    <span className="mr-2 inline-block h-5 w-5 rounded-full">
                      <MdOutlineSignalCellularAlt2Bar />
                    </span>
                    <span>Prioridad Media</span>
                    <span className="flex flex-grow justify-end">
                      {tarea.priority === 2 && <BsCheck />}
                    </span>
                  </div>
                </button>
              </li>
              <li
                className={`
                  ${tarea.priority === 3 ? "bg-white/10" : ""}
                `}
              >
                <button
                  onClick={() => {
                    onChangeTask({
                      updatedTask: {
                        ...tarea,
                        priority: 3,
                      },
                    });
                  }}
                >
                  <div className="flex w-full items-center gap-2">
                    <span className="mr-2 inline-block h-5 w-5 rounded-full">
                      <MdOutlineSignalCellularAlt />
                    </span>
                    <span>Prioridad Alta</span>
                    <span className="flex flex-grow justify-end">
                      {tarea.priority === 3 && <BsCheck />}
                    </span>
                  </div>
                </button>
              </li>
              <li
                className={`
                  ${tarea.priority === 4 ? "bg-white/10" : ""}
                `}
              >
                <button
                  onClick={() => {
                    onChangeTask({
                      updatedTask: {
                        ...tarea,
                        priority: 4,
                      },
                    });
                  }}
                >
                  <div className="flex w-full items-center gap-2">
                    <span className="mr-2 inline-block h-5 w-5 rounded-full">
                      <MdPriorityHigh />
                    </span>
                    <span>Prioridad Urgente</span>
                    <span className="flex flex-grow justify-end">
                      {tarea.priority === 4 && <BsCheck />}
                    </span>
                  </div>
                </button>
              </li>
            </ul>
          </div>
          {/* Indicar el estado de la tarea */}
          <div className="dropdown">
            <label
              tabIndex={0}
              className=" aspect-square items-center justify-center rounded-full"
            >
              <BsCircleFill
                style={{
                  color: getHexColor(
                    estados.find((estado) => estado.id === tarea.stateId)
                      ?.color || "grey"
                  ),
                }}
              />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content  menu mt-2 w-56 rounded-md bg-base-100 shadow outline outline-1 outline-white/30"
            >
              <li
                className={`
                  ${tarea.stateId === null ? "bg-white/10" : ""}
                `}
              >
                <button
                  onClick={() => {
                    onChangeTask({
                      updatedTask: {
                        ...tarea,
                        stateId: null,
                      },
                    });
                  }}
                >
                  <div className="flex w-full items-center gap-2">
                    <BsCircleFill
                      style={{
                        color: getHexColor("grey"),
                      }}
                    />
                    <span>Sin estado</span>
                    <span className="float-right">
                      {tarea.stateId === null && <BsCheck />}
                    </span>
                  </div>
                </button>
              </li>
              {estados.map((estado) => (
                <li
                  key={estado.id}
                  className={`
                    ${estado.id === tarea.stateId ? "bg-white/10" : ""}
                  `}
                >
                  <button
                    // style={{
                    //   backgroundColor: getHexColor(estado.color),
                    // }}
                    onClick={() => {
                      onChangeTask({
                        updatedTask: {
                          ...tarea,
                          stateId: estado.id,
                        },
                      });
                    }}
                  >
                    <div className="flex w-full items-center gap-2">
                      {/* <span
                        className="mr-2 inline-block h-5 w-5 rounded-full"
                        style={{
                          backgroundColor: getHexColor(estado.color),
                        }}
                      /> */}
                      <BsCircleFill
                        style={{
                          color: getHexColor(estado.color),
                        }}
                      />
                      <span>{estado.name}</span>
                      <span className="flex flex-grow justify-end">
                        {tarea.stateId === estado.id && <BsCheck />}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Link 
        className="ml-4 w-full"
        href={`/proyectos/${tarea.projectId}/${tarea.id}`}
      >
        <p>{tarea.name}</p>
      </Link>

      <div className="w-24 flex">
        <label htmlFor={`endDate${tarea.id}`} className={`
          ${tarea.completed ? "text-white" : ""}
            
          ${
            tarea.endDate !== null &&
            new Date(tarea.endDate).getTime() < new Date().getTime()
              ? "text-red-400"
              : ""
          }
          ${
            tarea.endDate !== null &&
            new Date(tarea.endDate).getTime() > new Date().getTime() &&
            new Date(tarea.endDate).getTime() - new Date().getTime() <
              259200000 &&
            new Date(tarea.endDate).getTime() - new Date().getTime() > 0
              ? "text-yellow-200"
              : ""
          }
          ${
            tarea.endDate !== null &&
            new Date(tarea.endDate).getTime() > new Date().getTime() &&
            new Date(tarea.endDate).getTime() - new Date().getTime() >
              259200000
              ? "text-white/70"
              : ""
          }
        `}>
          {
            tarea.endDate !== null &&
            new Date(tarea.endDate).toLocaleDateString("es-ES", {
              month: "short",
              day: "numeric",
            })
          }
        </label>
      </div>

      <div>
        <input
          type="date"
          id={`endDate${tarea.id}`}
          // className="input-ghost input w-56"
          className={`
            input-ghost
            input
            w-56
            ${tarea.completed ? "text-white" : ""}
            
            ${
              tarea.endDate !== null &&
              new Date(tarea.endDate).getTime() < new Date().getTime()
                ? "text-error"
                : ""
            }
            ${
              tarea.endDate !== null &&
              new Date(tarea.endDate).getTime() > new Date().getTime() &&
              new Date(tarea.endDate).getTime() - new Date().getTime() <
                259200000 &&
              new Date(tarea.endDate).getTime() - new Date().getTime() > 0
                ? "text-yellow-300"
                : ""
            }
            ${
              tarea.endDate !== null &&
              new Date(tarea.endDate).getTime() > new Date().getTime() &&
              new Date(tarea.endDate).getTime() - new Date().getTime() >
                259200000
                ? "text-white"
                : ""
            }
            `}
          defaultValue={defaultDate()}
          disabled={tarea.completed}
          onChange={(e) => {
            onChangeTask({
              updatedTask: {
                ...tarea,
                endDate: new Date(e.target.value),
              },
            });
          }}
        />
      </div>

      <div>
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn-ghost btn m-1 w-56 flex-row-reverse justify-start gap-2"
          >
            <VscAccount />
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
                    updatedTask: {
                      ...tarea,
                      userId: null,
                    },
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
                      updatedTask: {
                        ...tarea,
                        userId: member.userId,
                      },
                    });
                  }}
                >
                  {member.users.username}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex w-24 text-gray-500 tooltip tooltip-bottom" data-tip={`
        Creado ${new Date(tarea.createdDate).toLocaleDateString("es-ES")} ${new Date(tarea.createdDate).toLocaleTimeString("es-ES")}
      `}>
        {new Date(tarea.createdDate).toLocaleDateString("es-ES", {
          month: "short",
          day: "numeric",
        })}
      </div>
      <div>
        <div className="dropdown dropdown-bottom dropdown-end">
          <label tabIndex={0} className="btn m-1 border-none bg-transparent">
            <VscKebabVertical />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu mt-2 w-52 rounded-md bg-base-100 shadow"
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
                  onChangeTask({
                    updatedTask: {
                      ...tarea,
                      archived: !tarea.archived,
                    },
                  });
                }}
                icon={BsArchive}
              />
            </li>
            <li>
              <Button
                label="Eliminar"
                theme="error"
                fullWidth
                onClick={() => {
                  onDeleteTask({
                    taskId: tarea.id,
                  });
                }}
                icon={VscTrash}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IndividualTask;

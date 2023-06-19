"use client";
import { TaskProps, StateProps, TeamMemberProps } from "@/types";
import {
  MdOutlineSignalCellularAlt1Bar,
  MdOutlineSignalCellularAlt2Bar,
  MdOutlineSignalCellularAlt,
  MdPriorityHigh,
  MdOutlineEditCalendar,
  MdOutlineCalendarMonth,
} from "react-icons/md";
import { LuCalendarDays, LuCalendarX2 } from "react-icons/lu";
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
import {
  BsArchive,
  BsCalendarXFill,
  BsCheck,
  BsCircle,
  BsCircleFill,
  BsFillCalendarFill,
  BsPersonCircle,
} from "react-icons/bs";
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
        className="min-w-52 ml-4 w-full overflow-hidden truncate"
        href={`/proyectos/${tarea.projectId}/${tarea.id}`}
      >
        <p>{tarea.name}</p>
      </Link>

      {tarea.userId && (
        <div className="dropdown dropdown-end min-w-[60px] justify-center">
          <label tabIndex={0} className="rounded-full border border-white p-1">
            {
              // just the first two letters
              (teamMembers.find((member) => member.userId === tarea.userId)
                ?.users.username || "").slice(0, 2)
            }
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu w-52 rounded-md border border-white/10 bg-base-100 shadow"
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
                <span>
                  <VscTrash />
                </span>
                <span>Eliminar asignación</span>
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
                  className={`
                  ${tarea.userId === member.userId ? "bg-white/10" : ""}
                `}
                >
                  <span className="capitalize">{member.users.username}</span>
                  <span className="flex w-full justify-end">
                    {tarea.userId === member.userId && <BsCheck />}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {
        tarea.endDate !== null &&
        <div className="dropdown dropdown-end min-w-[60px] justify-center items-center hidden sm:block">
        <label
          tabIndex={0}
          className={`
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
            new Date(tarea.endDate).getTime() - new Date().getTime() > 259200000
              ? "text-white/70"
              : ""
          }
          tooltip tooltip-bottom
        `}
          data-tip={`
           Fecha de finalización: ${new Date(
             tarea.endDate || new Date()
           ).toLocaleDateString("es-ES")}

          `}
        >
          {tarea.endDate !== null &&
            new Date(tarea.endDate).toLocaleDateString("es-ES", {
              month: "short",
              day: "numeric",
            })}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu w-52 rounded-md border border-white/10 bg-base-100 shadow"
        >
          <li>
            <button
              onClick={() => {
                onChangeTask({
                  updatedTask: {
                    ...tarea,
                    endDate: null,
                  },
                });
              }}
            >
              <span>
                <LuCalendarX2 />
              </span>
              <span>Eliminar fecha</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                onChangeTask({
                  updatedTask: {
                    ...tarea,
                    endDate: new Date(
                      new Date(tarea.endDate || new Date()).getTime() + 86400000
                    ),
                  },
                });
              }}
            >
              <span>
                <LuCalendarDays />
              </span>
              <span>Mañana</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                onChangeTask({
                  updatedTask: {
                    ...tarea,
                    endDate: new Date(
                      new Date(tarea.endDate || new Date()).getTime() +
                        604800000
                    ),
                  },
                });
              }}
            >
              <span>
                <LuCalendarDays />
              </span>
              <span>Una semana</span>
            </button>
          </li>
          <li>
            <Link href={`/proyectos/${tarea.projectId}/${tarea.id}`}>
              <span>
                <MdOutlineEditCalendar />
              </span>
              <span>Personalizar</span>
            </Link>
          </li>
          <li>
            <input
              type="date"
              className="bg-base-100 text-white/70"
              onChange={(e) => {
                onChangeTask({
                  updatedTask: {
                    ...tarea,
                    endDate: new Date(e.target.value),
                  },
                });
              }}
            />
          </li>
        </ul>
      </div>}

      <div
        className="tooltip tooltip-bottom min-w-[60px] justify-center items-center text-gray-500 hidden sm:flex"
        data-tip={`
        Creado ${new Date(tarea.createdDate).toLocaleDateString(
          "es-ES"
        )} ${new Date(tarea.createdDate).toLocaleTimeString("es-ES")}
      `}
      >
        {new Date(tarea.createdDate).toLocaleDateString("es-ES", {
          month: "short",
          day: "numeric",
        })}
      </div>
      <div>
        <div className="dropdown-start dropdown dropdown-left">
          <label tabIndex={0} className="btn m-1 border-none bg-transparent">
            <VscKebabVertical />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu menu-compact mt-2 w-52 rounded-md border border-white/10 bg-base-100 shadow"
          >
            <li>
              <button
                onClick={() => {
                  TaskModal.onOpen(tarea);
                }}
                className=""
              >
                <span>
                  <VscEdit />
                </span>
                <span>Editar</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onChangeTask({
                    updatedTask: {
                      ...tarea,
                      archived: !tarea.archived,
                    },
                  });
                }}
                className=""
              >
                <span>
                  <BsArchive />
                </span>
                <span>{tarea.archived ? "Desarchivar" : "Archivar"}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onDeleteTask({
                    taskId: tarea.id,
                  });
                }}
                className=""
              >
                <span>
                  <VscTrash />
                </span>
                <span>Eliminar</span>
              </button>
            </li>
            <li tabIndex={0} className="">
              <span>
                <span>
                  <LuCalendarDays />
                </span>
                <span>Fecha límite</span>
                <span>
                  {
                    tarea.endDate !== null &&
                    new Date(tarea.endDate).toLocaleDateString("es-ES", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                </span>
              </span>
              <ul
                className="!right-0 sm:!right-full top-10 sm:top-0 z-20 rounded-md border border-white/10 bg-base-100"
                style={{
                  left: "initial",
                }}
              >
                <li>
                  <button
                    onClick={() => {
                      onChangeTask({
                        updatedTask: {
                          ...tarea,
                          endDate: null,
                        },
                      });
                    }}
                  >
                    <span>
                      <LuCalendarX2 />
                    </span>
                    <span>Eliminar fecha</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onChangeTask({
                        updatedTask: {
                          ...tarea,
                          endDate: new Date(
                            new Date(tarea.endDate || new Date()).getTime() +
                              86400000
                          ),
                        },
                      });
                    }}
                  >
                    <span>
                      <LuCalendarDays />
                    </span>
                    <span>
                      {/* Sumar un día */}
                      {tarea.endDate !== null ? "Sumar un día" : "Mañana"}
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onChangeTask({
                        updatedTask: {
                          ...tarea,
                          endDate: new Date(
                            new Date(tarea.endDate || new Date()).getTime() +
                              604800000
                          ),
                        },
                      });
                    }}
                  >
                    <span>
                      <LuCalendarDays />
                    </span>
                    <span>
                      {/* Sumar una semana */}
                      {tarea.endDate !== null
                        ? "Sumar una semana"
                        : "Una semana"}
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onChangeTask({
                        updatedTask: {
                          ...tarea,
                          endDate: new Date(
                            new Date(tarea.endDate || new Date()).getTime() +
                              2592000000
                          ),
                        },
                      });
                    }}
                  >
                    <span>
                      <LuCalendarDays />
                    </span>
                    <span>
                      {tarea.endDate !== null ? "Sumar un mes" : "Un mes"}
                    </span>
                  </button>
                </li>
              </ul>
            </li>
            <li
              tabIndex={0}
            >
              <span>
                <span>
                  <BsPersonCircle />
                </span>
                <span>
                  {
                    teamMembers.find((member) => member.userId === tarea.userId)
                      ?.users.username || "Asignar"
                  }
                </span>
              </span>
              <ul
                className="!right-0 sm:!right-full top-10 sm:top-0 rounded-md border border-white/10 bg-base-100"
                style={{
                  left: "initial",
                }}
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
                    <span>
                      <VscTrash />
                    </span>
                    <span>Eliminar asignación</span>
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
                      className={`
                        ${tarea.userId === member.userId ? "bg-white/10" : ""}
                      `}
                    >
                      <span className="capitalize">
                        {member.users.username}
                      </span>
                      <span className="flex w-full justify-end">
                        {tarea.userId === member.userId && <BsCheck />}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IndividualTask;

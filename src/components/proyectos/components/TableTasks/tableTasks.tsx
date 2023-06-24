"use client";
import { TaskProps, StateProps, TeamMemberProps } from "@/types";
import IndividualTask from "./individualTask";
import HeaderTasksList from "./headerTasksList";
import { toast } from "react-hot-toast";
import NewTaskModal from "./newTaskModal";
import axios from "axios";
import { useState } from "react";
import { BiDownArrow, BiDotsHorizontalRounded } from "react-icons/bi";
import {
  MdOutlineSignalCellularAlt1Bar,
  MdOutlineSignalCellularAlt2Bar,
  MdOutlineSignalCellularAlt,
  MdPriorityHigh,
  MdOutlineEditCalendar,
  MdOutlineCalendarMonth,
} from "react-icons/md";
import {
  VscKebabVertical,
  VscAccount,
  VscEdit,
  VscTrash,
  VscInbox,
} from "react-icons/vsc";
import {
  BsArchive,
  BsCheckCircle,
  BsCircle,
  BsCircleFill,
} from "react-icons/bs";
import { getHexColor } from "@/actions/getColors";

const TableTasks = ({
  tareas,
  estados,
  idProject,
  teamMembers,
  onChangeTask,
  onDeleteTask,
  onAddTask,
}: {
  tareas: TaskProps[];
  estados: StateProps[];
  idProject: number;
  teamMembers: TeamMemberProps[];
  onChangeTask: ({ updatedTask }: { updatedTask: TaskProps }) => void;
  onDeleteTask: ({ taskId }: { taskId: number }) => void;
  onAddTask: ({ newTask }: { newTask: TaskProps }) => void;
}) => {
  const [filter, setFilter] = useState(0);
  const [stateFilter, setStateFilter] = useState(0);
  const [userFilter, setUserFilter] = useState(0);
  const [priorityFilter, setPriorityFilter] = useState(-1);
  const [orderFilter, setOrderFilter] = useState(0);

  const tasks = () => {
    let prevtareas = [...tareas];
    if (filter === 0) {
      prevtareas = prevtareas
        .filter((tarea) => tarea.completed === false)
        .filter((tarea) => tarea.archived === false);
    }
    if (filter === 1) {
      prevtareas = prevtareas
        .filter((tarea) => tarea.completed === true)
        .filter((tarea) => tarea.archived === false);
    }
    if (filter === 2) {
      prevtareas = prevtareas.filter((tarea) => tarea.archived === true);
    }

    if (stateFilter !== 0) {
      prevtareas = prevtareas.filter((tarea) => tarea.stateId === stateFilter);
    }

    if (userFilter !== 0) {
      prevtareas = prevtareas.filter((tarea) => tarea.userId === userFilter);
    }

    if (priorityFilter !== -1) {
      prevtareas = prevtareas.filter(
        (tarea) => tarea.priority === priorityFilter
      );
    }

    if (orderFilter === 0) {
      prevtareas.sort((a, b) => {
        if (a.endDate === null && b.endDate === null) {
          return 0;
        }
        if (a.endDate === null) {
          return 1;
        }
        if (b.endDate === null) {
          return -1;
        }
        if (a.endDate > b.endDate) {
          return 1;
        }
        if (a.endDate < b.endDate) {
          return -1;
        }
        return 0;
      });
    }
    if (orderFilter === 1) {
      prevtareas.sort((a, b) => {
        if (a.createdDate === null && b.createdDate === null) {
          return 0;
        }
        if (a.createdDate === null) {
          return 1;
        }
        if (b.createdDate === null) {
          return -1;
        }
        if (a.createdDate > b.createdDate) {
          return 1;
        }
        if (a.createdDate < b.createdDate) {
          return -1;
        }
        return 0;
      });
    }
    if (orderFilter === 2) {
      prevtareas.sort((a, b) => {
        if (a.priority > b.priority) {
          return -1;
        }
        if (a.priority < b.priority) {
          return 1;
        }
        return 0;
      });
    }

    return prevtareas;
  };

  return (
    <div className="flex w-full flex-col p-1">
      <div className="flex flex-col">
        <HeaderTasksList
          estados={estados}
          idProject={idProject}
          onAddTask={onAddTask}
        />
        <div className="mt-2 hidden sm:flex items-center gap-2">
          <label>Filtro:</label>
          <div className="dropdown">
            <label
              tabIndex={0}
              className="flex items-center gap-2 rounded-md p-2"
            >
              {filter === 0 ? (
                <BsCircle />
              ) : filter === 1 ? (
                <BsCheckCircle />
              ) : (
                <BsArchive />
              )}
              {filter === 0
                ? "Sin Completar"
                : filter === 1
                ? "Completadas"
                : "Archivadas"}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu w-52 rounded-md border border-white/10 bg-base-100 shadow"
            >
              <li>
                <button
                  onClick={() => {
                    setFilter(0);
                  }}
                >
                  <span>
                    <BsCircle />
                  </span>
                  <span>Sin Completar</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setFilter(1);
                  }}
                >
                  <span>
                    <BsCheckCircle />
                  </span>
                  <span>Completadas</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setFilter(2);
                  }}
                >
                  <span>
                    <BsArchive />
                  </span>
                  <span>Archivadas</span>
                </button>
              </li>
            </ul>
          </div>
          <div className="dropdown">
            <label
              tabIndex={0}
              className="flex items-center gap-2 rounded-md p-2"
            >

              <span>
                {stateFilter === 0 ? (
                  <BsCircle />
                ) : (
                  <BsCircleFill
                    style={{
                      color: getHexColor(
                        estados.filter((estado) => estado.id === stateFilter)[0]
                          .color
                      ),
                    }}
                  />
                )}
              </span>
              <span>
                {stateFilter === 0
                  ? "Estado"
                  : estados.filter((estado) => estado.id === stateFilter)[0].name}
              </span>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu w-52 rounded-md border border-white/10 bg-base-100 shadow"
            >
              <li>
                <button
                  onClick={() => {
                    setStateFilter(0);
                  }}
                >
                  <span>
                    <BsCircle />
                  </span>
                  <span>Todos</span>
                </button>
              </li>
              {estados.map((estado) => {
                return (
                  <li key={estado.id}>
                    <button
                      onClick={() => {
                        setStateFilter(estado.id);
                      }}
                    >
                      <span
                        style={{
                          color: getHexColor(estado.color),
                        }}
                      >
                        <BsCircleFill />
                      </span>
                      <span>{estado.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="dropdown">
            <label
              tabIndex={0}
              className="flex items-center gap-2 rounded-md p-2"
            >
              <span>
                <VscAccount />
              </span>
              <span className="capitalize">
                {userFilter === 0
                  ? "Usuario"
                  : teamMembers.filter(
                      (member) => member.userId === userFilter
                    )[0].users.username}
              </span>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu w-52 rounded-md border border-white/10 bg-base-100 shadow"
            >
              <li>
                <button
                  onClick={() => {
                    setUserFilter(0);
                  }}
                >
                  <span>
                    <BsCircle />
                  </span>
                  <span>Todos</span>
                </button>
              </li>
              {teamMembers.map((member) => {
                return (
                  <li key={member.userId}>
                    <button
                      onClick={() => {
                        setUserFilter(member.userId);
                      }}
                    >
                      <span>
                        <BsCircleFill />
                      </span>
                      <span>{member.users.username}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="dropdown">
            <label
              tabIndex={0}
              className="flex items-center gap-2 rounded-md p-2"
            >
              <span>
                {priorityFilter === -1 ? (
                  <BsCircle />
                ) : priorityFilter === 0 ? (
                  <BiDotsHorizontalRounded />
                ) : priorityFilter === 1 ? (
                  <MdOutlineSignalCellularAlt1Bar />
                ) : priorityFilter === 2 ? (
                  <MdOutlineSignalCellularAlt2Bar />
                ) : priorityFilter === 3 ? (
                  <MdOutlineSignalCellularAlt />
                ) : (
                  <MdPriorityHigh />
                )}
              </span>
              <span>
                {priorityFilter === -1
                  ? "Prioridad"
                  : priorityFilter === 0
                  ? "sin prioridad"
                  : priorityFilter === 1
                  ? "baja"
                  : priorityFilter === 2
                  ? "media"
                  : priorityFilter === 3
                  ? "alta"
                  : "urgente"}
              </span>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu w-52 rounded-md border border-white/10 bg-base-100 shadow"
            >
              <li>
                <button
                  onClick={() => {
                    setPriorityFilter(-1);
                  }}
                >
                  <span>
                    <BsCircle />
                  </span>
                  <span>Todos</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setPriorityFilter(0);
                  }}
                >
                  <span>
                    <BiDotsHorizontalRounded />
                  </span>
                  <span>Sin prioridad</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setPriorityFilter(1);
                  }}
                >
                  <span>
                    <MdOutlineSignalCellularAlt1Bar />
                  </span>
                  <span>Baja</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setPriorityFilter(2);
                  }}
                >
                  <span>
                    <MdOutlineSignalCellularAlt2Bar />
                  </span>
                  <span>Media</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setPriorityFilter(3);
                  }}
                >
                  <span>
                    <MdOutlineSignalCellularAlt />
                  </span>
                  <span>Alta</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setPriorityFilter(4);
                  }}
                >
                  <span>
                    <MdPriorityHigh />
                  </span>
                  <span>Urgente</span>
                </button>
              </li>
            </ul>
          </div>

          <label>Ordenar por:</label>
          {/* order by 0-enddate 1-creationdate or 2-priority */}
          <div className="dropdown">
            <label
              tabIndex={0}
              className="flex items-center gap-2 rounded-md p-2"
            >
              <span>
                {orderFilter === 0 ? (
                  <MdOutlineEditCalendar />
                ) : orderFilter === 1 ? (
                  <MdOutlineCalendarMonth />
                ) : (
                  <VscKebabVertical />
                )}
              </span>
              <span>
                {orderFilter === 0
                  ? "Fecha de finalización"
                  : orderFilter === 1
                  ? "Fecha de creación"
                  : "Prioridad"}
              </span>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu w-52 rounded-md border border-white/10 bg-base-100 shadow"
            >
              <li>
                <button
                  onClick={() => {
                    setOrderFilter(0);
                  }}
                >
                  <span>
                    <MdOutlineEditCalendar />
                  </span>
                  <span>Finalización</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setOrderFilter(1);
                  }}
                >
                  <span>
                    <MdOutlineCalendarMonth />
                  </span>
                  <span>Creación</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setOrderFilter(2);
                  }}
                >
                  <span>
                    <VscKebabVertical />
                  </span>
                  <span>Prioridad</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="divider !my-1" />
      <div className="relative h-full w-full">
        <div className="absolute inset-0 flex flex-col gap-2 overflow-y-auto">
          <div className="h-full w-full overflow-x-auto">
            <div className="relative w-full">
              <div className="flex flex-col">
                {tasks().map((tarea) => {
                  return (
                    <IndividualTask
                      key={tarea.id}
                      tarea={tarea}
                      estados={estados}
                      teamMembers={teamMembers}
                      onChangeTask={onChangeTask}
                      onDeleteTask={onDeleteTask}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableTasks;

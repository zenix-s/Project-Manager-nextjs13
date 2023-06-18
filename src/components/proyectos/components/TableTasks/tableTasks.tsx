"use client";
import { TaskProps, StateProps, TeamMemberProps } from "@/types";
import IndividualTask from "./individualTask";
import HeaderTasksList from "./headerTasksList";
import { toast } from "react-hot-toast";
import NewTaskModal from "./newTaskModal";
import axios from "axios";
import { useState } from "react";
import { BiDownArrow } from "react-icons/bi";
import { BsArchive, BsCheckCircle, BsCircle } from "react-icons/bs";

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

  const tasks = () => {
    if (filter === 0) {
      return tareas
        .filter((tarea) => tarea.completed === false)
        .filter((tarea) => tarea.archived === false);
    }
    if (filter === 1) {
      return tareas
        .filter((tarea) => tarea.completed === true)
        .filter((tarea) => tarea.archived === false);
    }
    if (filter === 2) {
      return tareas.filter((tarea) => tarea.archived === true);
    }

    return tareas;
  };

  return (
    <div className="flex w-full flex-col p-1">
      <div className="flex flex-col">
        <HeaderTasksList
          estados={estados}
          idProject={idProject}
          onAddTask={onAddTask}
        />
        <div className="mt-4 flex items-center gap-2">
          <label>Filtro:</label>
          <div className="dropdown">
            <label tabIndex={0} className="rounded-md p-2 flex gap-2 items-center">
              {filter === 0
                ? "Sin Completar"
                : filter === 1
                ? "Completadas"
                : "Archivadas"}
              {
                filter === 0
                  ? <BsCircle />
                  : filter === 1
                  ? <BsCheckCircle />
                  : <BsArchive />
              }
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu w-52 rounded-md bg-base-100 shadow border border-white/10"
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
        </div>
      </div>
      <div className="divider" />
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

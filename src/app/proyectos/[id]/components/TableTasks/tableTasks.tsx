"use client";
import { TaskProps, StateProps, TeamMemberProps } from "@/types";
import IndividualTask from "./individualTask";
import HeaderTasksList from "./headerTasksList";
import { toast } from "react-hot-toast";
import NewTaskModal from "./newTaskModal";
import axios from "axios";
import { useState } from "react";

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
  const [state, setState] = useState(0);

  return (
    <div className="flex w-full flex-col p-4">
      <div>
        <HeaderTasksList
          estados={estados}
          idProject={idProject}
          onAddTask={onAddTask}
        />
      </div>
      <div className="divider" />
      <div className="relative h-full w-full">
        <div className="absolute inset-0 flex flex-col gap-2 overflow-y-auto">
          <select
            onChange={(e) => {
              setState(parseInt(e.target.value));
            }}
            className="select-bordered select mb-4 w-full"
          >
            <option value="0">Todas</option>
            <option value="1">Completadas</option>
            <option value="2">Archivadas</option>
          </select>
          <div className="h-full w-full overflow-x-auto">
            <table className="relative table w-full">
              <thead className="sticky top-0 z-30">
                <tr>
                  <th></th>
                  <th>Titulo</th>
                  <th>Estado</th>
                  <th>Fecha Finalización</th>
                  <th>Asignado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tareas
                  .filter((tarea) => {
                    if (state === 0) {
                      return (
                        tarea.archived === false && tarea.completed === false
                      );
                    } else if (state === 1) {
                      return tarea.completed === true;
                    } else if (state === 2) {
                      return tarea.archived === true;
                    } else {
                      return true;
                    }
                  })

                  .map((tarea) => {
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
              </tbody>
            </table>
          </div>

          {/* <h2>Tareas Completadas</h2>

          {tareas
            .filter((tarea) => tarea.completed === true)
            .filter((tarea) => tarea.archived === false)
            .map((tarea) => {
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

          <h2>Tareas Archivadas</h2>

          {tareas
            .filter((tarea) => tarea.archived === true)
            .map((tarea) => {
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
            })} */}
        </div>
      </div>
    </div>
  );
};

export default TableTasks;

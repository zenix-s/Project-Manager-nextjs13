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
    <div className="flex w-full flex-col p-1">
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
          {/* <select
            onChange={(e) => {
              setState(parseInt(e.target.value));
            }}
            className="select-bordered select mb-4 w-full"
          >
            <option value="0">Todas</option>
            <option value="1">Completadas</option>
            <option value="2">Archivadas</option>
          </select> */}
          <div className="h-full w-full overflow-x-auto">
            <div className="relative w-full">
              <div className="flex flex-col">
                {tareas
                  .filter((tarea) => tarea.completed === false)
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

                <div className="mt-4">
                  <div className="text-center">
                    <span>Tareas Completadas</span>
                  </div>
                </div>

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
              </div>
            </div>
          </div>

          {/* <h2>Tareas Archivadas</h2>

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

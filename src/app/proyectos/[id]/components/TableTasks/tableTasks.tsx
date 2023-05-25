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
}: {
  tareas: TaskProps[];
  estados: StateProps[];
  idProject: number;
  teamMembers: TeamMemberProps[];
  onChangeTask: ({ updatedTask }: { updatedTask: TaskProps }) => void;
}) => {
  return (
    <div className="flex w-full flex-col p-4">
      <div>
        <HeaderTasksList estados={estados} idProject={idProject} />
      </div>
      <div className="divider" />
      <div className="relative h-full w-full">
        <div className="absolute inset-0 flex flex-col gap-2 overflow-y-scroll">
          <h2> Tareas Sin Completar </h2>

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
                />
              );
            })}

          <h2>Tareas Completadas</h2>

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
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TableTasks;

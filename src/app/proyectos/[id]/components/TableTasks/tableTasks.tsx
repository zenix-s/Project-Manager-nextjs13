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
}: {
  tareas: TaskProps[];
  estados: StateProps[];
  idProject: number;
  teamMembers: TeamMemberProps[];
}) => {
  const tareasOrdenadas = tareas.sort((a, b) => {
    if (a.endDate && b.endDate) {
      return a.endDate > b.endDate ? 1 : -1;
    } else if (a.endDate && !b.endDate) {
      return -1;
    } else if (!a.endDate && b.endDate) {
      return 1;
    } else {
      return 0;
    }
  });

  const [tasks, setTasks] = useState(tareasOrdenadas);

  const onChangeTask = async ({ updatedTask }: { updatedTask: TaskProps }) => {
  const index = tasks.findIndex((task) => task.id === updatedTask.id);

  if (index !== -1) {
    const newTasks = [...tasks];
    newTasks[index] = updatedTask;
    setTasks(newTasks);

    axios
      .put('/api/proyectos/tasks', updatedTask)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 200) {
          toast.success(res.data.message);
        }
        if (res.data.status !== 200) {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al actualizar la tarea");
      });


  }
};

  return (
    <div className="flex w-full flex-col p-4">
      <div>
        <HeaderTasksList estados={estados} idProject={idProject} />
      </div>
      <div className="divider" />
      <div className="relative h-full w-full">
        <div className="absolute inset-0 flex flex-col gap-2 overflow-y-scroll">
          <h2> Tareas Sin Completar </h2>

          {tasks
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

          {tasks
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

          {tasks
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

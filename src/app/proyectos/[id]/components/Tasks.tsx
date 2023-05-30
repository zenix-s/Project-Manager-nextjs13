"use client";
import Kanban from "./kanban/kanban";
import TableTasks from "./TableTasks/tableTasks";
import { StateProps, TaskProps, TeamMemberProps } from "@/types";
import { useState } from "react";
import Button from "@/components/button";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  VscTable,
  VscSymbolStructure,
  VscGraph,
  VscCalendar,
  VscProject,
  VscSettingsGear,
  VscPersonAdd,
  VscOrganization,
} from "react-icons/vsc";
import EstadisticasProject from "./estadisticas/estadisticasProject";
import EstadosSection from "./estados/EstadosSection";
import TeamSection from "./team/TeamSection";
import TaskModal from "./TaskModal";
import StateModal from "./StateModal";
import { ST } from "next/dist/shared/lib/utils";

const Tasks = ({
  tareas,
  estados,
  teamMembers,
  idProject,
}: {
  tareas: TaskProps[];
  estados: StateProps[];
  teamMembers: TeamMemberProps[];
  idProject: number;
}) => {
  const [TasksView, setTasksView] = useState("table");
  const [tasks, setTasks] = useState(tareas);
  const [states, setStates] = useState(estados);
  const [team, setTeam] = useState(teamMembers);

  const Views = [
    {
      name: "table",
      icon: VscTable,
    },
    // {
    //   name: "kanban",
    //   icon: VscProject,
    // },
    {
      name: "Estados",
      icon: VscSymbolStructure,
    },
    {
      name: "Miembros",
      icon: VscOrganization,
    },
    {
      name: "estadisticas",
      icon: VscGraph,
    },
    // {
    //   name: "calendario",
    //   icon: VscCalendar,
    // },
  ];

  /**
   * @param updatedTask
   * El parametro updatedTask es un objeto que contiene la tarea actualizada.
   * Actualiza una tarea en la base de datos y en el estado local.
   */
  const onChangeTask = async ({ updatedTask }: { updatedTask: TaskProps }) => {
    const index = tasks.findIndex((task) => task.id === updatedTask.id);

    if (index !== -1) {
      const newTasks = [...tasks];
      const oldTasks = [...tasks];
      
      const stateAutoComplete = () =>  {
        const state = states.find((state) => state.id === updatedTask.stateId);
        if (state) {
          return state.autoComplete;
        }
        return false;
      }
      
      if (stateAutoComplete()) {
        updatedTask.completed = true;
      }
      
      newTasks[index] = updatedTask;
      setTasks(newTasks);
      
        

      axios
        .put("/api/proyectos/tasks", updatedTask)
        .then((res) => {
          console.log(res.data);
          if (res.data.status === 200) {
            toast.success(res.data.message);
          }
          if (res.data.status !== 200) {
            toast.error(res.data.message);
            setTasks(oldTasks);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error al actualizar la tarea");
          setTasks(oldTasks);
        });
    }
  };

  /**
   * @param taskId
   * El parametro taskId es el id de la tarea a eliminar.
   * Elimina una tarea de la base de datos y del estado local.
   *
   */
  const onDeleteTask = async ({ taskId }: { taskId: number }) => {
    const index = tasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      const newTasks = [...tasks];
      const oldTasks = [...tasks];
      const deletedTask = newTasks[index];
      newTasks.splice(index, 1);
      setTasks(newTasks);

      axios
        .delete("/api/proyectos/tasks", { headers: { taskId: taskId } })
        .then((res) => {
          console.log(res.data);
          if (res.data.status === 200) {
            toast.success(res.data.message);
          }
          if (res.data.status !== 200) {
            toast.error(res.data.message);
            setTasks(oldTasks);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error al eliminar la tarea");
          setTasks(oldTasks);
        });
    }
  };

  /**
   * @param updatedState
   * El parametro updatedState es un objeto que contiene el estado actualizado.1
   * Actualiza un estado en la base de datos y en el estado local.
   */
  const onChangeState = async ({
    updatedState,
  }: {
    updatedState: StateProps;
  }) => {
    const index = states.findIndex((state) => state.id === updatedState.id);
    if (index !== -1) {
      const newStates = [...states];
      const oldStates = [...states];
      newStates[index] = updatedState;
      setStates(newStates);
      const oldTasks = [...tasks];

      if (updatedState.autoComplete === true) {
        const newTasks = [...tasks];
        newTasks.forEach((task) => {
          if (task.stateId === updatedState.id) {
            task.completed = true;
          }
        });
        setTasks(newTasks);
      }



      axios
        .put("/api/proyectos/estado", updatedState)
        .then((res) => {
          console.log(res.data);
          if (res.data.status === 200) {
            toast.success(res.data.message);
          }
          if (res.data.status !== 200) {
            toast.error(res.data.message);
            setStates(oldStates);
            setTasks(oldTasks);

          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error al actualizar el estado");
          setStates(oldStates);
          setTasks(oldTasks);
        });
    }
  };

  /**
   * @param stateId
   * El parametro stateId es el id del estado a eliminar.
   * Elimina un estado de la base de datos y del estado local.
   * */
  const onDeleteState = async ({ stateId }: { stateId: number }) => {
    const index = states.findIndex((state) => state.id === stateId);
    if (index !== -1) {
      const newStates = [...states];
      const oldStates = [...states];
      newStates.splice(index, 1);
      setStates(newStates);

      axios
        .delete("/api/proyectos/estado", { headers: { stateId: stateId } })
        .then((res) => {
          console.log(res.data);
          if (res.data.status === 200) {
            toast.success(res.data.message);
          }
          if (res.data.status !== 200) {
            toast.error(res.data.message);
            setStates(oldStates);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error al eliminar el estado");
          setStates(oldStates);
        });
    }
  };

  const onAddState = async ({ newState }: { newState: StateProps }) => {
    console.log(newState);
  }


  /**
   * @param updatedTeamMember
   * El parametro updatedTeamMember es un objeto que contiene el miembro actualizado.
   * Actualiza un miembro en la base de datos y en el estado local.
   * 
   * */ 
  const onUpdateTeamMember = async ({
    updatedTeamMember,
  }: {
    updatedTeamMember: TeamMemberProps;
  }) => {
    const index = teamMembers.findIndex(
      (teamMember) => teamMember.id === updatedTeamMember.id
    );
    if (index !== -1) {
      const newTeamMembers = [...teamMembers];
      const oldTeamMembers = [...teamMembers];
      newTeamMembers[index] = updatedTeamMember;
      setTeam(newTeamMembers);

      axios
        .put("/api/proyectos/team", updatedTeamMember)
        .then((res) => {
          console.log(res.data);
          if (res.data.status === 200) {
            toast.success(res.data.message);
          }
          if (res.data.status !== 200) {
            toast.error(res.data.message);
            setTeam(oldTeamMembers);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error al actualizar el miembro");
          setTeam(oldTeamMembers);
        });
    }
  };


  /**
   * @param teamMemberId
   * El parametro teamMemberId es el id del miembro a eliminar.
   * Elimina un miembro de la base de datos y del estado local.
   * */
  const handleTasksView = () => {
    switch (TasksView) {
      case "kanban":
        return <Kanban tareas={tasks} estados={states} />;
      case "table":
        return (
          <TableTasks
            tareas={tasks}
            estados={states}
            idProject={idProject}
            teamMembers={teamMembers}
            onChangeTask={onChangeTask}
            onDeleteTask={onDeleteTask}
          />
        );
      case "estadisticas":
        return (
          <EstadisticasProject
            tareas={tasks}
            estados={states}
            idProject={idProject}
          />
        );

      case "Estados":
        return (
          <>
            <EstadosSection
              estados={states}
              idProject={idProject}
              onChangeState={onChangeState}
              onDeleteState={onDeleteState}
              onAddState={onAddState}
            />
          </>
        );
      case "calendario":
        return null;
      case "Miembros":
        return (
          <TeamSection
            idProject={idProject}
            teamMembers={teamMembers}
            onUpdateTeamMember={onUpdateTeamMember}
          />
        );

      default:
        return (
          <TableTasks
            tareas={tasks}
            estados={states}
            idProject={idProject}
            teamMembers={teamMembers}
            onChangeTask={onChangeTask}
            onDeleteTask={onDeleteTask}
          />
        );
    }
  };

  return (
    <>
      <TaskModal
        TeamMembers={teamMembers}
        States={states}
        idProject={idProject}
      />
      <StateModal
        projectId={idProject}
      />
      <section className="flex h-full w-full flex-col">
        <div>
          <div className="flex gap-4">
            {Views.map((view, index) => {
              return (
                <div
                  key={index}
                  className={`
                  pb-1
                  ${TasksView === view.name && "border-b-2 border-blue-500"}
                `}
                >
                  <Button
                    onClick={() => setTasksView(view.name)}
                    label={view.name}
                    theme="ghost"
                    center
                    icon={view.icon}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex h-full w-full">{handleTasksView()}</div>
      </section>
    </>
  );
};

export default Tasks;

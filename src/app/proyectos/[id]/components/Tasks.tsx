"use client";
import Kanban from "./kanban/kanban";
import TableTasks from "./TableTasks/tableTasks";
import { StateProps, TaskProps, TeamMemberProps } from "@/types";
import { useState } from "react";
import Button from "@/components/button";
import { VscTable, VscSymbolStructure, VscGraph, VscCalendar, VscProject, VscSettingsGear } from "react-icons/vsc";
import EstadisticasProject from "./estadisticas/estadisticasProject";
import EstadosSection from "./estados/EstadosSection";
import ConfigSection from "./Configuraciones/ConfigSection";
import TaskModal from "./TaskModal";

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

  const Views = [
    {
      name: "table",
      icon: VscTable,
    },
    {
      name: "kanban",
      icon: VscProject,
    },
    {
      name: "estadisticas",
      icon: VscGraph,
    },
    {
      name: "calendario",
      icon: VscCalendar,
    },
    {
      name: "Estados",
      icon: VscSymbolStructure,
    },
    {
      name: "Configuraciones",
      icon: VscSettingsGear,
    },
  ];

  const handleTasksView = () => {
    switch (TasksView) {
      case "kanban":
        return <Kanban tareas={tareas} estados={estados} />;
      case "table":
        return (
          <TableTasks tareas={tareas} estados={estados} idProject={idProject} teamMembers={teamMembers} />
        );
      case "estadisticas":
        return (
          <EstadisticasProject
            tareas={tareas}
            estados={estados}
            idProject={idProject}
          />
        );

      case "Configuraciones":
        return <ConfigSection
          tareas={tareas}
          estados={estados}
          teamMembers={teamMembers}
          idProject={idProject}
        />;
      case "Estados":
        return <EstadosSection
          estados={estados}
          idProject={idProject}
        />;
      case "calendario":
        return (
          null
        );
        

      default:
        return (
          <TableTasks tareas={tareas} estados={estados} idProject={idProject} teamMembers={teamMembers} />
        );
    }
  };

  return (
    <>
      <TaskModal
        TeamMembers={teamMembers}
        States={estados}
        idProject={idProject}
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
                  ${
                    TasksView === view.name ? "border-b-2 border-blue-500 " : ""
                  }
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

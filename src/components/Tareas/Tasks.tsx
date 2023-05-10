"use client";
import Kanban from "./kanban/kanban";
import TableTasks from "./TableTasks/tableTasks";
import { EstadoProps, TareaProps, TeamMemberProps } from "@/types";
import { useState } from "react";
import Button from "../button";
import { VscTable, VscSymbolStructure, VscGraph, VscCalendar, VscProject, VscSettingsGear } from "react-icons/vsc";
import EstadisticasProject from "./estadisticas/estadisticasProject";
import EstadosSection from "./Configuraciones/estados/EstadosSection";
import ConfigSection from "./Configuraciones/ConfigSection";

const Tasks = ({
  tareas,
  estados,
  teamMembers,
  idProject,
}: {
  tareas: TareaProps[];
  estados: EstadoProps[];
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
          <TableTasks tareas={tareas} estados={estados} idProject={idProject} />
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

      default:
        return (
          <TableTasks tareas={tareas} estados={estados} idProject={idProject} />
        );
    }
  };

  return (
    <>
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
                    textColor="white"
                    theme="transparent"
                    center
                    padding={false}
                    hoverEffect="whiter"
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

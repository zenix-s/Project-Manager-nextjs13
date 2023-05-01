"use client";
import Kanban from "./kanban/kanban";
import TableTasks from "./TableTasks/tableTasks";
import { EstadoProps, TareaProps } from "@/types";
import { useState } from "react";
import Button from "../button";
import { VscTable, VscSymbolStructure, VscGraph } from "react-icons/vsc";

const Tasks = ({
  tareas,
  estados,
}: {
  tareas: TareaProps[];
  estados: EstadoProps[];
}) => {
  const [TasksView, setTasksView] = useState("table");

  const Views = [
    {
      name: "table",
      icon: VscTable,
    },
    {
      name: "kanban",
      icon: VscSymbolStructure,
    },
    {
      name: "estadisticas",
      icon: VscGraph,
    },
  ];

  const handleTasksView = () => {
    switch (TasksView) {
      case "kanban":
        return <Kanban tareas={tareas} estados={estados} />;
      case "table":
        return <TableTasks tareas={tareas} estados={estados} />;
      case "estadisticas":
        return null;
      default:
        return <TableTasks tareas={tareas} estados={estados} />;
    }
  };

  return (
    <>
      <section className="flex h-full flex-col">
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
        <div className="flex h-full w-full overflow-hidden">{handleTasksView()}</div>
      </section>
    </>
  );
};

export default Tasks;

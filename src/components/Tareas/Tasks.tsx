'use client';
import Kanban from "./kanban/kanban";
import TableTasks from "./TableTasks/tableTasks";
import { EstadoProps, TareaProps } from "@/types";
import { useState } from "react";
import Button from "../button";
import { VscTable, VscSymbolStructure } from "react-icons/vsc";

const Tasks = (
  {tareas, estados}: {tareas: TareaProps[], estados: EstadoProps[]}
) => {



  const [TasksView, setTasksView] = useState('table');

  const handleTasksView = () => {
    switch (TasksView) {
      case 'kanban':
        return <Kanban tareas={tareas} estados={estados} />;
      case 'table':
        return <TableTasks tareas={tareas} estados={estados} />;
      default:
        return <TableTasks tareas={tareas} estados={estados} />;
    }
  };

  
  return (
    <>
      <section className="flex h-full flex-col">
        <div>
          <div className="flex gap-4">
            <div className={`
              pb-1
              ${TasksView === 'table' ? 'border-b-2 border-blue-500 ' : ''}
            `}>
              <Button
                onClick={() => setTasksView('table')}
                label="Tabla"
                textColor="white"
                theme="transparent"
                center
                padding={false}
                hoverEffect="whiter"
                icon={VscTable}
              />
            </div>
            <div className={`
              pb-1
              ${TasksView === 'kanban' ? 'border-b-2 border-blue-500 ' : ''}
            `}>
              <Button
                onClick={() => setTasksView('kanban')}
                label="Kanban"
                textColor="white"
                theme="transparent"
                center
                padding={false}
                hoverEffect="whiter"
                icon={VscSymbolStructure}
              />
            </div>
          </div>
        </div>
        <div className="flex h-full flex-col">
          {handleTasksView()}
        </div>
      </section>
    </>
  );
};

export default Tasks;
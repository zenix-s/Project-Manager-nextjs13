import { TaskProps, StateProps } from "@/types";
import IndividualTask from "./individualTask";
import HeaderTasksList from "./headerTasksList";
import NewTaskModal from "./newTaskForm";

const TableTasks = ({
  tareas,
  estados,
  idProject,
}: {
  tareas: TaskProps[];
  estados: StateProps[];
  idProject: number;
}) => {
  return (
    <div className="flex w-full flex-col p-4">
      <div>
        <HeaderTasksList estados={estados} idProject={idProject} />
      </div>
      <div className="divider" />
      <div className="flex flex-col gap-2 overflow-scroll">
        <div>
          <h3>Tareas Pendientes</h3>
          {tareas.map((tarea) => {
            if (!tarea.completed) {
              return (
                <IndividualTask
                  key={tarea.id}
                  tarea={tarea}
                  estados={estados}
                />
              );
            }
          })}
        </div>
        <div className="divider" />
        <div>
          <h3>Tareas Completadas</h3>
          {tareas.map((tarea) => {
            if (tarea.completed) {
              return (
                <IndividualTask
                  key={tarea.id}
                  tarea={tarea}
                  estados={estados}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default TableTasks;

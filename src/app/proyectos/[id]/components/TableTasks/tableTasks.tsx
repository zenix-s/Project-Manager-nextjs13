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

  let tareasOrdenadas = tareas;

  
  // order the tasks by end date if endDate is null, put it at the end of the list 
  tareasOrdenadas = tareasOrdenadas.sort((a, b) => {
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

  tareasOrdenadas = tareasOrdenadas.sort((a, b) => {
    if (a.completed && !b.completed) {
      return 1;
    } else if (!a.completed && b.completed) {
      return -1;
    } else {
      return 0;
    }
  });

  return (
    <div className="flex w-full flex-col p-4">
      <div>
        <HeaderTasksList estados={estados} idProject={idProject} />
      </div>
      <div className="divider" />
      <div className="relative w-full h-full">
        <div className="flex flex-col gap-2 overflow-scroll absolute inset-0">
          {tareas
            .map((tarea) => {
              return (
                <IndividualTask
                  key={tarea.id}
                  tarea={tarea}
                  estados={estados}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TableTasks;

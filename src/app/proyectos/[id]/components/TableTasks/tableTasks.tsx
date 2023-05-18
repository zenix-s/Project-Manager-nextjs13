import { TaskProps, StateProps, TeamMemberProps } from "@/types";
import IndividualTask from "./individualTask";
import HeaderTasksList from "./headerTasksList";
import NewTaskModal from "./newTaskModal";

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
  // order the tasks by end date if endDate is null, put it at the end of the list
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

  const tareasArchivadas = tareasOrdenadas.filter((tarea) => tarea.archived);
  const tareasSinArchivar = tareasOrdenadas.filter((tarea) => !tarea.archived);

  const tareasSinCompletar = tareasSinArchivar.filter(
    (tarea) => !tarea.completed
  );
  const tareasCompletadas = tareasSinArchivar.filter(
    (tarea) => tarea.completed
  );

  return (
    <div className="flex w-full flex-col p-4">
      <div>
        <HeaderTasksList estados={estados} idProject={idProject} />
      </div>
      <div className="divider" />
      <div className="relative h-full w-full">
        <div className="absolute inset-0 flex flex-col gap-2 overflow-scroll">
          <h2> Tareas Sin Completar </h2>
          {tareasSinCompletar.map((tarea) => {
            return (
              <IndividualTask key={tarea.id} tarea={tarea} estados={estados} teamMembers={teamMembers}  />
            );
          })}
          <h2>Tareas Completadas</h2>
          {tareasCompletadas.map((tarea) => {
            return (
              <IndividualTask key={tarea.id} tarea={tarea} estados={estados} teamMembers={teamMembers} />
            );
          })}

          <h2>Tareas Archivadas</h2>
          {tareasArchivadas.map((tarea) => {
            return (
              <IndividualTask key={tarea.id} tarea={tarea} estados={estados} teamMembers={teamMembers} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TableTasks;

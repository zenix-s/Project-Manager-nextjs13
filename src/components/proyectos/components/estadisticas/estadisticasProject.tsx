import { StateProps, TaskProps, TeamMemberProps } from "@/types";
import TasksPerStatus from "./stats/TasksPerStatus";
import TasksCompletedvsNoCompleted from "./stats/TasksCompletedvsNoCompleted";
import TimeToCompleteATask from "./stats/TimeToCompleteATask";
import TaskPerMember from "./stats/TaskPerMember";
import TeamMember from "../team/TeamMemeber";
interface EstadisticasProjectProps {
  tareas: TaskProps[];
  estados: StateProps[];
  teamMembers: TeamMemberProps[];
  idProject: number;
}

const EstadisticasProject = ({
  tareas,
  estados,
  idProject,
  teamMembers,
}: EstadisticasProjectProps) => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0  flex flex-col gap-4 p-4 overflow-auto">
        <div className="flex w-full gap-4">
          <div className="w-1/3 h-[520px]">
            <TasksPerStatus tareas={tareas} estados={estados} />
          </div>
          <div className="w-2/3 h-[520px]">
            <TasksCompletedvsNoCompleted tareas={tareas} estados={estados} />
          </div>
        </div>
        <div className="flex w-full">
          <TimeToCompleteATask tareas={tareas} estados={estados} />
        </div>
        <div className="flex w-full">
          <TaskPerMember tareas={tareas} estados={estados} teamMembers={teamMembers}  />
        </div>
      </div>
    </div>
  );
};

export default EstadisticasProject;

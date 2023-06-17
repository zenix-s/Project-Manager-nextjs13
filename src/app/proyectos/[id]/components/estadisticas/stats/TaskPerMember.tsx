import { StateProps, TaskProps, TeamMemberProps } from "@/types";
import { getHexColor } from "@/actions/getColors";

interface TasksPerStatusProps {
  tareas: TaskProps[];
  estados: StateProps[];
  teamMembers: TeamMemberProps[];
}

const TaskPerMember = ({ tareas, estados, teamMembers }: TasksPerStatusProps) => {
  
  const TaskPerMember = () => {
    let teamMembers:{
      [key: number]: number;
    } = {};
    tareas.forEach((tarea) => {
      if (tarea.userId !== null) {
        if (tarea.userId in teamMembers) {
          teamMembers[tarea.userId] = teamMembers[tarea.userId] + 1;
        } else {
          teamMembers[tarea.userId] = 1;
        }
      }

    });
    return teamMembers;
  }

  const TaskPerMembers = TaskPerMember();
  

  return (
    <div
      className=" justify-between flex h-full w-full items-center rounded-xl bg-slate-900 px-8 py-4"
      style={{
        boxShadow: "0px 0px 10px 0px rgba(51,65,85,0.50)",
      }}
    >
      {
        
        Object.keys(TaskPerMembers).map((key) => {
          return(
            <div
              key={key}

            >
              {
                teamMembers.filter((teamMember) => teamMember.userId === parseInt(key)) 
                .map((teamMember) => {
                  return(
                    <div
                      key={teamMember.userId}
                      className="flex flex-col text-2xl font-bold"
                    >
                      {teamMember.users.username}
                    </div>
                  )
                }) 
              }
              <div>
                {
                  TaskPerMembers[
                    parseInt(key)
                  ]
                }
              </div>
            </div>
          )})
        
      }


    </div>
  );
};

export default TaskPerMember;
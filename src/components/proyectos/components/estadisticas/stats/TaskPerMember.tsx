import { StateProps, TaskProps, TeamMemberProps } from "@/types";
import { getHexColor } from "@/actions/getColors";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

interface TasksPerStatusProps {
  tareas: TaskProps[];
  estados: StateProps[];
  teamMembers: TeamMemberProps[];
}

const TaskPerMember = ({
  tareas,
  estados,
  teamMembers,
}: TasksPerStatusProps) => {
  const TaskPerMember = () => {
    let teamMembers: {
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
  };
  const totalTasks = tareas.length;
  const TaskPerMembers = TaskPerMember();

  // const data = [
  //   {
  //     "name": memberName,
  //     "value": tasksForMember
  //   }
  // ]

  const data = Object.keys(TaskPerMembers).map((key) => {
    const memberId = parseInt(key);
    const tasksForMember = TaskPerMembers[memberId];
    const member = teamMembers.find(
      (teamMember) => teamMember.userId === memberId
    );
    const memberName = member ? member.users.username : "Unknown Member";
    const taskPercentage = (tasksForMember / totalTasks) * 100;

    return {
      name: memberName,
      tareasAsignadas: tasksForMember,
    };
  });

  return (
    <div className=" flex h-full flex-col w-full items-center justify-between rounded-xl border border-white/30 px-8 py-4">
      <h2 className="text-xl mb-2">
        Tareas asignadas por miembro
      </h2>
      <div>
        <BarChart width={
          data.length * 300
        } height={450} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="tareasAsignadas" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default TaskPerMember;

import { TeamMemberProps } from "@/types";
import TeamMember from "./TeamMemeber";
interface TeamSectionProps {
  idProject: number;
  teamMembers: TeamMemberProps[];
}

const TeamSection = ({ idProject, teamMembers }: TeamSectionProps) => {
  return (
    <div className="h-96 p-4">
      <div>
        form para agregar miembros al proyecto
      </div>
      <div className="divider" />
      <div className="overflox-scroll h-full">
        {teamMembers.map((member) => (
          <TeamMember
            key={member.id_usuario}
            idProject={idProject}
            teamMember={member}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamSection;

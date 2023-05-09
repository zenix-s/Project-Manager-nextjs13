import { TeamMemberProps } from "@/types";
import TeamMember from "./TeamMemeber";
interface TeamSectionProps {
  idProject: number;
  teamMembers: TeamMemberProps[];
}

const TeamSection = ({ idProject, teamMembers }: TeamSectionProps) => {
  return (
    <div className="h-96 p-4">
      <h2 className="text-2xl font-bold">Team</h2>
      <div className="overflox-scroll border border-white/50 rounded-lg h-full">
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

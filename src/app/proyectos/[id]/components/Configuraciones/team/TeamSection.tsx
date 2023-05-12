import { TeamMemberProps } from "@/types";
import TeamMember from "./TeamMemeber";
import InviteMemberForm from "./InviteMemeberForm";

interface TeamSectionProps {
  idProject: number;
  teamMembers: TeamMemberProps[];
}


const TeamSection = ({ idProject, teamMembers }: TeamSectionProps) => {

  

  return (
    <div className="h-96 p-4">
      <div>
        <InviteMemberForm idProject={idProject} />
      </div>
      <div className="divider" />
      <div className="overflox-scroll h-full">
        {teamMembers.map((member) => (
          <TeamMember
            key={member.userId}
            idProject={idProject}
            teamMember={member}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamSection;

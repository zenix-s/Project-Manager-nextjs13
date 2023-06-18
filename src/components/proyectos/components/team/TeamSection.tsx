import { TeamMemberProps } from "@/types";
import TeamMember from "./TeamMemeber";
import InviteMemberForm from "./InviteMemeberForm";

interface TeamSectionProps {
  idProject: number;
  teamMembers: TeamMemberProps[];
  onUpdateTeamMember: ({
    updatedTeamMember,
  }: {
    updatedTeamMember: TeamMemberProps;
  }) => void;
}

const TeamSection = ({
  idProject,
  teamMembers,
  onUpdateTeamMember,
}: TeamSectionProps) => {
  return (
    <div className="h-96 w-full p-4">
      <div>
        <InviteMemberForm idProject={idProject} />
      </div>
      <div className="divider" />
      <div className="overflox-scroll h-full w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Rol</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member) => (
              <TeamMember
                key={member.userId}
                idProject={idProject}
                teamMember={member}
                onUpdateTeamMember={onUpdateTeamMember}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamSection;

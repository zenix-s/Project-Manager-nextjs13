import { TeamMembersProps } from "@/types";
interface TeamSectionProps {
  idProject: number;
  teamMembers: TeamMembersProps[];
}

const TeamSection = ({ idProject, teamMembers }: TeamSectionProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Team</h2>
      <div>
        {teamMembers.map((member) => (
          <div key={member.id} className="flex items-center justify-between">
            {member.id_usuario}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;

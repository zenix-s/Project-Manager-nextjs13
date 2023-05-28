"use client";
import { TeamMemberProps } from "@/types";
import { VscKebabVertical, VscChromeMinimize } from "react-icons/vsc";

interface TeamMemberListProps {
  idProject: number;
  teamMember: TeamMemberProps;
  onUpdateTeamMember: ({
    updatedTeamMember,
  }: {
    updatedTeamMember: TeamMemberProps;
  }) => void;
}
const TeamMember = ({ idProject, teamMember, onUpdateTeamMember }: TeamMemberListProps) => {
  const isOwner = teamMember.role === "owner";

  const onChangeRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateTeamMember({
      updatedTeamMember: {
        ...teamMember,
        role: e.target.value,
      },
    });
  };

  return (
    <div className="flex w-full items-center gap-8 p-4">
      <div>{teamMember.users.username}</div>
      <div>
        {isOwner ? (
          <span className="rounded border border-white/50 p-3  text-gray-400">
            Dueño del proyecto
          </span>
        ) : (
          <select
            className="select-bordered select w-full max-w-xs"
            defaultValue={teamMember.role}
            onChange={onChangeRole}
          >
            <option>admin</option>
            <option>member</option>
            <option>viewer</option>
          </select>
        )}
      </div>
      <div></div>
      <div className="">
        {!isOwner && (
          <button className="btn-error btn w-36 items-center  gap-2">
            <VscChromeMinimize /> Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default TeamMember;

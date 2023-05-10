"use client";
import { TeamMemberProps } from "@/types";
import { VscKebabVertical, VscChromeMinimize } from "react-icons/vsc";

interface TeamMemberListProps {
  idProject: number;
  teamMember: TeamMemberProps;
}
const TeamMember = ({ idProject, teamMember }: TeamMemberListProps) => {
  const isOwner = teamMember.rol === "owner";
  return (
    <div className="flex items-center gap-8 p-4">
      <div>{teamMember.users.username}</div>
      <div>
        {isOwner ? (
          <span className="rounded border border-white/50 p-3  text-gray-400">
            Dueño del proyecto
          </span>
        ) : (
          <select
            className="select-bordered select w-full max-w-xs"
            defaultValue={teamMember.rol}
          >
            <option>user</option>
            <option>admin</option>
          </select>
        )}
      </div>
      <div></div>
      <div className="">
        {!isOwner && (
          <button className="btn-error btn flex gap-2">
            <VscChromeMinimize /> Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default TeamMember;
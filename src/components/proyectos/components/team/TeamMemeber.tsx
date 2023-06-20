"use client";
import { TeamMemberProps } from "@/types";
import axios from "axios";
import { VscKebabVertical, VscChromeMinimize } from "react-icons/vsc";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

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
  const router = useRouter();
  const onChangeRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateTeamMember({
      updatedTeamMember: {
        ...teamMember,
        role: e.target.value,
      },
    });
  };

  const onDeleteTeamMember = () => {
    
    axios
      .delete(`/api/proyectos/team`, {
        headers: {
          projectId: idProject,
          teamMemberId: teamMember.userId,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          toast.success(res.data.message);
          router.refresh();
        }
        if (res.data.status !== 200) {
          toast.error(res.data.message);
        }
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al eliminar el miembro del equipo");
      });

  };


  return (
    <tr>
      <td>{teamMember.users.username}</td>
      <td>
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
      </td>
      <td >
        {!isOwner && (
          <button className="btn-error btn w-36 items-center  gap-2"
            onClick={onDeleteTeamMember}
          >
            <VscChromeMinimize />
            Eliminar 
          </button>
        )}
      </td>
    </tr>
  );
};

export default TeamMember;

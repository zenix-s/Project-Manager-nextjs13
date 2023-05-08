import {EstadoProps, TareaProps, TeamMembersProps} from "@/types";
import EstadosSection from "./estados/EstadosSection";
import TeamSection from "./team/TeamSection";


interface ConfigSectionProps {
  tareas: TareaProps[];
  estados: EstadoProps[];
  teamMembers: TeamMembersProps[];
  idProject: number;
}

const ConfigSection = (
  {tareas, estados, idProject, teamMembers}: ConfigSectionProps

) => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 overflow-scroll">
        <EstadosSection estados={estados} idProject={idProject} />
        <TeamSection idProject={idProject} teamMembers={teamMembers} />
      </div>
    </div>
  );
};

export default ConfigSection;

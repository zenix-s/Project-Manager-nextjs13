"use client";
import { StateProps, TaskProps, TeamMemberProps } from "@/types";
import EstadosSection from "./estados/EstadosSection";
import TeamSection from "./team/TeamSection";
import { useState } from "react";

interface ConfigSectionProps {
  tareas: TaskProps[];
  estados: StateProps[];
  teamMembers: TeamMemberProps[];
  idProject: number;
}

const ConfigSection = ({
  tareas,
  estados,
  idProject,
  teamMembers,
}: ConfigSectionProps) => {
  const [view, setView] = useState<"estados" | "team" | "tareas">("estados");

  const InternalView = () => {
    switch (view) {
      case "estados":
        return <EstadosSection estados={estados} idProject={idProject} />;
      case "team":
        return <TeamSection teamMembers={teamMembers} idProject={idProject} />;
      default:
        return <EstadosSection estados={estados} idProject={idProject} />;
    }
  };

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 overflow-scroll pt-6">
        <div className="flex w-full items-center justify-center">
          <ul className="flex flex-col gap-4 lg:flex-row">
            <li className="">
              <button
                onClick={() => setView("estados")}
                className={`btn-ghost btn ${
                  view === "estados" ? "btn-active" : ""
                }`}
              >
                Estados
              </button>
            </li>
            <li className="">
              <button
                onClick={() => setView("team")}
                className={`btn-ghost btn ${
                  view === "team" ? "btn-active" : ""
                }`}
              >
                Team
              </button>
            </li>
          </ul>
        </div>
        <InternalView />
      </div>
    </div>
  );
};

export default ConfigSection;

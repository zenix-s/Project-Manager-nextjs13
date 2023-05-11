import CardProyecto from "./cardproyecto";
import { ProjectProps } from "@/types";

interface BodyProjectsProps {
  proyectos: ProjectProps[];
}

const BodyProjects = ({ proyectos }: BodyProjectsProps) => {
  if (!proyectos) {
    return <div>Proyectos no encontrados</div>;
  }
  return (
    <div className="grid w-full grid-cols-1 gap-4 overflow-y-scroll p-2 md:grid-cols-2 xl:grid-cols-3">
      {proyectos.map((proyecto: ProjectProps) => (
        <CardProyecto
          key={proyecto.id}
          id={proyecto.id}
          name={proyecto.name}
          description={proyecto.description}
          endDate={proyecto.endDate}
          creationDate={proyecto.creationDate}
          role={proyecto.role}
        />
      ))}
    </div>
  );
};

export default BodyProjects;

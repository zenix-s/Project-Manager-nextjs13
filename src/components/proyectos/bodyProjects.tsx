import CardProyecto from "./cardproyecto";
import { ProjectProps } from "@/types";

interface BodyProjectsProps {
  proyectos: ProjectProps[];
}

const BodyProjects = ({ proyectos }: BodyProjectsProps) => {
  if (!proyectos) {
    return <div>Proyectos no encontrados</div>;
  }

  const proyectosNoArchivados = proyectos.filter(
    (proyecto) => proyecto.archived === false
  );
  const proyectosArchivados = proyectos.filter(
    (proyecto) => proyecto.archived === true
  );

  return (
    <div className="w-full h-full overflow-y-scroll p-2">
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {proyectosNoArchivados.map((proyecto: ProjectProps) => (
          <CardProyecto
            key={proyecto.id}
            id={proyecto.id}
            name={proyecto.name}
            description={proyecto.description}
            endDate={proyecto.endDate}
            creationDate={proyecto.creationDate}
            role={proyecto.role}
            archived={proyecto.archived}
          />
        ))}
      </div>
      <h2>Proyectos archivados</h2>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {proyectosArchivados.map((proyecto: ProjectProps) => (
          <CardProyecto
            key={proyecto.id}
            id={proyecto.id}
            name={proyecto.name}
            description={proyecto.description}
            endDate={proyecto.endDate}
            creationDate={proyecto.creationDate}
            role={proyecto.role}
            archived={proyecto.archived}
          />
        ))}
      </div>
    </div>
  );
};

export default BodyProjects;
